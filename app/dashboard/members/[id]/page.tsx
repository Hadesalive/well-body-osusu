import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar';
import { Badge } from '../../../../components/ui/badge';
import { Member } from '../components';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../components/ui/table';
import { formatCurrency } from '../../../../lib/formatters';

type Transaction = {
  id: string;
  memberId: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
  status: string;
};

type ClinicVisit = {
  id: string;
  memberId: string;
  clinicName: string;
  date: string;
  service: string;
  cost: number;
  currency: string;
  notes: string;
};

async function getMemberData(id: string): Promise<{
  member?: Member;
  transactions: Transaction[];
  visits: ClinicVisit[];
}> {
  const dataPath = path.join(process.cwd(), 'data');
  try {
    const membersData = await fs.readFile(path.join(dataPath, 'members.json'), 'utf-8');
    const allMembers = JSON.parse(membersData) as Member[];
    const member = allMembers.find(m => m.id === id);

    const transactionsData = await fs.readFile(path.join(dataPath, 'transactions.json'), 'utf-8');
    const allTransactions = JSON.parse(transactionsData) as Transaction[];
    const transactions = allTransactions.filter(t => t.memberId === id);

    const visitsData = await fs.readFile(path.join(dataPath, 'clinic-visits.json'), 'utf-8');
    const allVisits = JSON.parse(visitsData) as ClinicVisit[];
    const visits = allVisits.filter(v => v.memberId === id);

    return { member, transactions, visits };
  } catch (error) {
    console.error('Failed to read data:', error);
    return { transactions: [], visits: [] };
  }
}

export default async function MemberProfilePage({ params }: { params: { id: string } }) {
  const { member, transactions, visits } = await getMemberData(params.id);

  if (!member) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${member.name}`} />
          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{member.name}</h1>
          <p className="text-muted-foreground">WBO ID: {member.wboId} | NIN: {member.nin}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Member Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            <Badge variant={member.status === 'Active' ? 'default' : member.status === 'Inactive' ? 'secondary' : 'destructive'}>{member.status}</Badge>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Tier</p>
            <p>{member.tier} ({member.incomeBracket} Income)</p>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Phone</p>
            <p>{member.phone}</p>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Address</p>
            <p>{member.address}</p>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Occupation</p>
            <p>{member.occupation}</p>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-muted-foreground">District</p>
            <p>{member.district}</p>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Community Group</p>
            <p>{member.group}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map(tx => (
                  <TableRow key={tx.id}>
                    <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                    <TableCell>{tx.description}</TableCell>
                    <TableCell className={`text-right ${tx.amount < 0 ? 'text-destructive' : ''}`}>{formatCurrency(Math.abs(tx.amount), tx.currency)}</TableCell>
                    <TableCell><Badge variant={tx.status === 'Completed' ? 'default' : 'secondary'}>{tx.status}</Badge></TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={4} className="text-center">No transactions found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Clinic Visit Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Clinic</TableHead>
                <TableHead>Service</TableHead>
                <TableHead className="text-right">Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visits.length > 0 ? (
                visits.map(visit => (
                  <TableRow key={visit.id}>
                    <TableCell>{new Date(visit.date).toLocaleDateString()}</TableCell>
                    <TableCell>{visit.clinicName}</TableCell>
                    <TableCell>{visit.service}</TableCell>
                    <TableCell className="text-right">{formatCurrency(visit.cost, visit.currency)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={4} className="text-center">No clinic visits found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
