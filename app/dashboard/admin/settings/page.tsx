import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Separator } from "../../../../components/ui/separator";

export default function SystemSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">
          Manage global settings for the entire application. Only Super Admins can access this page.
        </p>
      </div>
      <Separator />

      {/* Tier Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle>Contribution Tier Settings</CardTitle>
          <CardDescription>
            Define the amounts and benefits for each membership tier.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="tier1-amount">Tier 1 Amount (UGX)</Label>
              <Input id="tier1-amount" placeholder="e.g., 5000" />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="tier1-benefits">Tier 1 Benefits</Label>
              <Input id="tier1-benefits" placeholder="e.g., Basic clinic visits, 2 solidarity claims" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="tier2-amount">Tier 2 Amount (UGX)</Label>
              <Input id="tier2-amount" placeholder="e.g., 10000" />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="tier2-benefits">Tier 2 Benefits</Label>
              <Input id="tier2-benefits" placeholder="e.g., Advanced diagnostics, 4 solidarity claims" />
            </div>
          </div>
          <Button>Save Tier Settings</Button>
        </CardContent>
      </Card>

      {/* Solidarity Fund Rules Card */}
      <Card>
        <CardHeader>
          <CardTitle>Solidarity Fund Rules</CardTitle>
          <CardDescription>
            Set the rules and limits for solidarity fund applications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="max-duration">Max Support Duration (Months)</Label>
                    <Input id="max-duration" placeholder="e.g., 6" type="number" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="cooldown-period">Cooldown Period (Months)</Label>
                    <Input id="cooldown-period" placeholder="e.g., 12" type="number" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="auto-expiry">Application Expiry (Days)</Label>
                    <Input id="auto-expiry" placeholder="e.g., 30" type="number" />
                </div>
            </div>
          <Button>Save Solidarity Rules</Button>
        </CardContent>
      </Card>

      {/* App Branding Card */}
      <Card>
        <CardHeader>
          <CardTitle>App Branding</CardTitle>
          <CardDescription>
            Customize the appearance of the application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="logo-upload">Upload Logo</Label>
                    <Input id="logo-upload" type="file" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <Input id="primary-color" type="color" defaultValue="#16A34A" />
                </div>
            </div>
          <Button>Save Branding</Button>
        </CardContent>
      </Card>
    </div>
  );
}
