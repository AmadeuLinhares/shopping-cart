import {
  Product,
  ProductsRepository,
} from "@/http/repositories/interfaces/products";

export class CreateProductService {
  constructor(private productRepository: ProductsRepository) {}

  private items: Product[] = [];

  async execute(data: Omit<Product, "id">) {
    const product = await this.productRepository.create(data);

    this.items.push(product);

    return {
      product,
    };
  }
}
