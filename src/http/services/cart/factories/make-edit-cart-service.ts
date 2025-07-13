import { EditCartService } from "../edit/edit";
import { cartRepo } from "@/lib/singletons/cart-repo";
import { productRepo } from "@/lib/singletons/product-repo";

export const makeEditCartService = () => {
  const service = new EditCartService(cartRepo, productRepo);
  return service;
};
