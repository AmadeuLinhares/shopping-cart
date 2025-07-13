import { ProductNotFound } from "@/http/errors/products/products-error";
import {
  ProductsRepository,
  StockProduct,
} from "@/http/repositories/interfaces/products";

export class StockProductService {
  constructor(private productRepository: ProductsRepository) {}

  async execute(data: StockProduct) {
    const product = await this.productRepository.changeStock(data);
    if (!product) {
      throw new ProductNotFound();
    }

    return {
      product,
    };
  }
}
