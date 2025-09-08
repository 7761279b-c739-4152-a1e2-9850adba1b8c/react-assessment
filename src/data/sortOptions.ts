import { Product } from "../types/Product";

export type SortOption = {
    name: string;
    value: string;
}

export const sortOptions: SortOption[] = [
    {
        name: "Price (High)",
        value: "price_desc"
    },
    {
        name: "Price (Low)",
        value: "price_asc"
    },
    {
        name: "Rating (High)",
        value: "rating_desc"
    },
    {
        name: "Rating (Low)",
        value: "rating_asc"
    },
    {
        name: "Name (A-Z)",
        value: "name_asc"
    },
    {
        name: "Name (Z-A)",
        value: "name_desc"
    }
]

export function getProductCompare(sortOption: string): (a: Product, b: Product) => number {
    if (sortOption == "name_asc") {
        return (a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0
        }
    }
    if (sortOption == "name_desc") {
        return (a, b) => {
            if (a.name > b.name) {
                return -1;
            }
            if (a.name < b.name) {
                return 1;
            }
            return 0
        }
    }
    if (sortOption == "price_asc") {
        return (a, b) => {
            if (a.price < b.price) {
                return -1;
            }
            if (a.price > b.price) {
                return 1;
            }
            return 0
        }
    }
    if (sortOption == "price_desc") {
        return (a, b) => {
            if (a.price > b.price) {
                return -1;
            }
            if (a.price < b.price) {
                return 1;
            }
            return 0
        }
    }
    if (sortOption == "rating_asc") {
        return (a, b) => {
            if (a.rating < b.rating) {
                return -1;
            }
            if (a.rating > b.rating) {
                return 1;
            }
            return 0
        }
    }
    if (sortOption == "rating_desc") {
        return (a, b) => {
            if (a.rating > b.rating) {
                return -1;
            }
            if (a.rating < b.rating) {
                return 1;
            }
            return 0
        }
    }


    return (a, b) => 0;
}