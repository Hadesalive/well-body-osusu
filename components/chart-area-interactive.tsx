"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Button } from "./ui/button"
import { IconChevronDown } from "@tabler/icons-react"

interface ChartDataPoint {
  date: string
  members: number
}

interface MemberGrowthChartData {
  last6Months: ChartDataPoint[]
  last3Months: ChartDataPoint[]
  last30Days: ChartDataPoint[]
}

interface ChartAreaInteractiveProps {
  data: MemberGrowthChartData
}

const chartConfig = {
  members: {
    label: "Members",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive({ data }: ChartAreaInteractiveProps) {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = React.useMemo(() => {
    switch (timeRange) {
      case "180d":
        return data.last6Months
      case "90d":
        return data.last3Months
      case "30d":
        return data.last30Days
      default:
        return data.last6Months
    }
  }, [data, timeRange])

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardDescription>Member Growth</CardDescription>
          <CardTitle>Monthly Membership Growth</CardTitle>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Last 6 months</span>
            <div className="ml-auto">
              <Select
                value={timeRange}
                onValueChange={(value) => setTimeRange(value)}
              >
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{timeRange === '180d' ? '6 Months' : timeRange === '90d' ? '3 Months' : '30 Days'}</span>
                    <IconChevronDown className="h-4 w-4" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="180d">6 Months</SelectItem>
                  <SelectItem value="90d">3 Months</SelectItem>
                  <SelectItem value="30d">30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="relative h-[250px] w-full overflow-hidden">
          <ChartContainer config={chartConfig}>
            <AreaChart
              width={400}
              height={250}
              data={filteredData}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="members" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                type="category"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip>
                <ChartTooltipContent />
              </ChartTooltip>
              <Area
                type="monotone"
                dataKey="members"
                stroke="#4f46e5"
                fill="url(#members)"
                fillOpacity={1}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
