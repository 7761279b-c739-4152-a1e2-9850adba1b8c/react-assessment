import { Product } from "../data/products";

export function ProductCard({ product }: { product: Product; }) {
    return (
        <li className="product-card">
            <img src={ product.imageUrl ?? null}></img>
            <div>
                <h3>{ product.name }</h3>
                <p>{ product.category }</p>
                <p className="price">£{ product.price.toFixed(2) }</p>
                <div className="product-rating">
                    {"⭐".repeat(product.rating)}
                </div>
                { product.inStock ? 'In stock' : 'Not in stock'}
            </div>
        </li>
    )
}
