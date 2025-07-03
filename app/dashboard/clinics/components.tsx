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

// Define the shape of our clinic data.
export type Clinic = {
  id: string;
  name: string;
  district: string;
  contact: string;
  status: "Active" | "Pending Approval" | "Inactive";
  services: number;
};

export const columns: ColumnDef<Clinic>[] = [
  {
    accessorKey: "name",
    header: "Clinic Name",
    cell: ({ row }) => {
      return <div className="font-medium">{row.original.name}</div>;
    },
  },
  {
    accessorKey: "district",
    header: "District",
  },
  {
    accessorKey: "contact",
    header: "Contact Person",
  },
  {
    accessorKey: "services",
    header: "Services Logged",
    cell: ({ row }) => {
        return <div className="text-center">{row.original.services}</div>
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const variant =
        status === "Active"
          ? "success"
          : status === "Pending Approval"
          ? "warning"
          : "destructive";
      return <Badge variant={variant as any}>{status}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const clinic = row.original;
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
            <DropdownMenuItem>View Clinic Details</DropdownMenuItem>
            <DropdownMenuItem>Edit Clinic Info</DropdownMenuItem>
            <DropdownMenuSeparator />
            {clinic.status === "Pending Approval" && (
              <DropdownMenuItem className="text-green-600">Approve Clinic</DropdownMenuItem>
            )}
            {clinic.status === "Active" && (
              <DropdownMenuItem className="text-red-600">Deactivate Clinic</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
