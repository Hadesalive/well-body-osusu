"use client"

import * as React from "react"
import {
  BarChartIcon,
  BotIcon,
  FileTextIcon,
  HeartHandshakeIcon,
  HelpCircleIcon,
  HospitalIcon,
  LayoutDashboardIcon,
  ListIcon,
  MailIcon,
  PlusCircleIcon,
  SettingsIcon,
  UserCog,
  UsersIcon,
} from "lucide-react"

import { NavDocuments } from '@/components/nav-documents'
import { NavMain } from '@/components/nav-main'
import { NavSecondary } from '@/components/nav-secondary'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const data = {
  user: {
    name: "Admin User",
    email: "admin@wellbodyosusu.com",
    avatar: "/avatars/01.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Member Management",
      url: "/dashboard/members",
      icon: UsersIcon,
    },
    {
      title: "Contributions",
      url: "/dashboard/contributions",
      icon: ListIcon,
    },
    {
      title: "Solidarity Fund",
      url: "/dashboard/solidarity",
      icon: HeartHandshakeIcon,
    },
    {
      title: "Clinic Integration",
      url: "/dashboard/clinics",
      icon: HospitalIcon,
    },
  ],
  documents: [
    {
      name: "Bot & Agent Activity",
      url: "/dashboard/activity",
      icon: BotIcon,
    },
    {
      name: "Reports & Analytics",
      url: "/dashboard/reports",
      icon: BarChartIcon,
    },
    {
      name: "Audit Log",
      url: "/dashboard/admin/audit",
      icon: FileTextIcon,
    },
  ],
  navSecondary: [
    {
      title: "User Management",
      url: "/dashboard/admin/users",
      icon: UserCog,
    },
    {
      title: "System Settings",
      url: "/dashboard/admin/settings",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
            >
              <a href="/dashboard">
                <HeartHandshakeIcon className="h-5 w-5" />
                <span className="text-sm font-semibold">Well Body Osusu</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-y-4 px-3">
        <div className="flex items-center gap-x-2">

        </div>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}