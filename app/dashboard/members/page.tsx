import { Activity, CreditCard, Users, ShieldCheck } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AddMemberForm } from "./add-member-form";
import { columns, Member } from "./components";
import { MembersDataTable } from './data-table';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

import fs from "fs/promises";
import path from "path";

// Mock data for charts - in a real app, this would come from your database
const chartData = [
  { month: 'Jan', total: 120, active: 80 },
  { month: 'Feb', total: 150, active: 100 },
  { month: 'Mar', total: 170, active: 130 },
  { month: 'Apr', total: 210, active: 160 },
  { month: 'May', total: 250, active: 190 },
  { month: 'Jun', total: 280, active: 220 },
];

async function getMembers(): Promise<Member[]> {
  const filePath = path.join(process.cwd(), 'data', 'members.json');
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to read members data:', error);
    return []; // Return empty array on error
  }
}

export default async function MemberManagementPage() {
  const members = await getMembers();

  // Calculate stats
  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.status === 'Active').length;
  const newMembersThisMonth = 34; // Replace with actual logic

  const membersByTier = members.reduce((acc, member) => {
    acc[member.tier] = (acc[member.tier] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-3xl">Member Management</h1>
          <p className="text-lg text-muted-foreground">
            Oversee and manage all member records in the system.
          </p>
        </div>
        <AddMemberForm />
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMembers}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            <div className="h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeMembers}</div>
            <p className="text-xs text-muted-foreground">+18.1% from last month</p>
            <div className="h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                   <defs>
                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="active" stroke="#82ca9d" strokeWidth={2} fillOpacity={1} fill="url(#colorActive)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Members This Month</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{newMembersThisMonth}</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
             <div className="h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                   <defs>
                    <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="total" stroke="#ffc658" strokeWidth={2} fillOpacity={1} fill="url(#colorNew)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiers Distribution</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {Object.entries(membersByTier).map(([tier, count]) => (
                <div key={tier} className="flex justify-between">
                  <span>{tier}</span>
                  <span className="font-semibold">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <MembersDataTable columns={columns} data={members} />
    </main>
  );
}
