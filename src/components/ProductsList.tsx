import { Product } from "../data/products"
import { ProductCard } from "./ProductCard"


export function ProductsList({ filteredProducts }: { filteredProducts: Product[] }) {
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