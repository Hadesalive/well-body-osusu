"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "../../../../components/ui/badge"

// Define the shape of an audit log entry
export type AuditLog = {
  id: string
  user: {
    name: string
    avatar: string
  }
  action: string
  details: string
  date: string
  status: "success" | "failed" | "pending"
}

// Define the columns for the data table
export const columns: ColumnDef<AuditLog>[] = [
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const user = row.original.user
      return (
        <div className="flex items-center gap-2">
          <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
          <span>{user.name}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "action",
    header: "Action",
  },
  {
    accessorKey: "details",
    header: "Details",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return <span>{new Date(row.original.date).toLocaleString()}</span>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status
      const variant =
        status === "success"
          ? "default"
          : status === "failed"
          ? "destructive"
          : "secondary"

      return <Badge variant={variant}>{status}</Badge>
    },
  },
]
