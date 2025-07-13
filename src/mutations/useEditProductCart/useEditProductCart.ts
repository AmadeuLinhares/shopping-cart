import { EditCartProduct } from "@/http/repositories/interfaces/cart";
import { GetCartResponse } from "@/queries/useGetCart/useGetCart";
import { RequestError } from "@/types/request-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEditProductCart = () => {
  const queryClient = useQueryClient();
  return useMutation<GetCartResponse, RequestError, EditCartProduct>({
    mutationFn: async (data) => {
      const res = await fetch("api/edit-product-amount", {
        body: JSON.stringify(data),
        method: "PUT",
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
