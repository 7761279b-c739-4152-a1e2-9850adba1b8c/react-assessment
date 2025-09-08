import { createContext, Dispatch, SetStateAction } from "react";

interface FiltersContext {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    category: string;
    setCategory: Dispatch<SetStateAction<string>>;
    minPrice: number;
    setMinPrice: Dispatch<SetStateAction<number>>;
    maxPrice: number;
    setMaxPrice: Dispatch<SetStateAction<number>>;
    stock: boolean;
    setStock: Dispatch<SetStateAction<boolean>>;

    sort: string;
    setSort: Dispatch<SetStateAction<string>>;
}

export const FiltersContext = createContext<FiltersContext>({} as FiltersContext);
