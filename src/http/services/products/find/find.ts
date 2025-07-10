import { ProductNotFound } from "@/http/errors/products/products-error";
import {
  Product,
  ProductsRepository,
} from "@/http/repositories/interfaces/products";

interface FindRquest {
  id: string;
}

interface FindResponse {
  product: Product | null;
}

export class FindProductService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ id }: FindRquest): Promise<FindResponse> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new ProductNotFound();
    }

    return {
      product,
    };
  }
}
