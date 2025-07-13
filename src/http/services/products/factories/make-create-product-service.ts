import { CreateProductService } from "../create/create";
import { productRepo } from "@/lib/singletons/product-repo";

export const makeCreateProductService = () => {
  const service = new CreateProductService(productRepo);

  return service;
};
