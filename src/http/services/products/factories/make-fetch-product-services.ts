import { FetchProductService } from "../fetch/fetch";
import { productRepo } from "@/lib/singletons/product-repo";

export const makeFetchProductService = () => {
  const service = new FetchProductService(productRepo);

  return service;
};
