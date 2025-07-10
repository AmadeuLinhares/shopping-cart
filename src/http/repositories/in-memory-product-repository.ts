import { v7 as uuidv7 } from "uuid";

import { Product, ProductsRepository } from "./interfaces/products";

export class InMemoryProductRepository implements ProductsRepository {
  public items: Product[] = [];

  async create(data: Omit<Product, "id">): Promise<Product> {
    const product: Product = {
      ...data,
      id: uuidv7(),
    };

    this.items.push(product);

    return product;
  }

  async fetch(): Promise<Product[]> {
    return this.items;
  }

  async findById(productId: string): Promise<Product | null> {
    const product = this.items.find((current) => current.id === productId);

    if (!product) {
      return null;
    }

    return product;
  }
}
