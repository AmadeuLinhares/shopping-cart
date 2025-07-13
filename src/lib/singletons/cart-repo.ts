import { InMemoryCartRepository } from "@/http/repositories/in-memory-cart-repository";

const globalForCartRepo = globalThis as unknown as {
  cartRepo?: InMemoryCartRepository;
};

export const cartRepo =
  globalForCartRepo.cartRepo ?? new InMemoryCartRepository();

if (process.env.NODE_ENV !== "production") {
  globalForCartRepo.cartRepo = cartRepo;
}
