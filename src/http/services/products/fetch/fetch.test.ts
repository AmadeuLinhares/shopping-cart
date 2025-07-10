import { expect, describe, it, beforeEach } from "vitest";
import { v7 as uuidv7 } from "uuid";
import { FetchProductService } from "./fetch";
import { InMemoryProductRepository } from "@/http/repositories/in-memory-product-repository";
import { Product } from "@/http/repositories/interfaces/products";

let repository: InMemoryProductRepository;
let service: FetchProductService;

const MOCK_PRODUCTS: Product[] = [
  {
    id: uuidv7(),
    name: "mock 1",
    price: 1,
    stock: 1,
  },
  {
    id: uuidv7(),
    name: "mock 2",
    price: 2,
    stock: 2,
  },
  {
    id: uuidv7(),
    name: "mock 3",
    price: 3,
    stock: 3,
  },
];

describe("Products/Fetch", () => {
  beforeEach(() => {
    repository = new InMemoryProductRepository();
    service = new FetchProductService(repository);

    repository.items = [];

    MOCK_PRODUCTS.forEach((item) => {
      repository.items.push(item);
    });
  });

  it("Should fetch products correctly", async () => {
    const { products } = await service.execute();

    expect(products.length).toBe(3);
  });
});
