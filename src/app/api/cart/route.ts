import { makeFetchCartService } from "@/http/services/cart/factories/make-fetch-cart-service";
import { NextResponse } from "next/server";

export async function GET() {
  const service = makeFetchCartService();
  const response = await service.execute();

  return NextResponse.json(response);
}
