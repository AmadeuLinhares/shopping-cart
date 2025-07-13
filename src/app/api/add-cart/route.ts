import { NoStockAvailable } from "@/http/errors/cart/cart-errors";
import { ProductNotFound } from "@/http/errors/products/products-error";
import { makeCreateCartService } from "@/http/services/cart/factories/make-create-cart-service";
import { NextRequest, NextResponse } from "next/server";
import z, { ZodError } from "zod";

const cartSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.coerce.number(),
  stock: z.coerce.number(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { id, name, price, stock } = cartSchema.parse(body);

    const service = makeCreateCartService();
    const { cart } = await service.execute({
      id,
      name,
      price,
      stock,
    });

    return NextResponse.json(
      {
        success: true,
        cart,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          error: error.format(),
        },
        { status: 400 },
      );
    }

    if (error instanceof ProductNotFound) {
      return NextResponse.json(
        {
          success: false,
          message: "Product Not found",
        },
        { status: 404 },
      );
    }

    if (error instanceof NoStockAvailable) {
      return NextResponse.json(
        {
          success: false,
          message: "Stock Not available",
        },
        { status: 400 },
      );
    }

    throw error;
  }
}
