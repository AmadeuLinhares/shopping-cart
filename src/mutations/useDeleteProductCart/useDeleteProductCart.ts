import { GetCartResponse } from "@/queries/useGetCart/useGetCart";
import { RequestError } from "@/types/request-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteProductCart = () => {
  const queryClient = useQueryClient();
  return useMutation<GetCartResponse, RequestError, string>({
    mutationFn: async (productId) => {
      const res = await fetch(`api/remove-product/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw errorData;
      }

      const json: GetCartResponse = await res.json();
      return json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["invoice"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
