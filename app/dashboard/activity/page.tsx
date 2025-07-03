import { botColumns, agentColumns, BotLog, AgentLog } from "./components";
import { ActivityDataTable } from "./data-table";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

async function getBotLogs(): Promise<BotLog[]> {
  // Fetch bot logs from your API
  return [
    { id: "log-b-1", timestamp: "2025-07-03 18:30:15", platform: "WhatsApp", user: "+23277111222", action: "Check Balance", status: "Success" },
    { id: "log-b-2", timestamp: "2025-07-03 18:25:40", platform: "USSD", user: "*123#", action: "Register Member", status: "Failure" },
    { id: "log-b-3", timestamp: "2025-07-03 18:20:05", platform: "WhatsApp", user: "+23277333444", action: "Request Solidarity", status: "Success" },
  ];
}

async function getAgentLogs(): Promise<AgentLog[]> {
  // Fetch agent logs from your API
  return [
    { id: "log-a-1", timestamp: "2025-07-03 17:55:10", agentName: "Agent Abu", action: "Member Registration", target: "NIN-987654321", status: "Completed" },
    { id: "log-a-2", timestamp: "2025-07-03 17:40:25", agentName: "Agent Binta", action: "Payment Collection", target: "NIN-123456789", status: "Completed" },
    { id: "log-a-3", timestamp: "2025-07-03 17:35:00", agentName: "Agent Abu", action: "Member Registration", target: "NIN-112233445", status: "Failed" },
  ];
}

export default async function ActivityPage() {
  const botData = await getBotLogs();
  const agentData = await getAgentLogs();

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bot & Agent Activity</h1>
        <p className="text-muted-foreground">
          Monitor system interactions and agent performance.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Bot Activity Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityDataTable
              columns={botColumns}
              data={botData}
              filterColumnId="user"
              filterPlaceholder="Filter by user ID..."
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Agent Activity Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityDataTable
              columns={agentColumns}
              data={agentData}
              filterColumnId="agentName"
              filterPlaceholder="Filter by agent name..."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
