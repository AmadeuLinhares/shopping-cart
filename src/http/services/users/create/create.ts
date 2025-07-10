import { UserAlreadyExistError } from "@/http/errors/users/users-error";
import { UsersRepository } from "@/http/repositories/interfaces/user";
import { hash } from "bcryptjs";

interface CreateUserRequest {
  email: string;
  password: string;
}

export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: CreateUserRequest) {
    const passwordHash = await hash(password, 6);

    const userAlreadyExist = await this.usersRepository.findByEmail(email);
    if (userAlreadyExist) {
      throw new UserAlreadyExistError();
    }

    const user = await this.usersRepository.create({
      email,
      password: passwordHash,
    });

    return {
      user,
    };
  }
}
