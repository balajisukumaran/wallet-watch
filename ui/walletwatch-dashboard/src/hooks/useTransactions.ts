import { getTransactionsApi } from "@/api";
import { TransactionApiResponse } from "@/api/api.types";
import { useQuery } from "@tanstack/react-query";

const useTransactions = () => {
  const query = useQuery<TransactionApiResponse[]>({
    queryKey: ["getTransactions"],
    queryFn: getTransactionsApi,
  });
  return query;
};

export default useTransactions;
