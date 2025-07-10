import { hash } from "bcryptjs";
import { expect, describe, it, beforeEach } from "vitest";
import { FindService } from "./find";
import { InMemoryUserRepository } from "@/http/repositories/in-memory-user-repository";
import { UserNotFound } from "@/http/errors/users/users-error";

let usersRepository: InMemoryUserRepository;
let findService: FindService;
describe("Find Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    findService = new FindService(usersRepository);
  });

  it("Should find user correctly", async () => {
    await usersRepository.create({
      email: "mock@mock.com",
      password: await hash("123456", 6),
    });

    const { user } = await findService.execute({
      userId: usersRepository.items[0].id,
    });

    expect(user?.email).toBe("mock@mock.com");
  });

  it("Should not able to find user", async () => {
    await expect(() =>
      findService.execute({
        userId: "mock-id",
      }),
    ).rejects.toBeInstanceOf(UserNotFound);
  });
});
