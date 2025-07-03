'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { Member } from './components';

// Define the schema for member validation
const memberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  nin: z.string().min(9, 'NIN must be at least 9 characters'),
  phone: z.string().min(1, 'Phone is required'),
  address: z.string().min(1, 'Address is required'),
  occupation: z.string().min(1, 'Occupation is required'),
  incomeBracket: z.enum(['Low', 'Medium', 'High'], { required_error: 'Income bracket is required' }),
  status: z.enum(['Active', 'Inactive', 'Flagged']),
  district: z.string().min(1, 'District is required'),
  group: z.string().optional(),
});

const getTierFromIncome = (incomeBracket: 'Low' | 'Medium' | 'High'): 'Tier 1' | 'Tier 2' | 'Tier 3' => {
  switch (incomeBracket) {
    case 'Low': return 'Tier 1';
    case 'Medium': return 'Tier 2';
    case 'High': return 'Tier 3';
  }
};

const filePath = path.join(process.cwd(), 'data', 'members.json');

// Helper function to read members from the JSON file
async function getMembers(): Promise<Member[]> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as Member[];
  } catch (error) {
    // If the file doesn't exist, return an empty array
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

// Helper function to write members to the JSON file
async function saveMembers(members: Member[]) {
  await fs.writeFile(filePath, JSON.stringify(members, null, 2), 'utf-8');
}

// Server Action to add a new member
export async function addMember(prevState: unknown, formData: FormData) {
  const validatedFields = memberSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const members = await getMembers();
    const newId = (members.length > 0 ? Math.max(...members.map(m => parseInt(m.id, 10))) : 0) + 1;
    const newWboId = `WBO-${(newId).toString().padStart(5, '0')}`;

    const newMember: Member = {
      id: newId.toString(),
      wboId: newWboId,
      name: validatedFields.data.name,
      nin: validatedFields.data.nin,
      phone: validatedFields.data.phone,
      address: validatedFields.data.address,
      occupation: validatedFields.data.occupation,
      incomeBracket: validatedFields.data.incomeBracket,
      tier: getTierFromIncome(validatedFields.data.incomeBracket),
      status: validatedFields.data.status,
      district: validatedFields.data.district,
      group: validatedFields.data.group || 'N/A',
    };

    members.push(newMember);
    await saveMembers(members);

    revalidatePath('/dashboard/members');
    return { success: true, message: 'Member added successfully.' };
  } catch (error) {
    return { errors: { _form: ['Failed to add member.'] } };
  }
}

// Server Action to update an existing member
export async function updateMember(id: string, prevState: any, formData: FormData) {
  const validatedFields = memberSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const members = await getMembers();
    const memberIndex = members.findIndex(m => m.id === id);

    if (memberIndex === -1) {
      return { errors: { _form: ['Member not found.'] } };
    }

    const updatedMember: Member = {
      id,
      wboId: members[memberIndex].wboId, // Keep original WBO ID
      name: validatedFields.data.name,
      nin: validatedFields.data.nin,
      phone: validatedFields.data.phone,
      address: validatedFields.data.address,
      occupation: validatedFields.data.occupation,
      incomeBracket: validatedFields.data.incomeBracket,
      tier: getTierFromIncome(validatedFields.data.incomeBracket),
      status: validatedFields.data.status,
      district: validatedFields.data.district,
      group: validatedFields.data.group || 'N/A',
    };

    members[memberIndex] = updatedMember;
    await saveMembers(members);

    revalidatePath('/dashboard/members');
    return { success: true, message: 'Member updated successfully.' };
  } catch (error) {
    return { errors: { _form: ['Failed to update member.'] } };
  }
}

// Server Action to delete a member
export async function deleteMember(id: string) {
  try {
    let members = await getMembers();
    members = members.filter(m => m.id !== id);
    await saveMembers(members);

    revalidatePath('/dashboard/members');
    return { success: true, message: 'Member deleted successfully.' };
  } catch (error) {
    return { success: false, message: 'Failed to delete member.' };
  }
}
