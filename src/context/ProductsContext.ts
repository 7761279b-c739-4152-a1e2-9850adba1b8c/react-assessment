import { createContext, Dispatch, SetStateAction, useContext } from "react";

import { Product } from "../data/products"


export const ProductsContext = createContext<{
    products: Product[];
    setProducts: Dispatch<SetStateAction<Product[]>>;
}>(null);
