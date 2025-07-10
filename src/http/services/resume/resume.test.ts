import { InMemoryCartRepository } from "@/http/repositories/in-memory-cart-repository";
import { InMemoryUserRepository } from "@/http/repositories/in-memory-user-repository";
import { it, describe, beforeEach, expect } from "vitest";
import { ResumeService } from "./resume";
import { v7 } from "uuid";
import { UserNotFound } from "@/http/errors/users/users-error";

let cartRepository: InMemoryCartRepository;
let userRepository: InMemoryUserRepository;
let service: ResumeService;

describe("Resume/Fetch", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    cartRepository = new InMemoryCartRepository();
    service = new ResumeService(cartRepository, userRepository);
    cartRepository.items.products = [];
    userRepository.items = [
      {
        email: "mock-user@mock.com",
        id: "mock-usuer-id",
        password: "1234",
        roles: ["USER", "VIP"],
      },
    ];
  });

  it("Should return error when user not found", async () => {
    await expect(() =>
      service.execute({
        userId: "",
      }),
    ).rejects.toBeInstanceOf(UserNotFound);
  });

  it("Should render total to pay without any discount", async () => {
    cartRepository.items.products = [
      {
        amount: 1,
        id: v7(),
        name: v7(),
        price: 90,
        stock: 1,
      },
      {
        amount: 1,
        id: v7(),
        name: v7(),
        price: 140,
        stock: 1,
      },
    ];

    const { discount, total } = await service.execute({
      userId: "mock-usuer-id",
    });
    expect(total).toEqual(90 + 140);
    expect(discount).toEqual(0);
  });

  it('Shold return discount "Get 3 for 2" when client is VIP but the vip discount its lower', async () => {
    cartRepository.items.products = [
      {
        amount: 3,
        id: v7(),
        name: "Dress",
        price: 80.75,
        stock: 1,
      },
    ];

    const { discount, total } = await service.execute({
      userId: "mock-usuer-id",
    });

    expect(total).toEqual(80.75 * 3);
    expect(discount).toEqual(80.75);
  });

  it('Shold return discount "Get 3 for 2" when client is VIP but the vip discount its lower for different products', async () => {
    cartRepository.items.products = [
      {
        amount: 2,
        id: v7(),
        name: "Dress",
        price: 80.75,
        stock: 2,
      },
      {
        amount: 2,
        id: v7(),
        name: "Jeans",
        price: 65.5,
        stock: 2,
      },
    ];

    const { discount, total } = await service.execute({
      userId: "mock-usuer-id",
    });

    expect(total).toEqual(80.75 * 2 + 65.5 * 2);
    expect(discount).toEqual(65.5);
  });

  it.only('Shold return discount "15%" when client is VIP and value its lowerst than "Get 3 for 2"', async () => {
    cartRepository.items.products = [
      {
        amount: 4,
        id: v7(),
        name: "Shorts",
        price: 22.99,
        stock: 5,
      },
      {
        amount: 1,
        id: v7(),
        name: "Jeans",
        price: 65.5,
        stock: 2,
      },
    ];

    const { discount, total } = await service.execute({
      userId: "mock-usuer-id",
    });

    const totalPrice = 22.99 * 4 + 65.5;

    expect(total).toEqual(totalPrice);
    expect(discount).toEqual(totalPrice * 0.15);
  });
});
