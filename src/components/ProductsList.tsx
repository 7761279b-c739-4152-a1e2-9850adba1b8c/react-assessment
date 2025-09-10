import { Suspense, use, useState } from "react";

import { Product } from "../types/Product";
import { ProductCard } from "./ProductCard"
import { getProducts } from "../queries/products";
import { FiltersContext } from "../context/FiltersContext";
import { getProductCompare } from "../data/sortOptions";

const productsPromise = getProducts()

export function ProductsList() {

    return (
        <Suspense fallback={<ProductsListSuspense />}>
            <ProductsListLoaded />
        </Suspense>
    )
}

function ProductsListLoaded() {
    const { search, category, minPrice, maxPrice, stock, sort } = use(FiltersContext);
    const perPage = 40;

    const apiProducts = use(productsPromise);
    const [products, setProducts] = useState<Product[]>(apiProducts);
    const filteredProducts: Product[] = products.filter(
        (product) => {return (search == "" || search.toLowerCase().split(" ").every((s: string) => product.name.toLowerCase().includes(s))) &&
        (category == "All" || product.category == category) &&
        minPrice <= product.price && product.price <= maxPrice &&
        (product.inStock || !stock)
    }).sort(getProductCompare(sort)).slice(0, perPage);

    return (
        <div className="products-list-wrapper">
            <h2>Products list:</h2>
            {filteredProducts.length > 0 ? (
                <ProductsListContents filteredProducts={filteredProducts} />
            ) : (
                <ProductsListempty />
            )}
        </div>
    )
}

function ProductsListSuspense() {
    return (
        <div className="products-list-wrapper">
            <h2>Products list:</h2>
            <p>Loading products...</p>
        </div>
    )
}
function ProductsListempty() {
    return (
        <>
            <p>No products found</p>
            <p>Try searching for something different</p>
        </>
    )
}

function ProductsListContents({ filteredProducts }: { filteredProducts: Product[] }) {
    return (
        <div className="products-list">
            {filteredProducts
                .map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            }
        </div>
    )
}