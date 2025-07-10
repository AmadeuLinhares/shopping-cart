import { InMemoryUserRepository } from "@/http/repositories/in-memory-user-repository";
import { CreateUserService } from "../create/create";

export const makeCreateUserService = () => {
  const repository = new InMemoryUserRepository();
  const service = new CreateUserService(repository);

  return service;
};
