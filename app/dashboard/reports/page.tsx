import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Separator } from "../../../components/ui/separator";
import { DownloadIcon, FileTextIcon } from "lucide-react";

// We can expand this with more complex filter options later
const reports = [
  { id: "contributions", name: "Contributions Report" },
  { id: "clinic-visits", name: "Clinic Visit Logs" },
  { id: "solidarity-history", name: "Solidarity Fund History" },
  { id: "member-growth", name: "Member Growth Trends" },
  { id: "agent-performance", name: "Agent Performance" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          Generate and download detailed reports for insights and record-keeping.
        </p>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Generate a Report</CardTitle>
          <CardDescription>
            Select a report type and set your desired filters, then click 'Generate' to download.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="report-type" className="text-sm font-medium">Report Type</label>
              <Select>
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Select a report..." />
                </SelectTrigger>
                <SelectContent>
                  {reports.map((report) => (
                    <SelectItem key={report.id} value={report.id}>
                      {report.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              {/* <DatePickerWithRange className="w-full" /> // Placeholder for date picker */}
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                Select dates...
              </Button>
            </div>
          </div>
          <Button className="w-full md:w-auto">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Generate & Download Report
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Generated Reports</h2>
        <div className="rounded-md border p-4 text-center text-muted-foreground">
          <FileTextIcon className="mx-auto h-12 w-12" />
          <p className="mt-2">Your generated reports will appear here.</p>
        </div>
      </div>
    </div>
  );
}
