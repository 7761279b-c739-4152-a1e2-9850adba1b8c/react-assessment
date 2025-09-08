import { use, useRef, RefObject } from "react";
import { FiltersContext } from "../context/FiltersContext";
import { sortOptions } from "../data/sortOptions";
import { categories } from "../types/Product";

export function Filters() {
    const { setSearch, category, setCategory, minPrice, setMinPrice, maxPrice, setMaxPrice, stock, setStock, sort, setSort } = use(FiltersContext);
    let searchInput: RefObject<string> = useRef<string>("");
    let searchDebounce: RefObject<number> = useRef<number>(Date.now());

    return (
        <div className="filters-wrapper">
            <h3>Filter results:</h3>
            <div className="filter-grid">
                <p className="grid-11">Search products:</p>
                <input onInput={async e => {
                    searchInput.current = e.currentTarget.value;
                    const endDebounce = Date.now() + 150;
                    searchDebounce.current = endDebounce;
                    await new Promise(resolve => setTimeout(resolve, 200));
                    if (searchDebounce.current <= endDebounce) {
                        setSearch(searchInput.current);
                    }
                }} type="text" name="search" id="search" className="grid-12" />
                <p className="grid-21">In category:</p>
                <select value={category} onInput={e => setCategory(e.currentTarget.value)} className="grid-22">
                    <option value="All">All</option>
                    {categories.map((cat, i) => {
                        return <option key={i} value={cat}>{cat}</option>
                    })}
                </select>
                <p className="grid-31">Price range (£): </p>
                <input value={minPrice} onInput={e => {
                    let price: number;
                    if (e.currentTarget.value == "") {
                        price = 0
                    } else {
                        price = parseFloat(e.currentTarget.value) ?? NaN
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
                    if (e.currentTarget.value == "") {
                        price = 0
                    } else {
                        price = parseFloat(e.currentTarget.value) ?? NaN
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
                <p className="grid-51">Sort by</p>
                <select value={sort} onInput={e => setSort(e.currentTarget.value)} className="grid-52">
                    {sortOptions.map((option, i) => {
                        return <option key={i} value={option.value}>{option.name}</option>
                    })}
                </select>
            </div>
        </div>
    )
}