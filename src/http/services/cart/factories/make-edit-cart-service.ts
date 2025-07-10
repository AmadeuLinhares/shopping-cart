import { InMemoryCartRepository } from "@/http/repositories/in-memory-cart-repository";
import { InMemoryProductRepository } from "@/http/repositories/in-memory-product-repository";
import { EditCartService } from "../edit/edit";

export const makeEditCartService = () => {
  const productRepository = new InMemoryProductRepository();
  const cartRepository = new InMemoryCartRepository();

  const service = new EditCartService(cartRepository, productRepository);
  return service;
};
