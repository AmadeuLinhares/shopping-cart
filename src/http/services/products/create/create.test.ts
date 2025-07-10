import { expect, describe, it } from "vitest";
import { CreateProductService } from "./create";
import { InMemoryProductRepository } from "@/http/repositories/in-memory-product-repository";

describe("Products/Create", () => {
  it("Shold create user correctly", async () => {
    const inMemoryRepository = new InMemoryProductRepository();
    const registerServie = new CreateProductService(inMemoryRepository);

    const { product } = await registerServie.execute({
      name: "Teste product",
      price: 10,
      stock: 100,
    });

    expect(product.id).toBeTruthy();
  });
});
