// @flow
import * as React from "react";
import {FC} from "react";
import {Paper, Table, TableBody, TableContainer, TableHead} from "@mui/material";
import {useAppSelector} from "../hooks/appHook";
import {ProductItem} from "../components/ProductItem";
import {useErrorMessage} from "../hooks/useErrorMessage";
import LoadingContainer from "../components/LoadingContainer";
import {ProductFilter} from "../components/Product/ProductFilter";
import {useGetAllProductsQuery} from "../store/actions/product.api";
import ProductListHeader from "../components/Product/ProductListHeader";


interface IProductList {

}

export const ProductList: FC<IProductList> = () => {
    const { filtSortProducts } = useAppSelector(state => state.product);


    const { error, status } = useGetAllProductsQuery({
            limit: 10
        }
    );

    useErrorMessage("Can't load products. Maybe network error", error);

    return (
        <>
            {status === "pending" && <LoadingContainer/>}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <ProductListHeader/>
                        <ProductFilter/>
                    </TableHead>
                    <TableBody>
                        {filtSortProducts.map((product) => (
                            <ProductItem key={product.id} product={product}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*<Pagination/>*/}
        </>

    );
};