import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export interface GetInvoiceResponse {
  invoice: {
    discount: number;
    total: number;
    totalToPay: number;
  };
}

export const useGetInvoice = () => {
  return useQuery<GetInvoiceResponse>({
    retry: false,
    queryKey: ["invoice"],
    staleTime: 1000 * 60, // 1 minute
    queryFn: async (): Promise<GetInvoiceResponse> => {
      const response = await fetch("/api/invoice");

      if (!response.ok) {
        const message = `Failed to fetch invoice: ${response.status}`;
        toast.error(message);
        throw new Error(message);
      }

      return response.json(); // inferred as Promise<GetProducts>
    },
  });
};
