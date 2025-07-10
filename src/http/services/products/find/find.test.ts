import { InMemoryProductRepository } from "@/http/repositories/in-memory-product-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { FindProductService } from "./find";
import { ProductNotFound } from "@/http/errors/products/products-error";

let repository: InMemoryProductRepository;
let findService: FindProductService;
describe("Find Service", () => {
  beforeEach(() => {
    repository = new InMemoryProductRepository();
    findService = new FindProductService(repository);
  });

  it("Should find product correctly", async () => {
    await repository.create({
      name: "product test",
      price: 10,
      stock: 100,
    });

    const { product } = await findService.execute({
      id: repository.items[0].id,
    });

    expect(product?.name).toBe("product test");
  });

  it("Should not able to find user", async () => {
    await expect(() =>
      findService.execute({
        id: "mock-id",
      }),
    ).rejects.toBeInstanceOf(ProductNotFound);
  });
});
