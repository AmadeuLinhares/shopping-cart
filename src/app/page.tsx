"use client";

import { ProductCard } from "@/components/ui/product-card";
import { useGetProducts } from "@/queries/useGetProducts/useGetProducts";

export default function Home() {
  const { data } = useGetProducts();

  return (
    <div className="flex justify-center items-center w-full  px-4">
      <div className="flex flex-wrap gap-4">
        {data?.products?.map((current) => (
          <ProductCard {...current} key={current.id} />
        ))}
      </div>
    </div>
  );
}
