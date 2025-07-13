"use client";

import { SkeletonCard } from "@/components/ui/card-loader";
import { CartCard } from "@/components/ui/cart-card";
import { Invoice } from "@/components/ui/invoice";
import { EditCartProduct } from "@/http/repositories/interfaces/cart";
import { useDeleteProductCart } from "@/mutations/useDeleteProductCart/useDeleteProductCart";
import { useEditProductCart } from "@/mutations/useEditProductCart/useEditProductCart";
import { useGetCart } from "@/queries/useGetCart/useGetCart";
import { useCallback, useMemo } from "react";

export default function Cart() {
  const { data, isLoading } = useGetCart();
  const { mutate } = useDeleteProductCart();
  const { mutate: editMutate } = useEditProductCart();

  const handleDeleteProduct = useCallback(
    (productId: string) => {
      mutate(productId);
    },
    [mutate],
  );

  const handleEditProduct = useCallback(
    (data: EditCartProduct) => {
      editMutate(data);
    },
    [editMutate],
  );

  const renderCart = useMemo(() => {
    if (!data?.cart.products.length) {
      return (
        <div className="flex justify-center items-center">
          <p className="text-secondary text-2xl">
            No products added to cart 🥺{" "}
          </p>
        </div>
      );
    }

    return data?.cart.products.map((current) => (
      <CartCard
        handleDeleteProduct={handleDeleteProduct}
        handleEditProduct={handleEditProduct}
        {...current}
        key={current.id}
      />
    ));
  }, [data?.cart.products, handleDeleteProduct, handleEditProduct]);

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
    <div className="grid gap-8">
      <div className="justify-center items-center flex">
        <h1 className="text-5xl text-secondary">Cart</h1>
      </div>

      <div className="flex justify-center items-center">
        <div className="grid gap-x-6 grid-cols-[auto_auto]">
          {/* Products list */}

          <div className="flex gap-6 flex-wrap">{renderCart}</div>
          {/* Resume Price */}
          {!!data?.cart.products.length && (
            <div>
              <Invoice />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
