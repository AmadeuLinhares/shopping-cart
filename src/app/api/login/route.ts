// app/api/login/route.ts

import { InvalidCredentialsError } from "@/http/errors/users/users-error";
import { makeAuthenticateService } from "@/http/services/users/factories/make-authenticate-services";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import { z, ZodError } from "zod";

const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    const service = makeAuthenticateService();

    const { user } = await service.execute({ email, password });

    const cookie = serialize("user-id", user.id, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    // Set cookie manually on headers
    const res = NextResponse.json(
      {
        success: true,
        user,
      },
      { status: 200 },
    );
    res.headers.set("Set-Cookie", cookie);
    return res;
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

    if (error instanceof InvalidCredentialsError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 401 },
      );
    }

    console.error("Unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
