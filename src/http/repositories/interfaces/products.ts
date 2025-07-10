export interface Product {
  name: string;
  price: number;
  stock: number;
  id: string;
}

export interface ProductsRepository {
  create(data: Omit<Product, "id">): Promise<Product>;
  fetch(): Promise<Product[]>;
  findById(productId: string): Promise<Product | null>;
}
