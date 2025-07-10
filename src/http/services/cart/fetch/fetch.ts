import { CartRepository } from "@/http/repositories/interfaces/cart";

export class FetchCartService {
  constructor(private cartRepository: CartRepository) {}

  async execute() {
    const cart = await this.cartRepository.fetch();

    return { cart };
  }
}
