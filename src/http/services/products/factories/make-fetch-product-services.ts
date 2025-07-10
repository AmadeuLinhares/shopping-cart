import { InMemoryProductRepository } from "@/http/repositories/in-memory-product-repository";
import { FetchProductService } from "../fetch/fetch";

export const makeFetchProductService = () => {
  const repository = new InMemoryProductRepository();
  const service = new FetchProductService(repository);

  return service;
};
