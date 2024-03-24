import { addBudgetApi, deleteBudgetApi } from "@/api";
import { BudgetApiRequest, BudgetApiResponse } from "@/api/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type BudgetMutationType =
  | {
      type: "Add";
      request: BudgetApiRequest;
    }
  | {
      type: "Delete";
      request: BudgetApiResponse;
    };

const useBudgetMutation = () => {
  const queryClient = useQueryClient();

  const mutationFn = ({ type, request }: BudgetMutationType) => {
    if (type === "Add") return addBudgetApi(request);
    else return deleteBudgetApi(request);
  };

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getBudgets"] });
    },
  });
  return mutation;
};

export default useBudgetMutation;
