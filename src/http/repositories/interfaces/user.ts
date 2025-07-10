export type Role = "VIP" | "USER";

export interface User {
  email: string;
  id: string;
  password: string;
  roles: Role[];
}

export interface UsersRepository {
  create(data: Omit<User, "id">): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
