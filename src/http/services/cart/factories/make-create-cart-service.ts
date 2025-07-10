import { InMemoryCartRepository } from "@/http/repositories/in-memory-cart-repository";
import { InMemoryProductRepository } from "@/http/repositories/in-memory-product-repository";
import { CreateCartService } from "../create/create";

export const makeCreateCartService = () => {
  const productRepository = new InMemoryProductRepository();
  const cartRepository = new InMemoryCartRepository();

  const service = new CreateCartService(cartRepository, productRepository);
  return service;
};
