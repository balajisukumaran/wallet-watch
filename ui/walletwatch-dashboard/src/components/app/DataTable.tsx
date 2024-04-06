import { useState } from "react";
import { PlusCircle } from "lucide-react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fuzzyFilter, columnsHiddenBydefault } from "@/lib/utils";
import DebouncedInput from "@/components/app/DebouncedInput";
import { AddBudget } from "./Modals/AddBudget";
import { AddIncome } from "./Modals/AddIncome";
import { AddTransaction } from "./Modals/AddTransaction";

export type DataTableProps = {
  data: any[];
  columns: ColumnDef<any, any>[];
  modal: "Budget" | "Income" | "Transaction";
  refetch?: () => Promise<any>;
};

export function DataTable({ data, columns, modal, refetch }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility: {
        ...columnsHiddenBydefault,
        ...columnVisibility,
      },
      rowSelection,
      globalFilter,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <DebouncedInput
          className="max-w-sm mr-4"
          placeholder="Filter budgets..."
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
        />
        {modal === "Budget" ? (
          <AddBudget title="Add Budget" />
        ) : modal === "Income" ? (
          <AddIncome title="Add Income" />
        ) : modal === "Transaction" ? (
          <AddTransaction title="Add Transaction" refetch={refetch} />
        ) : (
          <Button className="ml-auto px-2 py-0">
            New <PlusCircle className="ml-2" />
          </Button>
        )}
      </div>
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
                  );
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Total {table.getRowCount()} row(s).
        </div>
        <div className="space-x-2">
          {table.getCanPreviousPage() && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
          )}
          {table.getCanNextPage() && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DataTable;
