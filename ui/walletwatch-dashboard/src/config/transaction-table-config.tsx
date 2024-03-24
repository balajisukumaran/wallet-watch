import { TransactionApiResponse } from "@/api/api.types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import useTransactionMutation from "@/hooks/useTransactionMutation";
import { EditTransaction } from "@/components/app/Modals/EditTransaction";
import { useState } from "react";

export const transactionColumns: ColumnDef<TransactionApiResponse>[] = [
  {
    accessorKey: "transactionId",
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
    accessorKey: "reminder",
    header: "Reminder",
    cell: ({ row }) => {
      const value: any = row.getValue("reminder");
      return <div>{value?.type}</div>;
    },
  },
  {
    accessorKey: "paymentDate",
    header: "Date",
    cell: ({ row }) => {
      const paymentDateString = row.getValue("paymentDate") as number;
      const paymentDate = new Date(paymentDateString);
      const formattedPaymentDate = format(paymentDate, "y-MM-dd");
      return <div>{formattedPaymentDate}</div>;
    },
  },
  {
    accessorKey: "price",
    header: "Price($)",
    cell: ({ row }) => <div>{row.getValue("price")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const deleteMutation = useTransactionMutation();
      const [open, setOpen] = useState(false);
      const handleDelete = () => {
        deleteMutation.mutate({
          type: "Delete",
          request: { transactionId: row.getValue("transactionId") },
        });
      };

      const handleEdit = () => {
        setOpen(!open);
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
              <DropdownMenuItem
                className="focus:bg-destructive"
                onClick={handleDelete}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <EditTransaction
            open={open}
            setOpen={setOpen}
            title="Edit Transaction"
            defaultValues={() => {
              const category: any = row.getValue("categoryId");
              const reminder: any = row.getValue("reminder");
              return {
                transactionId: row.getValue("transactionId"),
                name: row.getValue("name"),
                categoryId: category?.categoryId,
                reminderTypeId: reminder?.reminderTypeId,
                description: row.getValue("description"),
                enableReminder: 1,
                paymentDate: row.getValue("paymentDate"),
                price: row.getValue("price"),
              };
            }}
          />
        </>
      );
    },
  },
];
