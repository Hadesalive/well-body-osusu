import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { PlusCircle } from "lucide-react";
import { Clinic, columns } from "./components";
import { ClinicsDataTable } from "./data-table";

// Mock data for clinics
const clinics: Clinic[] = [
  {
    id: "clinic_1",
    name: "Hope Health Clinic",
    district: "Western Area",
    contact: "Dr. Aminata Fofanah",
    status: "Active",
    services: 125,
  },
  {
    id: "clinic_2",
    name: "Bo Community Hospital",
    district: "Bo District",
    contact: "Mr. John Sandy",
    status: "Active",
    services: 88,
  },
  {
    id: "clinic_3",
    name: "Kenema Wellness Center",
    district: "Kenema District",
    contact: "Sister Mary Kamara",
    status: "Pending Approval",
    services: 0,
  },
  {
    id: "clinic_4",
    name: "Makeni Central Clinic",
    district: "Bombali District",
    contact: "Dr. Ibrahim Sesay",
    status: "Active",
    services: 210,
  },
  {
    id: "clinic_5",
    name: "Koidu Medical Services",
    district: "Kono District",
    contact: "Foday Mansaray",
    status: "Inactive",
    services: 45,
  },
];

export default function ClinicIntegrationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Clinic Integration</h1>
          <p className="text-muted-foreground">
            Manage partner clinics and review their service submissions.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Clinic
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Partner Clinics</CardTitle>
          <CardDescription>
            A list of all clinics in the Well Body Osusu network.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClinicsDataTable columns={columns} data={clinics} />
        </CardContent>
      </Card>
    </div>
  );
}
