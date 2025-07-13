import { CreateCartService } from "../create/create";
import { productRepo } from "@/lib/singletons/product-repo";
import { cartRepo } from "@/lib/singletons/cart-repo";

export const makeCreateCartService = () => {
  const service = new CreateCartService(cartRepo, productRepo);
  return service;
};
