import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Navbar} from "./components/Navbar";
import AppRouter from "./components/Product/AppRouter";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {

    return (
        <BrowserRouter>
            <Navbar/>
            <Container>
                <AppRouter/>
            </Container>
        </BrowserRouter>
    );
}

export default App;
