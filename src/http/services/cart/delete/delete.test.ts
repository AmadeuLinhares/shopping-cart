import { InMemoryCartRepository } from "@/http/repositories/in-memory-cart-repository";
import { it, describe, beforeEach, expect } from "vitest";
import { DeleteCartService } from "./delete";
import { ProductNotFound } from "@/http/errors/products/products-error";

let cartRepository: InMemoryCartRepository;
let service: DeleteCartService;

describe("Cart/Delete", () => {
  beforeEach(() => {
    cartRepository = new InMemoryCartRepository();
    service = new DeleteCartService(cartRepository);

    cartRepository.items.products.push({
      amount: 1,
      id: "product-mock-id-1",
      name: "First Product",
      price: 10,
      stock: 100,
    });
    cartRepository.items.products.push({
      amount: 1,
      id: "product-mock-id-2",
      name: "Second Product",
      price: 10,
      stock: 100,
    });
  });

  it("Should be able to delete product", async () => {
    const { cart } = await service.execute("product-mock-id-1");

    expect(cart?.products.length).toBe(1);
  });

  it("Should return error when not find product", async () => {
    await expect(service.execute("product-mock-id-6")).rejects.toBeInstanceOf(
      ProductNotFound,
    );
  });
});
