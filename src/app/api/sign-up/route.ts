// app/api/signup/route.ts

import { UserAlreadyExistError } from "@/http/errors/users/users-error";
import { makeCreateUserService } from "@/http/services/users/factories/make-create-user-services";
import { NextRequest, NextResponse } from "next/server";
import z, { ZodError } from "zod";

const RoleEnum = z.enum(["VIP", "USER"]);

const signUpSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  role: z.array(RoleEnum).nonempty(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, role } = signUpSchema.parse(body);

    const service = makeCreateUserService();

    const response = await service.execute({
      email,
      password,
      roles: role,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User created",
        response,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: error.format(),
        },
        { status: 400 },
      );
    }

    if (error instanceof UserAlreadyExistError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 409 },
      );
    }

    throw error;
  }
}
