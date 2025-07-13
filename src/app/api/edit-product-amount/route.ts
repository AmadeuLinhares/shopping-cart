import {
  MinimumQuantityReached,
  NoStockAvailable,
} from "@/http/errors/cart/cart-errors";
import { ProductNotFound } from "@/http/errors/products/products-error";
import { makeEditCartService } from "@/http/services/cart/factories/make-edit-cart-service";
import { NextRequest, NextResponse } from "next/server";
import z, { ZodError } from "zod";

const schemaValidation = z.object({
  productId: z.string(),
  action: z.enum(["ADD", "REMOVE"]),
});

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, productId } = schemaValidation.parse(body);

    const service = makeEditCartService();
    const { cart } = await service.execute({
      action,
      productId,
    });

    return NextResponse.json({
      success: true,
      cart,
    });
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
          message: error.message,
        },
        { status: 404 },
      );
    }
    if (error instanceof NoStockAvailable) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 400 },
      );
    }

    if (error instanceof MinimumQuantityReached) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 400 },
      );
    }

    throw error;
  }
}
