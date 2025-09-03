import { useState } from "react";

import { ProductsContext } from "./context/ProductsContext";

import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { ProductsListWrapper } from "./components/ProductsListWrapper";
import { Product, products as product_data } from "./data/products";


export function App() {
    const [products, setProducts] = useState<Product[]>(product_data);

    return (
        <Container>
            <ProductsContext value={{ products, setProducts }}>
                <Header></Header>
                <Main>
                    <ProductsListWrapper></ProductsListWrapper>
                </Main>
            </ProductsContext>
        </Container>
    );
}
