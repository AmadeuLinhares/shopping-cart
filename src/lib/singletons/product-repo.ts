import { InMemoryProductRepository } from "@/http/repositories/in-memory-product-repository";
import { PRODUCTS_MOCK } from "@/mock/products";

const globalForProductRepo = globalThis as unknown as {
  productRepo?: InMemoryProductRepository;
};

export const productRepo =
  globalForProductRepo.productRepo ?? new InMemoryProductRepository();

// Populate only once (when first created)
if (!globalForProductRepo.productRepo) {
  for (const product of PRODUCTS_MOCK) {
    productRepo.create({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
  }
}

if (process.env.NODE_ENV !== "production") {
  globalForProductRepo.productRepo = productRepo;
}
