import { cartRepo } from "@/lib/singletons/cart-repo";
import { ResumeService } from "../resume";
import { userRepo } from "@/lib/singletons/user-repo";

export const makeRequestInvoiceService = () => {
  const service = new ResumeService(cartRepo, userRepo);
  return service;
};
