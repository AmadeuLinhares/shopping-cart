import {
  Cart,
  CartRepository,
  EditCartProduct,
  ProductsInCart,
} from "./interfaces/cart";
import { Product } from "./interfaces/products";

export class InMemoryCartRepository implements CartRepository {
  public items: Cart = {
    products: [],
  };

  async add(data: Product) {
    const productIndex = this.items.products.findIndex(
      (current) => current.id === data.id,
    );

    if (productIndex < 0) {
      this.items.products.push({ ...data, amount: 1 });
      return this.items;
    }

    console.log("entrou aqui", productIndex);

    this.items.products[productIndex].amount =
      this.items.products[productIndex].amount + 1;

    return this.items;
  }

  async edit(data: EditCartProduct) {
    const productIndex = this.items.products.findIndex(
      (current) => current.id === data.productId,
    );

    if (productIndex < 0) {
      return null;
    }

    this.items.products[productIndex] = {
      ...this.items.products[productIndex],
      amount:
        data.action === "ADD"
          ? (this.items.products[productIndex].amount =
              this.items.products[productIndex].amount + 1)
          : (this.items.products[productIndex].amount =
              this.items.products[productIndex].amount - 1),
    };

    return this.items;
  }

  async delete(productId: string) {
    const productIndex = this.items.products.findIndex(
      (current) => current.id === productId,
    );

    if (productIndex < 0) {
      return null;
    }

    this.items.products = this.items.products.filter(
      (current) => current.id !== productId,
    );

    return this.items;
  }

  async findById(productId: string): Promise<ProductsInCart | null> {
    const product = this.items.products.find(
      (current) => current.id === productId,
    );

    if (!product) {
      return null;
    }

    return product;
  }

  async fetch(): Promise<Cart | null> {
    return this.items;
  }
}
