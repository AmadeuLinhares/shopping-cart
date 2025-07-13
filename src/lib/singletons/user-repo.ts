import { InMemoryUserRepository } from "@/http/repositories/in-memory-user-repository";

const globalForUserRepo = globalThis as unknown as {
  userRepo?: InMemoryUserRepository;
};

export const userRepo =
  globalForUserRepo.userRepo ?? new InMemoryUserRepository();

if (process.env.NODE_ENV !== "production") {
  globalForUserRepo.userRepo = userRepo;
}
