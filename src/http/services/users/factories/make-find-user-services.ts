import { InMemoryUserRepository } from "@/http/repositories/in-memory-user-repository";
import { FindService } from "../find/find";

export const makeFindUserService = () => {
  const repository = new InMemoryUserRepository();
  const service = new FindService(repository);

  return service;
};
