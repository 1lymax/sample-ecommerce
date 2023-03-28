// @flow
import {FC} from "react";
import * as React from "react";
import {Paper, Table, TableBody, TableContainer, TableHead} from "@mui/material";
import {useAppSelector} from "../hooks/appHook";
import {ProductItem} from "../components/Product/ProductItem";
import {useErrorMessage} from "../hooks/useErrorMessage";
import LoadingContainer from "../components/LoadingContainer";
import {ProductFilter} from "../components/Product/ProductFilter";
import {useGetAllProductsQuery} from "../store/actions/product.api";
import ProductListHeader from "../components/Product/ProductListHeader";


interface IProductList {

}

export const ProductList: FC<IProductList> = () => {
    const { filteredSortedProducts, apiQuery: q, apiSelectedCategory: category } = useAppSelector(state => state.product);
    const { error, status } = useGetAllProductsQuery({ q, category, limit: 10 },
        {
            refetchOnMountOrArgChange: true
        }
    );

    useErrorMessage("Can't load products. Maybe network error", error);

    return (
        <>
            {(status === "pending") && <LoadingContainer/>}
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
        </>

    );
};