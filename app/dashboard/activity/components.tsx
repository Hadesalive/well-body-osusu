"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../../../components/ui/badge";

// Data structure for Bot Activity
export type BotLog = {
  id: string;
  timestamp: string;
  platform: "WhatsApp" | "USSD";
  user: string; // Phone number or identifier
  action: string;
  status: "Success" | "Failure";
};

// Data structure for Agent Activity
export type AgentLog = {
  id: string;
  timestamp: string;
  agentName: string;
  action: "Member Registration" | "Payment Collection";
  target: string; // Member NIN or reference
  status: "Completed" | "Pending" | "Failed";
};

// Columns for the Bot Activity table
export const botColumns: ColumnDef<BotLog>[] = [
  { accessorKey: "timestamp", header: "Timestamp" },
  { accessorKey: "platform", header: "Platform" },
  { accessorKey: "user", header: "User ID" },
  { accessorKey: "action", header: "Action" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant = status === "Success" ? "default" : "destructive";
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
];

// Columns for the Agent Activity table
export const agentColumns: ColumnDef<AgentLog>[] = [
  { accessorKey: "timestamp", header: "Timestamp" },
  { accessorKey: "agentName", header: "Agent Name" },
  { accessorKey: "action", header: "Action" },
  { accessorKey: "target", header: "Target ID" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      let variant: "default" | "secondary" | "destructive" = "default";
      if (status === "Pending") variant = "secondary";
      if (status === "Failed") variant = "destructive";
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
];
