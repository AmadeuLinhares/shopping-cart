import { InMemoryCartRepository } from "@/http/repositories/in-memory-cart-repository";
import { FindCartService } from "../find/find";

export const makeFindCartService = () => {
  const cartRepository = new InMemoryCartRepository();

  const service = new FindCartService(cartRepository);
  return service;
};
