"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { addMember } from './actions';
import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { toast } from 'sonner';

type FormState = {
  success?: boolean;
  message?: string;
  errors?: {
    name?: string[];
    nin?: string[];
    phone?: string[];
    address?: string[];
    occupation?: string[];
    incomeBracket?: string[];
    district?: string[];
    status?: string[];
    _form?: string[];
  };
};

const initialState: FormState = {
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Adding Member...' : 'Add Member'}
    </Button>
  );
}

export function AddMemberForm() {
  const [state, formAction] = useFormState<FormState, FormData>(addMember, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      formRef.current?.reset();
    } else if (state.errors?._form) {
      toast.error(state.errors._form.join(', '));
    }
  }, [state]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Member</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
          <DialogDescription>
            Fill in the details below to register a new member.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={formAction} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" name="name" className="col-span-3" />
            {state.errors?.name && <p className="col-span-4 text-red-500 text-xs">{state.errors.name}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nin" className="text-right">NIN</Label>
            <Input id="nin" name="nin" className="col-span-3" />
            {state.errors?.nin && <p className="col-span-4 text-red-500 text-xs">{state.errors.nin}</p>}
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">Phone</Label>
            <Input id="phone" name="phone" className="col-span-3" />
            {state.errors?.phone && <p className="col-span-4 text-red-500 text-xs">{state.errors.phone}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">Address</Label>
            <Input id="address" name="address" placeholder="e.g. 123 Main St" className="col-span-3" />
            {state.errors?.address && <p className="col-span-4 text-red-500 text-xs">{state.errors.address}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="occupation" className="text-right">Occupation</Label>
            <Input id="occupation" name="occupation" placeholder="e.g. Trader" className="col-span-3" />
            {state.errors?.occupation && <p className="col-span-4 text-red-500 text-xs">{state.errors.occupation}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="district" className="text-right">District</Label>
            <Input id="district" name="district" placeholder="e.g. Western Area" className="col-span-3" />
            {state.errors?.district && <p className="col-span-4 text-red-500 text-xs">{state.errors.district}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="incomeBracket" className="text-right">Income</Label>
            <Select name="incomeBracket">
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select income bracket" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
             {state.errors?.incomeBracket && <p className="col-span-4 text-red-500 text-xs">{state.errors.incomeBracket}</p>}
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">Status</Label>
            <Select name="status">
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>
             {state.errors?.status && <p className="col-span-4 text-red-500 text-xs">{state.errors.status}</p>}
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
            </DialogClose>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
