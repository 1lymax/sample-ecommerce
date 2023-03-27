// @flow
import * as React from "react";
import {FC} from "react";
import {IProduct} from "../types/product.type";
import {TableCell, TableRow} from "@mui/material";


interface IProductItem {
    product: IProduct;
}

export const ProductItem: FC<IProductItem> = ({ product }) => {
    return (
        <TableRow
            key={product.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
            <TableCell>{product.id}</TableCell>
            <TableCell>
                <img src={product.thumbnail} width={100} height={100} alt={product.title}/>
                {product.title}
            </TableCell>
            <TableCell>{product.rating}
            </TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.stock}</TableCell>
        </TableRow>
    );
};