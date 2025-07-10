import { InMemoryProductRepository } from "@/http/repositories/in-memory-product-repository";
import { CreateProductService } from "../create/create";

export const makeCreateProductService = () => {
  const repository = new InMemoryProductRepository();
  const service = new CreateProductService(repository);

  return service;
};
