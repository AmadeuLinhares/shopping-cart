import { FindService } from "../find/find";
import { userRepo } from "@/lib/singletons/user-repo";

export const makeFindUserService = () => {
  const service = new FindService(userRepo);

  return service;
};
