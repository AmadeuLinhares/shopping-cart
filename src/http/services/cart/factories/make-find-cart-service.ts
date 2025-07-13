import { FindCartService } from "../find/find";
import { cartRepo } from "@/lib/singletons/cart-repo";

export const makeFindCartService = () => {
  const service = new FindCartService(cartRepo);
  return service;
};
