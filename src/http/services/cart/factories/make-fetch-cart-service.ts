import { cartRepo } from "@/lib/singletons/cart-repo";
import { FetchCartService } from "../fetch/fetch";

export const makeFetchCartService = () => {
  const service = new FetchCartService(cartRepo);
  return service;
};
