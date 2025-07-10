import { expect, describe, it } from "vitest";
import { compare } from "bcryptjs";
import { InMemoryUserRepository } from "@/http/repositories/in-memory-user-repository";
import { UserAlreadyExistError } from "@/http/errors/users/users-error";
import { CreateUserService } from "./create";

describe("Users/Register", () => {
  it("Should hash user password corretly", async () => {
    const inMemoryRepository = new InMemoryUserRepository();
    const registerServie = new CreateUserService(inMemoryRepository);

    const { user } = await registerServie.execute({
      email: "mock@mock.com",
      password: "123456",
      roles: ["USER"],
    });

    const isPasswordCorrectlyHashed = await compare("123456", user.password);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("Should not be able to register user with same email", async () => {
    const mockEmail = "mock@mock.com";
    const inMemoryRepository = new InMemoryUserRepository();
    const registerServie = new CreateUserService(inMemoryRepository);
    await registerServie.execute({
      email: mockEmail,
      password: "123456",
      roles: ["USER"],
    });

    await expect(() =>
      registerServie.execute({
        email: mockEmail,
        password: "123456",
        roles: ["USER"],
      }),
    )
      .rejects.toBeInstanceOf(UserAlreadyExistError)
      .catch(() => {});
  });

  it("Shold create user correctly", async () => {
    const inMemoryRepository = new InMemoryUserRepository();
    const registerServie = new CreateUserService(inMemoryRepository);

    const { user } = await registerServie.execute({
      email: "mock@mock.com",
      password: "123456",
      roles: ["USER"],
    });

    expect(user.id).toBeTruthy();
  });
});
