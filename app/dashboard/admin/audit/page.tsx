import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";
import { AuditLog, columns } from "./components";
import { AuditLogDataTable } from "./data-table";

// Mock data for audit logs
const auditLogs: AuditLog[] = [
  {
    id: "log-01",
    user: { name: "Alice Johnson", avatar: "/avatars/01.png" },
    action: "User Login",
    details: "User logged in successfully from IP 192.168.1.1",
    date: "2023-10-26T10:00:00Z",
    status: "success",
  },
  {
    id: "log-02",
    user: { name: "Bob Williams", avatar: "/avatars/02.png" },
    action: "Payment Processed",
    details: "Processed payment of UGX 5000 for member #12345",
    date: "2023-10-26T11:30:00Z",
    status: "success",
  },
  {
    id: "log-03",
    user: { name: "Charlie Brown", avatar: "/avatars/03.png" },
    action: "Member Created",
    details: "New member 'Jane Doe' created in Tier 1",
    date: "2023-10-25T14:00:00Z",
    status: "success",
  },
  {
    id: "log-04",
    user: { name: "Alice Johnson", avatar: "/avatars/01.png" },
    action: "Password Reset",
    details: "Password reset attempt failed for user 'test@example.com'",
    date: "2023-10-25T09:15:00Z",
    status: "failed",
  },
  {
    id: "log-05",
    user: { name: "Super Admin", avatar: "/avatars/04.png" },
    action: "Settings Updated",
    details: "Updated Tier 1 contribution amount to UGX 6000",
    date: "2023-10-24T18:00:00Z",
    status: "success",
  },
];

export default function AuditLogPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Log</CardTitle>
        <CardDescription>
          Track all system activities and changes. Filter by user, action, or date.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuditLogDataTable columns={columns} data={auditLogs} />
      </CardContent>
    </Card>
  );
}
