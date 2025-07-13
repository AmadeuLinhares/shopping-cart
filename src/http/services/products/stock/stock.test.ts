import { expect, describe, it, beforeEach } from "vitest";
import { StockProductService } from "./stock";
import { InMemoryProductRepository } from "@/http/repositories/in-memory-product-repository";

let repository: InMemoryProductRepository;
let service: StockProductService;

describe("Product/Stock", () => {
  beforeEach(() => {
    repository = new InMemoryProductRepository();
    service = new StockProductService(repository);

    repository.items.push({
      id: "mock-product-1",
      name: "Mock product",
      price: 100,
      stock: 1,
    });
  });

  it("Should increase produt stock", async () => {
    const { product } = await service.execute({
      action: "ADD",
      productId: "mock-product-1",
    });

    expect(product.stock).toEqual(2);
  });

  it("Should decrease produt stock", async () => {
    const { product } = await service.execute({
      action: "REMOVE",
      productId: "mock-product-1",
    });

    expect(product.stock).toEqual(0);
  });
});
