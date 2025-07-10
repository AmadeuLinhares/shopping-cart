import { InMemoryCartRepository } from "@/http/repositories/in-memory-cart-repository";
import { it, describe, beforeEach, expect } from "vitest";
import { ProductNotFound } from "@/http/errors/products/products-error";

import { FindCartService } from "./find";

let cartRepository: InMemoryCartRepository;
let service: FindCartService;

describe("Cart/Edit", () => {
  beforeEach(() => {
    cartRepository = new InMemoryCartRepository();
    service = new FindCartService(cartRepository);

    cartRepository.items.products.push({
      amount: 1,
      id: "product-mock-id-5",
      name: "First Product",
      price: 10,
      stock: 100,
    });
  });

  it("Should be able to find product in cart", async () => {
    const { product } = await service.execute("product-mock-id-5");

    expect(product).toBeTruthy();
    expect(product.id).toBe("product-mock-id-5");
  });

  it("Should return error when not find product", async () => {
    await expect(service.execute("product-mock-id-6")).rejects.toBeInstanceOf(
      ProductNotFound,
    );
  });
});
