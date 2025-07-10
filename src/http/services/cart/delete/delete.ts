import { ProductNotFound } from "@/http/errors/products/products-error";
import { CartRepository } from "@/http/repositories/interfaces/cart";

export class DeleteCartService {
  constructor(private cartRepository: CartRepository) {}

  async execute(productId: string) {
    const product = await this.cartRepository.findById(productId);

    if (!product) {
      throw new ProductNotFound();
    }

    const cart = await this.cartRepository.delete(productId);

    return { cart };
  }
}
