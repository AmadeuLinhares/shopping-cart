import { InMemoryUserRepository } from "@/http/repositories/in-memory-user-repository";
import { AuthenticateService } from "../authenticate/authenticate";

export const makeAuthenticateService = () => {
  const inMemoryUserRepository = new InMemoryUserRepository();
  const authService = new AuthenticateService(inMemoryUserRepository);

  return authService;
};
