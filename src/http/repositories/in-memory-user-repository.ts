import { User, UsersRepository } from "./interfaces/user";

import { v7 as uuidv7 } from "uuid";

export class InMemoryUserRepository implements UsersRepository {
  public items: User[] = [];

  async findById(id: string) {
    const user = this.items.find((current) => current.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Omit<User, "id">) {
    const user: User = {
      id: uuidv7(),
      email: data.email,
      password: data.password,
      roles: data.roles,
    };

    this.items.push(user);

    return user;
  }
  async findByEmail(email: string) {
    const user = this.items.find((current) => current.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async delete(id: string) {
    const user = this.items.find((current) => current.id === id);
    if (!user) {
      return null;
    }
    this.items.filter((current) => current.id !== id);

    return user;
  }
}
