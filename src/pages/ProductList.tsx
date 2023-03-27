// @flow
import * as React from "react";
import {FC, useState} from "react";
import styled from "styled-components";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useAppSelector} from "../hooks/appHook";
import {SortToggle} from "../components/SortToggle";
import {ProductItem} from "../components/ProductItem";
import {useErrorMessage} from "../hooks/useErrorMessage";
import {productColumns} from "../config/product.columns";
import {Pagination} from "../components/Product/Pagination";
import LoadingContainer from "../components/LoadingContainer";
import {useGetAllProductsQuery} from "../store/actions/product.api";

const CellTitleWrapper = styled.div`
  //min-width: 40px;
  display: flex;
`;


interface IProductList {

}

export const ProductList: FC<IProductList> = () => {
    const { products, limit, skip} = useAppSelector(state => state.product);
    const [hoveredColumn, setHoveredColumn] = useState("");


    const { error, status } = useGetAllProductsQuery({
        limit,
        skip
    }, { refetchOnMountOrArgChange: true });

    useErrorMessage("Can't load products. Maybe network error", error);
    //useSuccessMessage("Products loaded", isSuccess)

    const handleColumnHover = (columnName: string) => {
        setHoveredColumn(columnName);
    };

    const handleColumnUnHover = () => {
        setHoveredColumn("");
    };


    return (
        <>
            {status === "pending" && <LoadingContainer/>}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {productColumns.map((column) => (
                                <TableCell key={column.name}
                                           onMouseOver={() => handleColumnHover(column.name)}
                                           onMouseLeave={() => handleColumnUnHover()}
                                >
                                    <CellTitleWrapper>
                                        {column.title}
                                        <SortToggle column={column} visible={column.name === hoveredColumn}/>
                                    </CellTitleWrapper>

                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <ProductItem key={product.id} product={product}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination/>
        </>

    );
};