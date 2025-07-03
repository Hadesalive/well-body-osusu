import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { AgentActivityTable } from "@/components/agent-activity-table"
import { AuditLogFeed } from "@/components/audit-log-feed"
import { DataTable } from "@/components/data-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"

export default function Page() {
  // Transform summaryCards data to match the expected props for SectionCards
  const summaryCardsData = data.summaryCards.map((card, index) => ({
    ...card,
    description: card.footerDescription,
    icon: ([
      "IconUsers",
      "IconReportMoney",
      "IconHeartHandshake",
      "IconBuildingHospital",
    ] as const)[index],
  }))

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

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards data={summaryCardsData} />
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
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
