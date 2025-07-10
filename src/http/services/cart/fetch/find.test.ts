import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCartRepository } from "@/http/repositories/in-memory-cart-repository";
import { FetchCartService } from "./fetch";
import { v7 as uuidv7 } from "uuid";
import { ProductsInCart } from "@/http/repositories/interfaces/cart";

let repository: InMemoryCartRepository;
let service: FetchCartService;

const MOCK_PRODUCTS: ProductsInCart[] = [
  {
    id: uuidv7(),
    name: "mock 1",
    price: 1,
    stock: 1,
    amount: 1,
  },
  {
    id: uuidv7(),
    name: "mock 2",
    price: 2,
    stock: 2,
    amount: 1,
  },
  {
    id: uuidv7(),
    name: "mock 3",
    price: 3,
    stock: 3,
    amount: 1,
  },
];

describe("Products/Fetch", () => {
  beforeEach(() => {
    repository = new InMemoryCartRepository();
    service = new FetchCartService(repository);

    MOCK_PRODUCTS.forEach((item) => {
      repository.items.products.push(item);
    });
  });

  it("Should fetch cart correctly", async () => {
    const { cart } = await service.execute();

    expect(cart?.products.length).toBe(3);
  });
});
