import { InvalidCredentialsError } from "@/http/errors/users/users-error";
import { User, UsersRepository } from "@/http/repositories/interfaces/user";
import { compare } from "bcryptjs";

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}
interface AuthenticateServiceResponse {
  user: User;
}

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    // Authenticate user
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user?.password ?? "");

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
