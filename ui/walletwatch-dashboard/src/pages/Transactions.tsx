import DataTable from "@/components/app/DataTable";
import { transactionColumns } from "@/config/transaction-table-config";
import useTransactions from "@/hooks/useTransactions";
import { Separator } from "@radix-ui/react-separator";

const Transactions = () => {
  const query = useTransactions();
  return (
    <section className="p-4 w-full">
      <h2 className="mb-4 text-3xl">Transactions</h2>
      <Separator />
      <Separator />
      {query.data && (
        <DataTable
          data={query.data}
          columns={transactionColumns}
          modal="Transaction"
        />
      )}
    </section>
  );
};

export default Transactions;
