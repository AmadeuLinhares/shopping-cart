import {
  MinimumQuantityReached,
  NoStockAvailable,
} from "@/http/errors/cart/cart-errors";
import { ProductNotFound } from "@/http/errors/products/products-error";
import {
  CartRepository,
  EditCartProduct,
} from "@/http/repositories/interfaces/cart";
import { ProductsRepository } from "@/http/repositories/interfaces/products";

export class EditCartService {
  constructor(
    private cartRepository: CartRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async execute(data: EditCartProduct) {
    const stock = await this.productsRepository.findById(data.productId);

    if (!stock) {
      throw new ProductNotFound();
    }

    if (stock.stock < 1) {
      throw new NoStockAvailable();
    }

    const product = await this.cartRepository.findById(data.productId);

    if (!product) {
      throw new ProductNotFound();
    }

    if (data.action === "REMOVE") {
      if (product.amount < 2) {
        throw new MinimumQuantityReached();
      }
    }

    const cart = await this.cartRepository.edit({
      action: data.action,
      productId: data.productId,
    });

    return {
      cart,
    };
  }
}
