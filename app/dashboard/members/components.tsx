"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
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
import { EditMemberForm } from "./edit-member-form";
import { DeleteMemberAlert } from "./delete-member-alert";

export type Member = {
  id: string; // Internal DB ID
  wboId: string; // Well Body Osusu specific ID
  nin: string;
  name: string;
  phone: string;
  address: string;
  occupation: string;
  incomeBracket: 'Low' | 'Medium' | 'High';
  tier: "Tier 1" | "Tier 2" | "Tier 3";
  status: "Active" | "Inactive" | "Flagged";
  group: string;
  district: string;
};

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "wboId",
    header: "WBO ID",
  },
  {
    accessorKey: "nin",
    header: "NIN",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "tier",
    header: "Tier",
    cell: ({ row }) => {
      const tier = row.getValue("tier") as string;
      let variant: "secondary" | "default" | "outline" = "secondary";
      if (tier === "Tier 2") variant = "default";
      if (tier === "Tier 3") variant = "outline";

      return <Badge variant={variant}>{tier}</Badge>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      let variant: "default" | "destructive" | "outline" = "default";
      if (status === "Inactive") variant = "destructive";
      if (status === "Flagged") variant = "outline";

      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "group",
    header: "Group",
  },
  {
    accessorKey: "district",
    header: "District",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const member = row.original;

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
              onClick={() => navigator.clipboard.writeText(member.id)}
            >
              Copy Member ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={`/dashboard/members/${member.id}`}>
              <DropdownMenuItem>View Profile</DropdownMenuItem>
            </Link>
            <EditMemberForm member={member}>
              <DropdownMenuItem onSelect={(e: Event) => e.preventDefault()}>
                Edit
              </DropdownMenuItem>
            </EditMemberForm>
            <DeleteMemberAlert memberId={member.id}>
              <DropdownMenuItem onSelect={(e: Event) => e.preventDefault()} className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DeleteMemberAlert>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
