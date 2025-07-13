import { Product } from "@/http/repositories/interfaces/products";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

interface GetProducts {
  products: Product[];
}

export const useGetProducts = () => {
  return useQuery<GetProducts>({
    queryKey: ["products"],
    queryFn: async (): Promise<GetProducts> => {
      const response = await fetch("/api/products");

      if (!response.ok) {
        if (!response.ok) {
          const message = `Failed to fetch products: ${response.status}`;
          toast.error(message);
          throw new Error(message);
        }
      }

      return response.json(); // inferred as Promise<GetProducts>
    },
  });
};
