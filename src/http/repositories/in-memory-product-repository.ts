import { v7 as uuidv7 } from "uuid";

import {
  Product,
  ProductsRepository,
  StockProduct,
} from "./interfaces/products";

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

  async changeStock(data: StockProduct): Promise<Product | null> {
    const index = this.items.findIndex(
      (current) => data.productId === current.id,
    );

    if (index < 0) {
      return null;
    }

    this.items[index].stock =
      data.action === "ADD"
        ? this.items[index].stock + 1
        : this.items[index].stock - 1;

    return this.items[index];
  }
}
