import { makeFetchProductService } from "@/http/services/products/factories/make-fetch-product-services";
import { NextResponse } from "next/server";

export async function GET() {
  const service = makeFetchProductService();
  const response = await service.execute();

  return NextResponse.json(response);
}
