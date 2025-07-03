import { ChartAreaInteractive } from "../../components/chart-area-interactive"
import { AgentActivityTable } from "../../components/agent-activity-table"
import { AuditLogFeed } from "../../components/audit-log-feed"
import { DataTable } from "../../components/data-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { SectionCards } from "../../components/section-cards"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { AlertTriangleIcon } from "lucide-react"


import data from "./data.json"

export default function Page() {


  // Transform memberGrowthChart data to match the expected props for ChartAreaInteractive
  const memberGrowthChartData = {
    last6Months: data.memberGrowthChart.timeRanges["6m"].map(
      ({ month, members }) => ({ date: month, members })
    ),
    last3Months: data.memberGrowthChart.timeRanges["3m"].map(
      ({ month, members }) => ({ date: month, members })
    ),
    last30Days: data.memberGrowthChart.timeRanges["30d"].map(
      ({ day, members }) => ({ date: day, members })
    ),
  }

  // Transform recentRegistrations data to match the expected props for DataTable
  const recentRegistrationsData = data.recentRegistrations.map((reg) => {
    const { registrationDate, ...rest } = reg
    return {
      ...rest,
      registered_date: registrationDate,
    }
  })

  const agentActivityData = data.agentActivity
  const auditLogData = data.auditLog

  const systemWarnings = [
    { id: 'warn-1', text: 'Solidarity fund is below 30% of its target.' },
    { id: 'warn-2', text: 'Agent \"Isata Moromba\" has been inactive for more than 7 days.' },
    { id: 'warn-3', text: '3 new solidarity applications require immediate review.' },
  ];

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <div className="px-4 lg:px-6">
        <Card className="border-orange-500/50 bg-orange-50/50 dark:bg-orange-900/10">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-orange-600 dark:text-orange-400">
              <AlertTriangleIcon className="h-5 w-5" />
              System Warnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {systemWarnings.map((warning) => (
                <li key={warning.id} className="flex items-start gap-2">
                  <span className="mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500"></span>
                  <span>{warning.text}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive data={memberGrowthChartData} />
      </div>
      <div className="px-4 lg:px-6">
        <Tabs defaultValue="registrations">
          <TabsList>
            <TabsTrigger value="registrations">Recent Registrations</TabsTrigger>
            <TabsTrigger value="agent-activity">Agent Activity</TabsTrigger>
            <TabsTrigger value="audit-log">Audit Log</TabsTrigger>
          </TabsList>
          <TabsContent value="registrations">
            <DataTable data={recentRegistrationsData} />
          </TabsContent>
          <TabsContent value="agent-activity">
            <AgentActivityTable data={agentActivityData} />
          </TabsContent>
          <TabsContent value="audit-log">
            <AuditLogFeed data={auditLogData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
