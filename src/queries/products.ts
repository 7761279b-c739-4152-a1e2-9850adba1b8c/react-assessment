import { Product } from "../types/Product";
import { products } from "../data/products";

export async function getProducts(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 2000));

    return products;
}