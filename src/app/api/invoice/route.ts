import { makeRequestInvoiceService } from "@/http/services/resume/factories/make-request-invoice-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = req.cookies.get("user-id");
    if (!userId?.value) {
      return NextResponse.json(
        {
          message: "Login to calculate your invoice",
          success: false,
        },
        {
          status: 401,
        },
      );
    }

    const service = makeRequestInvoiceService();
    const { discount, total } = await service.execute({
      userId: userId?.value,
    });

    return NextResponse.json(
      {
        success: true,
        invoice: {
          discount,
          total,
          totalToPay: total - discount,
        },
      },
      {
        status: 200,
      },
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
