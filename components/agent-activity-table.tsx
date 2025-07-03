"use client"

import * as React from "react"
import { 
  ColumnDef, 
  flexRender, 
  getCoreRowModel, 
  useReactTable, 
  getPaginationRowModel 
} from "@tanstack/react-table"

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "./ui/table"
import { Button } from "./ui/button"

interface AgentActivity {
  id: number
  name: string
  location: string
  registrations_this_month: number
  last_active: string
}

export const columns: ColumnDef<AgentActivity>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "registrations_this_month",
    header: "Registrations (Month)",
    cell: ({ row }) => <div className="text-center">{row.getValue("registrations_this_month")}</div>
  },
  {
    accessorKey: "last_active",
    header: "Last Active",
    cell: ({ row }) => {
      const date = new Date(row.getValue("last_active"))
      return <div>{date.toLocaleString()}</div>
    },
  },
]

interface AgentActivityTableProps {
  data: AgentActivity[]
}

export function AgentActivityTable({ data }: AgentActivityTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
