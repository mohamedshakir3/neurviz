"use client"

import { ColumnDef } from "@tanstack/react-table"

import { statuses } from "./data"
import { Task } from "./schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<Task>[] = [
	{
		id: "select",
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "date",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Date Submitted" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex w-full">
					<span className="truncate font-medium">{row.getValue("date")}</span>
				</div>
			)
		},
	},
	{
		accessorKey: "status",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => {
			const status = statuses.find(
				(status) => status.value === row.getValue("status")
			)

			if (!status) {
				return null
			}

			return (
				<div className="flex w-[100px] items-center">
					{status.icon && (
						<status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
					)}
					<span>{status.label}</span>
				</div>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
	{
		id: "actions",
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
]
