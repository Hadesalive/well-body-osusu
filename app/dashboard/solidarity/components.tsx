"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Badge } from "../../../components/ui/badge";

export type SolidarityApplication = {
  id: string;
  applicantName: string;
  nin: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  submittedDate: string;
  amountRequested: number;
};

export const columns: ColumnDef<SolidarityApplication>[] = [
  {
    accessorKey: "applicantName",
    header: "Applicant Name",
  },
  {
    accessorKey: "nin",
    header: "NIN",
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
  {
    accessorKey: "amountRequested",
    header: "Amount (SLL)",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amountRequested"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "SLL",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "submittedDate",
    header: "Submitted",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      let variant: "secondary" | "default" | "destructive" = "secondary";
      if (status === "Approved") variant = "default";
      if (status === "Rejected") variant = "destructive";

      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const application = row.original;

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
            <DropdownMenuItem>View Application Details</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-success-foreground">Approve</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive-foreground">Reject</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
