import { IncomeApiResponse } from "@/api/api.types";
import { Button } from "@/components/ui/button";
import useIncomeMutation from "@/hooks/useIncomeMutation";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

export type TIncome = {
  id: string;
  name: string;
  description: string;
};

export const incomeColumns: ColumnDef<IncomeApiResponse>[] = [
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
    accessorKey: "value",
    header: "Value($)",
    cell: ({ row }) => <div>{row.getValue("value")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const mutation = useIncomeMutation();

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
