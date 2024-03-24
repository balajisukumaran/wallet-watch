import {
  addTransactionApi,
  deleteTransactionApi,
  editTransactionApi,
} from "@/api";
import { TransactionApiRequest, TransactionApiResponse } from "@/api/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type TransactionMutationType =
  | {
      type: "Add";
      request: TransactionApiRequest;
    }
  | {
      type: "Edit";
      request: TransactionApiRequest;
    }
  | {
      type: "Delete";
      request: TransactionApiResponse;
    };

const useTransactionMutation = () => {
  const queryClient = useQueryClient();
  const mutationFn = ({ type, request }: TransactionMutationType) => {
    if (type === "Add") return addTransactionApi(request);
    if (type === "Edit") return editTransactionApi(request);
    else return deleteTransactionApi(request);
  };
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getTransactions"] });
    },
  });
  return mutation;
};

export default useTransactionMutation;
