import { DeleteCartService } from "../delete/delete";
import { cartRepo } from "@/lib/singletons/cart-repo";

export const makeDeleteCartService = () => {
  const service = new DeleteCartService(cartRepo);
  return service;
};
