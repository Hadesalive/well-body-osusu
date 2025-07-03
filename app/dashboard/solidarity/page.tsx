import { columns, SolidarityApplication } from "./components";
import { SolidarityDataTable } from "./data-table";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

async function getApplications(): Promise<SolidarityApplication[]> {
  // Fetch data from your API here.
  return [
    {
      id: "app-001",
      applicantName: "Foday Sankoh",
      nin: "123456789",
      reason: "Urgent medical surgery",
      status: "Pending",
      submittedDate: "2025-07-01",
      amountRequested: 1000000,
    },
    {
      id: "app-002",
      applicantName: "Baindu Rogers",
      nin: "987654321",
      reason: "Loss of income due to flooding",
      status: "Approved",
      submittedDate: "2025-06-28",
      amountRequested: 750000,
    },
    {
      id: "app-003",
      applicantName: "Sorie Kargbo",
      nin: "112233445",
      reason: "School fees for children",
      status: "Rejected",
      submittedDate: "2025-06-25",
      amountRequested: 500000,
    },
    {
      id: "app-004",
      applicantName: "Adama Sesay",
      nin: "556677889",
      reason: "Emergency housing repair",
      status: "Pending",
      submittedDate: "2025-07-03",
      amountRequested: 1200000,
    },
  ];
}

export default async function SolidarityFundPage() {
  const data = await getApplications();

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Solidarity Fund</h1>
          <p className="text-muted-foreground">
            Review and manage all solidarity fund applications.
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <SolidarityDataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
