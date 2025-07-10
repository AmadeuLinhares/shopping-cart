import { InMemoryCartRepository } from "@/http/repositories/in-memory-cart-repository";
import { InMemoryProductRepository } from "@/http/repositories/in-memory-product-repository";
import { it, describe, beforeEach, expect } from "vitest";
import { Product } from "@/http/repositories/interfaces/products";
import { ProductNotFound } from "@/http/errors/products/products-error";
import {
  MinimumQuantityReached,
  NoStockAvailable,
} from "@/http/errors/cart/cart-errors";
import { EditCartService } from "./edit";

let productRepository: InMemoryProductRepository;
let cartRepository: InMemoryCartRepository;
let service: EditCartService;

const MOCK_PRODUCTS: Product[] = [];

describe("Cart/Add", () => {
  beforeEach(() => {
    for (let i = 0; i < 20; i++) {
      MOCK_PRODUCTS.push({
        id: `product-mock-id-${i}`,
        name: `Product Number - ${i}`,
        price: (i + 1) * 10,
        stock: i,
      });
    }

    productRepository = new InMemoryProductRepository();
    cartRepository = new InMemoryCartRepository();
    service = new EditCartService(cartRepository, productRepository);

    // Populate stock products
    MOCK_PRODUCTS.forEach((item) => {
      productRepository.items.push(item);
    });

    cartRepository.items.products.push({
      amount: 1,
      id: "product-mock-id-5",
      name: "First Product",
      price: 10,
      stock: 100,
    });
    cartRepository.items.products.push({
      amount: 3,
      id: "product-mock-id-19",
      name: "First Product",
      price: 10,
      stock: 100,
    });
  });

  it("Should be able to increase product amount", async () => {
    const { cart } = await service.execute({
      productId: "product-mock-id-5",
      action: "ADD",
    });

    expect(cart?.products.length).toBe(2);
    expect(cart?.products[0].amount).toBe(2);

    expect(cart?.products[0]).toEqual(
      expect.objectContaining({
        id: "product-mock-id-5",
      }),
    );
  });

  it("Should not be able to decrease product amount when amount equals 1", async () => {
    await expect(
      service.execute({
        productId: "product-mock-id-5",
        action: "REMOVE",
      }),
    ).rejects.toBeInstanceOf(MinimumQuantityReached);
  });

  it("Should be able to decrease product amount", async () => {
    const { cart } = await service.execute({
      productId: "product-mock-id-19",
      action: "REMOVE",
    });

    expect(cart?.products[1].amount).toBe(2);

    expect(cart?.products[1]).toEqual(
      expect.objectContaining({
        id: "product-mock-id-19",
      }),
    );
  });

  it("Should return error when not found product", async () => {
    await expect(
      service.execute({
        productId: "id-not-exist",
        action: "ADD",
      }),
    ).rejects.toBeInstanceOf(ProductNotFound);
  });

  it("Should return error when stock its not available", async () => {
    await expect(
      service.execute({
        productId: "product-mock-id-0",
        action: "ADD",
      }),
    ).rejects.toBeInstanceOf(NoStockAvailable);
  });
});
