// @flow
import * as React from "react";
import {FC} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router";
import {Button} from "@mui/material";
import {ADD_PRODUCT_ROUTE, MAIN_ROUTE, PRODUCT_LIST} from "../config/routes";

const Container = styled.div`
  padding: 20px;
  background-color: #e8e8e8;
  box-shadow: 2px 2px 5px #9b9b9b;
`;


interface INavbar {

}

export const Navbar: FC<INavbar> = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <Button sx={{marginX: 2}} onClick={() => navigate(MAIN_ROUTE)}>Main</Button>
            <Button sx={{marginX: 2}} onClick={() => navigate(PRODUCT_LIST)}>Product list</Button>
            <Button sx={{marginX: 2}} onClick={() => navigate(ADD_PRODUCT_ROUTE)}>Add new product</Button>
        </Container>
    );
};