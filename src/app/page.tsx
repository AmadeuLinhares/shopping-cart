"use client";

import { SkeletonCard } from "@/components/ui/card-loader";
import { ProductCard } from "@/components/ui/product-card";
import { Product } from "@/http/repositories/interfaces/products";
import { useAddCart } from "@/mutations/useAddCart/useAddCart";
import { useGetProducts } from "@/queries/useGetProducts/useGetProducts";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

export default function Home() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, isLoading } = useGetProducts();
  const { mutate } = useAddCart();

  const handleAddCart = useCallback(
    (data: Product, redirectToCart: boolean) => {
      mutate(data, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["cart"] });
          queryClient.invalidateQueries({ queryKey: ["products"] });
          queryClient.invalidateQueries({ queryKey: ["invoice"] });
          if (redirectToCart) {
            router.push("/cart");
            router.refresh();
          } else {
            toast.success("Product added");
          }
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    },
    [mutate, queryClient, router],
  );
  if (isLoading) {
    return (
      <div className="flex gap-6 flex-wrap">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((current) => (
          <SkeletonCard key={current} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-wrap gap-4">
        {data?.products?.map((current) => (
          <ProductCard addCart={handleAddCart} {...current} key={current.id} />
        ))}
      </div>
    </div>
  );
}
