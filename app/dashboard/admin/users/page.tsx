import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";
import { PlusCircle } from "lucide-react";
import { User, columns } from "./components";
import { DataTable } from "./data-table";

// Mock data for users
const users: User[] = [
  {
    id: "1",
    name: "Isata Moromba",
    email: "isata@wellbodyosusu.com",
    role: "Super Admin",
    region: "National",
    status: "Active",
  },
  {
    id: "2",
    name: "John Kamara",
    email: "john.k@example.com",
    role: "Admin",
    region: "Western Area",
    status: "Active",
  },
  {
    id: "3",
    name: "Foday Sankoh",
    email: "foday.s@example.com",
    role: "Agent",
    region: "Bo District",
    status: "Active",
  },
  {
    id: "4",
    name: "Aminata Conteh",
    email: "aminata.c@example.com",
    role: "Clinic Staff",
    region: "Kenema District",
    status: "Inactive",
  },
  {
    id: "5",
    name: "Mohamed Turay",
    email: "mohamed.t@example.com",
    role: "Agent",
    region: "Western Area",
    status: "Active",
  },
];

export default function UserManagementPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage all staff accounts and roles.</CardDescription>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create User
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={users} />
        </CardContent>
      </Card>
    </div>
  );
}
