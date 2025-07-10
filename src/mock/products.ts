import { v7 } from "uuid";
import { Product } from "@/http/repositories/interfaces/products";

export const PRODUCTS_MOCK: Product[] = [
  {
    id: v7(),
    name: "Wireless Mouse",
    price: 49.99,
    stock: 120,
  },
  {
    id: v7(),
    name: "Mechanical Keyboard",
    price: 89.5,
    stock: 15,
  },
  {
    id: v7(),
    name: "USB-C Hub",
    price: 29.99,
    stock: 200,
  },
  {
    id: v7(),
    name: 'HD Monitor 24"',
    price: 199.99,
    stock: 35,
  },
  {
    id: v7(),
    name: "Laptop Stand",
    price: 39.0,
    stock: 6,
  },
  {
    id: v7(),
    name: "T-shirt",
    price: 35.99,
    stock: 2,
  },
  {
    id: v7(),
    name: "Jeans",
    price: 65.5,
    stock: 5,
  },
  {
    id: v7(),
    name: "Dress",
    price: 80.75,
    stock: 9,
  },
];
