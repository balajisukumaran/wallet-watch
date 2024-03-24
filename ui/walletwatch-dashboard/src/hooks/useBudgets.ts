import { getBudgetsApi } from "@/api";
import { BudgetApiResponse } from "@/api/api.types";
import { useQuery } from "@tanstack/react-query";

const useBudgets = () => {
  const query = useQuery<BudgetApiResponse[]>({
    queryKey: ["getBudgets"],
    queryFn: getBudgetsApi,
  });
  return query;
};

export default useBudgets;
