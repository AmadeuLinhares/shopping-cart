import { ProductsRepository } from "@/http/repositories/interfaces/products";

export class FetchProductService {
  constructor(private productRepository: ProductsRepository) {}

  async execute() {
    const products = await this.productRepository.fetch();

    return {
      products,
    };
  }
}
