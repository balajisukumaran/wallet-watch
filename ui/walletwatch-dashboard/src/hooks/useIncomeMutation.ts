import { addIncomeApi, deleteIncomeApi } from "@/api";
import { IncomeApiRequest, IncomeApiResponse } from "@/api/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type IncomeMutationType =
  | {
      type: "Add";
      request: IncomeApiRequest;
    }
  | {
      type: "Delete";
      request: IncomeApiResponse;
    };

const useIncomeMutation = () => {
  const queryClient = useQueryClient();
  const mutationFn = ({ type, request }: IncomeMutationType) => {
    if (type === "Add") return addIncomeApi(request);
    else return deleteIncomeApi(request);
  };

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getIncomes"] });
    },
  });
  return mutation;
};

export default useIncomeMutation;
