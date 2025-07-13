import { Cart } from "@/http/repositories/interfaces/cart";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export interface GetCartResponse {
  cart: Cart;
}

export const useGetCart = () => {
  return useQuery<GetCartResponse>({
    queryKey: ["cart"],
    queryFn: async (): Promise<GetCartResponse> => {
      const response = await fetch("/api/cart");

      if (!response.ok) {
        if (!response.ok) {
          const message = `Failed to fetch cart: ${response.status}`;
          toast.error(message);
          throw new Error(message);
        }
      }

      return response.json(); // inferred as Promise<GetProducts>
    },
  });
};
