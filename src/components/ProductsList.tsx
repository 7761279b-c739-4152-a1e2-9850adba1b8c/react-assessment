import { use } from "react";
import { ProductsContext } from "../context/ProductsContext"
import { ProductCard } from "./ProductCard";

export function ProductsList() {
    const { products } = use(ProductsContext);
    return (
        <>
            <h2>Products list:</h2>
            <ul className="products-list">
                {products
                    .map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </ul>
        </>
    )
}