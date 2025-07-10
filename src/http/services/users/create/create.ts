import { UserAlreadyExistError } from "@/http/errors/users/users-error";
import { Role, UsersRepository } from "@/http/repositories/interfaces/user";
import { hash } from "bcryptjs";

interface CreateUserRequest {
  email: string;
  password: string;
  roles: Role[];
}

export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password, roles }: CreateUserRequest) {
    const passwordHash = await hash(password, 6);

    const userAlreadyExist = await this.usersRepository.findByEmail(email);
    if (userAlreadyExist) {
      throw new UserAlreadyExistError();
    }

    const user = await this.usersRepository.create({
      email,
      password: passwordHash,
      roles,
    });

    return {
      user,
    };
  }
}
