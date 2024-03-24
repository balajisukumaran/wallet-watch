import { budgetColumns } from "@/config/budget-table-config";

import DataTable from "@/components/app/DataTable";
import { Separator } from "@/components/ui/separator";
import useBudgets from "@/hooks/useBudgets";

const Budget = () => {
  const query = useBudgets();
  return (
    <section className="p-4 w-full">
      <h2 className="mb-4 text-3xl">Bugdet</h2>
      <Separator />
      {query.data && (
        <DataTable data={query.data} columns={budgetColumns} modal="Budget" />
      )}
    </section>
  );
};

export default Budget;
