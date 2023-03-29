import React from "react";
import styled from "styled-components";
import {BrowserRouter} from "react-router-dom";

import {Navbar} from "./components/Navbar";
import AppRouter from "./components/AppRouter";

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
