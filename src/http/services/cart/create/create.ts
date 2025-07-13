import { NoStockAvailable } from "@/http/errors/cart/cart-errors";
import { ProductNotFound } from "@/http/errors/products/products-error";
import { CartRepository } from "@/http/repositories/interfaces/cart";
import {
  Product,
  ProductsRepository,
} from "@/http/repositories/interfaces/products";

export class CreateCartService {
  constructor(
    private cartRepository: CartRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async execute(data: Product) {
    const stock = await this.productsRepository.findById(data.id);

    if (!stock) {
      throw new ProductNotFound();
    }

    if (stock.stock < 1) {
      throw new NoStockAvailable();
    }

    const productAlreadyAdded = await this.cartRepository.findById(data.id);

    await this.productsRepository.changeStock({
      action: "REMOVE",
      productId: data.id,
    });

    if (!productAlreadyAdded) {
      const cart = await this.cartRepository.add(data);

      return {
        cart,
      };
    }

    const cart = await this.cartRepository.edit({
      action: "ADD",
      productId: data.id,
    });

    return {
      cart,
    };
  }
}
