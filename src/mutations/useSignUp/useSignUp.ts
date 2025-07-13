import { SignUpBody } from "@/app/sign-up/page";
import { User } from "@/http/repositories/interfaces/user";
import { RequestError } from "@/types/request-errors";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface SignUpResponse {
  success: boolean;
  message: string;
  response: {
    user: User;
  };
}

export const useSignUp = () => {
  return useMutation<SignUpResponse, RequestError, SignUpBody>({
    mutationFn: async (data) => {
      const res = await fetch("api/sign-up", {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw errorData;
      }

      const json: SignUpResponse = await res.json();
      return json;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
