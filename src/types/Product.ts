
export const categories: string[] = ["Electronics", "Books", "Clothing"]

export type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    rating: number;
    inStock: boolean;
    imageUrl: string;
}
