"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

// This type is used to define the shape of our data.
export type Contribution = {
  id: string;
  member: {
    name: string;
    nin: string;
  };
  amount: number;
  method: "Mobile Money" | "Bank Transfer" | "Cash";
  tier: "Tier 1" | "Tier 2" | "Tier 3";
  status: "Completed" | "Pending" | "Failed";
  date: string;
};

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "UGX", // Or whichever currency is appropriate
    minimumFractionDigits: 0,
  }).format(amount);
};

export const columns: ColumnDef<Contribution>[] = [
  {
    accessorKey: "member",
    header: "Member",
    cell: ({ row }) => {
      const member = row.original.member;
      return (
        <div className="font-medium">
          <div>{member.name}</div>
          <div className="text-xs text-muted-foreground">{member.nin}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <div>{formatCurrency(row.original.amount)}</div>,
  },
  {
    accessorKey: "method",
    header: "Payment Method",
  },
  {
    accessorKey: "tier",
    header: "Tier",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const variant =
        status === "Completed"
          ? "success"
          : status === "Pending"
          ? "warning"
          : "destructive";
      return <Badge variant={variant as any}>{status}</Badge>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const contribution = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(contribution.id)}
            >
              Copy transaction ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View member profile</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
