import { ProductNotFound } from "@/http/errors/products/products-error";
import { makeDeleteCartService } from "@/http/services/cart/factories/make-delete-cart-service";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  const { productId } = await params;

  try {
    const service = makeDeleteCartService();

    const { cart } = await service.execute(productId);

    return NextResponse.json(
      {
        success: true,
        message: "Product remove from your cart",
        cart,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof ProductNotFound) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 },
      );
    }

    throw error;
  }
}
