import { expect, describe, it, beforeEach } from "vitest";
import { AuthenticateService } from "./authenticate";
import { hash } from "bcryptjs";
import { InMemoryUserRepository } from "@/http/repositories/in-memory-user-repository";
import { InvalidCredentialsError } from "@/http/errors/users/users-error";

let usersRepository: InMemoryUserRepository;
let authRepository: AuthenticateService;
describe("Authenticate Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    authRepository = new AuthenticateService(usersRepository);
  });

  it("Should be able to Authenticate", async () => {
    await usersRepository.create({
      email: "mock@mock.com",
      password: await hash("123456", 6),
    });

    const { user } = await authRepository.execute({
      email: "mock@mock.com",
      password: "123456",
    });

    expect(user.id).toBeTruthy();
  });

  it("Should not able to login when user does not exist", async () => {
    await expect(() =>
      authRepository.execute({
        email: "mock@mock.com",
        password: "123456",
      }),
    )
      .rejects.toBeInstanceOf(InvalidCredentialsError)
      .catch(() => {});
  });

  it("Should not be able to Authenticate user with wrong password", async () => {
    await usersRepository.create({
      email: "mock@mock.com",
      password: await hash("123456", 6),
    });

    await expect(() =>
      authRepository.execute({
        email: "mock@mock.com",
        password: "123456876",
      }),
    )
      .rejects.toBeInstanceOf(InvalidCredentialsError)
      .catch(() => {});
  });
});
