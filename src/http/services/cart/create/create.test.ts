import { InMemoryCartRepository } from "@/http/repositories/in-memory-cart-repository";
import { InMemoryProductRepository } from "@/http/repositories/in-memory-product-repository";
import { it, describe, beforeEach, expect } from "vitest";
import { CreateCartService } from "./create";
import { Product } from "@/http/repositories/interfaces/products";
import { ProductNotFound } from "@/http/errors/products/products-error";
import { NoStockAvailable } from "@/http/errors/cart/cart-errors";

let productRepository: InMemoryProductRepository;
let cartRepository: InMemoryCartRepository;
let service: CreateCartService;

const MOCK_PRODUCTS: Product[] = [];

describe("Cart/Add", () => {
  beforeEach(() => {
    for (let i = 0; i < 10; i++) {
      MOCK_PRODUCTS.push({
        id: `product-mock-id-${i}`,
        name: `Product Number - ${i}`,
        price: (i + 1) * 10,
        stock: i,
      });
    }

    productRepository = new InMemoryProductRepository();
    cartRepository = new InMemoryCartRepository();
    service = new CreateCartService(cartRepository, productRepository);

    // Populate stock products
    MOCK_PRODUCTS.forEach((item) => {
      productRepository.items.push(item);
    });

    cartRepository.items.products.push({
      amount: 1,
      id: "product-mock-id-1",
      name: "First Product",
      price: 10,
      stock: 100,
    });
  });

  it("Should be able to add product in the cart correctly", async () => {
    const { cart } = await service.execute({
      id: "product-mock-id-2",
      name: "Second Product",
      price: 20,
      stock: 200,
    });

    expect(cart?.products.length).toBe(2);
    expect(cart?.products[1]).toEqual(
      expect.objectContaining({
        id: "product-mock-id-2",
      }),
    );
  });

  it("Should increase amount when add product and product already exist in cart", async () => {
    const { cart } = await service.execute({
      id: "product-mock-id-1",
      name: "First Product",
      price: 10,
      stock: 100,
    });

    const product = cart?.products.find(
      (current) => current.id === "product-mock-id-1",
    );

    expect(product?.amount).toBe(2);
  });

  it("Should return error when not found product", async () => {
    await expect(
      service.execute({
        id: "id-not-exist",
        name: "mock",
        price: 1,
        stock: 1,
      }),
    ).rejects.toBeInstanceOf(ProductNotFound);
  });

  it("Should return error when stock its not available", async () => {
    await expect(
      service.execute({
        id: "product-mock-id-0",
        name: "mock",
        price: 1,
        stock: 0,
      }),
    ).rejects.toBeInstanceOf(NoStockAvailable);
  });
});
