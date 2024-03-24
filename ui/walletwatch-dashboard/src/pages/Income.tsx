import { incomeColumns } from "@/config/income-table-config";
import DataTable from "@/components/app/DataTable";
import { Separator } from "@/components/ui/separator";
import useIncomes from "@/hooks/useIncomes";

const Income = () => {
  const query = useIncomes();
  return (
    <section className="p-4 w-full">
      <h2 className="mb-4 text-3xl">Income</h2>
      <Separator />
      {query.data && (
        <DataTable data={query.data} columns={incomeColumns} modal="Income" />
      )}
    </section>
  );
};

export default Income;
