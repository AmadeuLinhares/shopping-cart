import { AuthenticateService } from "../authenticate/authenticate";
import { userRepo } from "@/lib/singletons/user-repo";

export const makeAuthenticateService = () => {
  const authService = new AuthenticateService(userRepo);

  return authService;
};
