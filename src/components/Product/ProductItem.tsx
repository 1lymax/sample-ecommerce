// @flow
import * as React from "react";
import {FC} from "react";
import {IProduct} from "../../types/product.type";
import {TableCell, TableRow} from "@mui/material";
import {RatingStars} from "./RatingStars";


interface IProductItem {
    product: IProduct;
}

export const ProductItem: FC<IProductItem> = ({ product }) => {
    return (
        <TableRow
            key={product.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
            <TableCell align={"right"}>{product.id}</TableCell>
            <TableCell>
                {/*<img src={product.thumbnail} width={100} height={100} alt={product.title}/>*/}
                {product.title}
            </TableCell>
            <TableCell><RatingStars rating={product.rating}/>
            </TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell align={"center"}>{product.price}</TableCell>
            <TableCell align={"center"}>{product.stock}</TableCell>
        </TableRow>
    );
};