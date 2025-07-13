"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@/mutations/useSignUp/useSignUp";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

const RoleEnum = z.enum(["VIP", "USER"]);

const signUpSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  role: z.array(RoleEnum).nonempty(),
});

export type SignUpBody = z.Infer<typeof signUpSchema>;

export default function SignUp() {
  const { mutate, isPending } = useSignUp();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpBody>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = useCallback(
    (data: SignUpBody) => {
      mutate(data, {
        onSuccess: () => {
          toast.success("User successfully created");
          router.push("/login");
          router.refresh();
        },
      });
    },
    [mutate, router],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center items-center"
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Create your account to be able to buy products
          </CardDescription>
          <CardAction>
            <Link href={"login"}>Login</Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
              />
              <div>
                {errors.email && (
                  <span className="text-sm text-red-600">Field required</span>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Input id="password" type="password" {...register("password")} />
              <div>
                {errors.password && (
                  <span className="text-sm text-red-600">Field required</span>
                )}
              </div>
            </div>
            <div>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value?.[0] ?? ""}
                    onValueChange={(val) => field.onChange([val])}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">Regular user</SelectItem>
                      <SelectItem value="VIP">VIP</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <div>
                {errors.role && (
                  <span className="text-sm text-red-600">Field required</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          {isPending ? (
            <Spinner />
          ) : (
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          )}
        </CardFooter>
      </Card>
    </form>
  );
}
