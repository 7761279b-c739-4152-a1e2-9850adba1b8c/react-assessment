import { RefObject, use, useRef, useState } from "react";
import { ProductsContext } from "../context/ProductsContext"
import { ProductsList } from "./ProductsList";
import { Product } from "../data/products";

export function ProductsListWrapper() {
    const { products } = use(ProductsContext);
    const [search, setSearch] = useState("");
    let searchInput: RefObject<string> = useRef("");
    let searchDebounce: RefObject<number> = useRef(Date.now());
    const [category, setCategory] = useState("All");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [stock, setStock] = useState(false);

    const filteredProducts: Product[] = products.filter(
        (product) => {return (search == "" || search.toLowerCase().split(" ").every(s => product.name.toLowerCase().includes(s))) &&
        (category == "All" || product.category == category) &&
        minPrice <= product.price && product.price <= maxPrice &&
        (product.inStock || !stock)
    })
    return (
        <>
            <div className="filters-wrapper">
                <h3>Filter results:</h3>
                <div className="filter-grid">
                    <p className="grid-11">Search products:</p>
                    <input ref={searchInput} onInput={async e => {
                        searchInput.current = e.target.value;
                        const endDebounce = Date.now() + 150;
                        searchDebounce.current = endDebounce;
                        await new Promise(resolve => setTimeout(resolve, 200));
                        if (searchDebounce.current <= endDebounce) {
                            setSearch(e.target.value);
                        }
                    }} type="text" name="search" id="search" className="grid-12" />
                    <p className="grid-21">In category:</p>
                    <select value={category} onInput={e => setCategory(e.target.value)} className="grid-22">
                        <option value="All">All</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Books">Books</option>
                        <option value="Clothing">Clothing</option>
                    </select>
                    <p className="grid-31">Price range (£): </p>
                    <input value={minPrice} onInput={e => {
                        let price;
                        if (e.target.value == "") {
                            price = 0
                        } else {
                            price = parseFloat(e.target.value) ?? NaN
                        }
                        if (!isNaN(price) && price != minPrice) {
                            setMinPrice(price);
                            if (maxPrice < price) {
                                setMaxPrice(price);
                            }
                        }}} type="text" name="min-price" id="min-price" placeholder="0" className="grid-32" />
                    <p className="grid-33">to</p>
                    <input value={maxPrice} onInput={e => {
                        let price;
                        if (e.target.value == "") {
                            price = 0
                        } else {
                            price = parseFloat(e.target.value) ?? NaN
                        }
                        if (!isNaN(price) && price != maxPrice) {
                            setMaxPrice(price)
                            if (minPrice > price) {
                                setMinPrice(price);
                            }
                        }}} type="text" name="max-price" id="max-price" placeholder="100" className="grid-34" />
                    <p className="grid-41">In stock only:</p>
                    <div className="grid-42">
                        <input checked={stock} onChange={e => {setStock(e.target.checked);}} type="checkbox" name="stock" id="stock" />
                    </div>
                </div>
            </div>
            <ProductsList filteredProducts={ filteredProducts }/>
        </>
    )
}