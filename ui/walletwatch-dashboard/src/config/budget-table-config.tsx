import { BudgetApiResponse } from "@/api/api.types";
import { Button } from "@/components/ui/button";
import useBudgetMutation from "@/hooks/useBudgetMutation";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

export type TBudget = {
  id: string;
  name: string;
  description: string;
  categoryId: { categoryId: number; name: string };
  value: number;
};

export const budgetColumns: ColumnDef<BudgetApiResponse>[] = [
  {
    accessorKey: "id",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "categoryId",
    header: "Category",
    cell: ({ row }) => {
      const value: any = row.getValue("categoryId");
      return <div>{value?.name}</div>;
    },
  },
  {
    accessorKey: "value",
    header: "Value($)",
    cell: ({ row }) => <div>{row.getValue("value")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const mutation = useBudgetMutation();

      const handleDelete = () => {
        mutation.mutate({
          type: "Delete",
          request: { id: row.getValue("id") },
        });
      };

      return (
        <Button variant="ghost" className="h-8 w-8 p-0">
          <Trash2 className="h-4 w-4" onClick={handleDelete} />
        </Button>
      );
    },
  },
];
