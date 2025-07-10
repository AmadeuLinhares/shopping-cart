import { UserNotFound } from "@/http/errors/users/users-error";
import { User, UsersRepository } from "@/http/repositories/interfaces/user";

interface FindRquest {
  userId: string;
}

interface FindResponse {
  user: User | null;
}

export class FindService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: FindRquest): Promise<FindResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFound();
    }

    return {
      user,
    };
  }
}
