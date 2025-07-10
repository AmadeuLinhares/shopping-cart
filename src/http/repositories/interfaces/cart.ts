import { Product } from "./products";

export interface ProductsInCart extends Product {
  amount: number;
}

export interface Cart {
  products: ProductsInCart[];
}

export interface EditCartProduct {
  action: "ADD" | "REMOVE";
  productId: string;
}

export interface CartRepository {
  add(data: Product): Promise<Cart>;
  edit(data: EditCartProduct): Promise<Cart | null>;
  delete(productId: string): Promise<Cart | null>;
  findById(productId: string): Promise<Product | null>;
}
