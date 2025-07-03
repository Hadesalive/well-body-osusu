"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

// We will add the faceted filter components here later

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function MembersDataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter by NIN..."
          value={(table.getColumn("nin")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nin")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* We will add faceted filters here */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
