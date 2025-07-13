import { Product } from "@/http/repositories/interfaces/products";
import { GetCartResponse } from "@/queries/useGetCart/useGetCart";
import { RequestError } from "@/types/request-errors";
import { useMutation } from "@tanstack/react-query";

export const useAddCart = () => {
  return useMutation<GetCartResponse, RequestError, Product>({
    mutationFn: async (data) => {
      const res = await fetch("api/add-cart", {
        body: JSON.stringify(data),
        method: "POST",
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
  });
};
