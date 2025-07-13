import { LoginBody } from "@/app/login/page";
import { User } from "@/http/repositories/interfaces/user";
import { RequestError } from "@/types/request-errors";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface AuthenticateResponse {
  user: User;
}

export const useAuthenticateUser = () => {
  return useMutation<AuthenticateResponse, RequestError, LoginBody>({
    mutationFn: async (data) => {
      const res = await fetch("api/login", {
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

      const json: AuthenticateResponse = await res.json();
      return json;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
