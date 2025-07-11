import { Product } from "@/http/repositories/interfaces/products";
import { useQuery } from "@tanstack/react-query";

interface GetProducts {
  products: Product[];
}

export const useGetProducts = () => {
  return useQuery<GetProducts>({
    queryKey: ["products"],
    queryFn: async (): Promise<GetProducts> => {
      const response = await fetch("/api/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      return response.json(); // inferred as Promise<GetProducts>
    },
  });
};
