import { categories, Product } from "../types/Product";
import { products } from "../data/products";

export async function getProducts(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 2000));

    return generateFakeProducts();
}

function generateFakeProducts(): Product[] {
    let products: Product[] = [];
    for (let i = 0; i < 1000; i++) {
        products.push({
            id: i,
            name: 'Product ' + `${i}`.padStart(3, ' '),
            category: categories[Math.floor(Math.random() * 3)],
            price: Math.ceil(Math.random() * 10000)/100,
            rating: Math.ceil(Math.random() * 5),
            inStock: Math.random() > 0.1,
            imageUrl: ""
        })
    }
    return products;
}
