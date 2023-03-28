import React from "react";
import styled from "styled-components";
import {ProductList} from "./pages/ProductList";
import {ProductSearch} from "./components/Product/ProductSearch";

const Container = styled.div``;

function App() {

    return (
        <Container>
            <ProductSearch/>
            <ProductList/>
        </Container>
    );
}

export default App;
