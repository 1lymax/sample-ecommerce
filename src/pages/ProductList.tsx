// @flow
import {FC} from "react";
import * as React from "react";
import styled from "styled-components";
import {useNavigate} from "react-router";
import {Button, Paper, Table, TableBody, TableContainer, TableHead} from "@mui/material";

import {useAppSelector} from "../hooks/useAppSelector";
import {useMessageError} from "../hooks/useMessageError";
import {ProductItem} from "../components/Product/ProductItem";
import LoadingContainer from "../components/LoadingContainer";
import {ProductSearch} from "../components/Product/ProductSearch";
import {ProductFilter} from "../components/Product/ProductFilter";
import {useGetAllProductsQuery} from "../store/actions/product.api";
import ProductListHeader from "../components/Product/ProductListHeader";
import {ADD_PRODUCT_BY_HOOKS, ADD_PRODUCT_ROUTE} from "../config/routes";

const Container = styled.div`
position: relative;
  padding: 20px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 10px;

`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IProductList {

}

export const ProductList: FC<IProductList> = () => {
    const navigate = useNavigate()
    const { filteredSortedProducts, apiQuery: q, apiSelectedCategory: category } = useAppSelector(state => state.product);
    const { error, status } = useGetAllProductsQuery({ q, category, limit: 50 },
        {
            refetchOnMountOrArgChange: true
        }
    );

    useMessageError("Can't load products. Maybe network error", error);

    return (
        <Container>
            {(status === "pending") && <LoadingContainer/>}
            <Header>
                <ProductSearch/>
                <Right>Add new product using:
                    <Button sx={{m: 1}} variant={"contained"} onClick={() => navigate(ADD_PRODUCT_ROUTE)}>Formik & Yup</Button>
                    <Button sx={{m: 1}} variant={"contained"} onClick={() => navigate(ADD_PRODUCT_BY_HOOKS)}>Custom hooks</Button>
                </Right>
            </Header>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <ProductListHeader/>
                        <ProductFilter/>
                    </TableHead>
                    <TableBody>
                        {filteredSortedProducts.map((product) => (
                            <ProductItem key={product.id} product={product}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>

    );
};