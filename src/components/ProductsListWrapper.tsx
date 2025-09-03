import { useState } from "react";
import { ProductsList } from "./ProductsList";
import { FiltersContext } from "../context/FiltersContext";
import { categories } from "../types/Product";
import { Filters } from "./Filters";

export function ProductsListWrapper() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [stock, setStock] = useState(false);

    return (
        <FiltersContext value={{ search, setSearch, category, setCategory, minPrice, setMinPrice, maxPrice, setMaxPrice, stock, setStock }}>
            <Filters />
            <ProductsList />
        </FiltersContext>
    )
}