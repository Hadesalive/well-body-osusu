import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { PlusCircle, Upload } from "lucide-react";
import { Contribution, columns } from "./components";
import { ContributionsDataTable } from "./data-table";

// Mock data for contributions
const contributions: Contribution[] = [
  {
    id: "txn_1",
    member: { name: "Adama Sesay", nin: "123456789" },
    amount: 5000,
    method: "Mobile Money",
    tier: "Tier 1",
    status: "Completed",
    date: "2023-10-28T10:00:00Z",
  },
  {
    id: "txn_2",
    member: { name: "Musa Kamara", nin: "987654321" },
    amount: 10000,
    method: "Bank Transfer",
    tier: "Tier 2",
    status: "Completed",
    date: "2023-10-28T11:30:00Z",
  },
  {
    id: "txn_3",
    member: { name: "Fatima Jalloh", nin: "456789123" },
    amount: 5000,
    method: "Mobile Money",
    tier: "Tier 1",
    status: "Pending",
    date: "2023-10-29T09:00:00Z",
  },
  {
    id: "txn_4",
    member: { name: "Sorie Conteh", nin: "321654987" },
    amount: 15000,
    method: "Cash",
    tier: "Tier 3",
    status: "Failed",
    date: "2023-10-29T14:20:00Z",
  },
  {
    id: "txn_5",
    member: { name: "Isatu Bangura", nin: "654987321" },
    amount: 5000,
    method: "Mobile Money",
    tier: "Tier 1",
    status: "Completed",
    date: "2023-10-30T16:45:00Z",
  },
];

export default function ContributionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contributions</h1>
          <p className="text-muted-foreground">
            View and manage all member contributions.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Contribution
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Contribution History</CardTitle>
          <CardDescription>
            A log of all payments received from members.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContributionsDataTable columns={columns} data={contributions} />
        </CardContent>
      </Card>
    </div>
  );
}
