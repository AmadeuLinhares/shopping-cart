import { CreateUserService } from "../create/create";
import { userRepo } from "@/lib/singletons/user-repo";

export const makeCreateUserService = () => {
  const service = new CreateUserService(userRepo);

  return service;
};
