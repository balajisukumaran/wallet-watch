import { getIncomesApi } from "@/api";
import { IncomeApiResponse } from "@/api/api.types";
import { useQuery } from "@tanstack/react-query";

const useIncomes = () => {
  const query = useQuery<IncomeApiResponse[]>({
    queryKey: ["getIncomes"],
    queryFn: getIncomesApi,
  });
  return query;
};

export default useIncomes;
