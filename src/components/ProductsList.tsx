import { Suspense, use, useState } from "react";

import { Product } from "../types/Product";
import { ProductCard } from "./ProductCard"
import { getProducts } from "../queries/products";
import { FiltersContext } from "../context/FiltersContext";

const productsPromise = getProducts()

export function ProductsList() {

    return (
        <Suspense fallback={<ProductsListSuspense />}>
            <ProductsListLoaded />
        </Suspense>
    )
}

function ProductsListLoaded() {
    const { search, category, minPrice, maxPrice, stock } = use(FiltersContext);

    const apiProducts = use(productsPromise);
    const [products, setProducts] = useState<Product[]>(apiProducts);
    
    const filteredProducts: Product[] = products.filter(
        (product) => {return (search == "" || search.toLowerCase().split(" ").every((s: string) => product.name.toLowerCase().includes(s))) &&
        (category == "All" || product.category == category) &&
        minPrice <= product.price && product.price <= maxPrice &&
        (product.inStock || !stock)
    })

    if (filteredProducts.length > 0) {
        return (
            <div className="products-list-wrapper">
                <h2>Products list:</h2>
                <ul className="products-list">
                    {filteredProducts
                        .map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    }
                </ul>
            </div>
        )
    } else {
        return (
            <div className="products-list-wrapper">
                <h2>Products list:</h2>
                <p>No products found</p>
                <p>Try searching for something different</p>
            </div>
        )
    }
}



function ProductsListSuspense() {
    return (
        <div className="products-list-wrapper">
            <h2>Products list:</h2>
            <p>Loading products...</p>
        </div>
    )
}