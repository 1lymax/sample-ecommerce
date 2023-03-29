// @flow
import * as React from "react";
import {FC} from "react";
import {IProduct} from "../../types/product.type";
import {Link, TableCell, TableRow} from "@mui/material";
import {RatingStars} from "./RatingStars";
import {useNavigate} from "react-router";
import styled from "styled-components";

const Image = styled.div<{ source: string }>`
  width: 150px;
  height: 150px;
  background-image: url("${props => props.source}");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 150px;
`;


interface IProductItem {
    product: IProduct;
}

export const ProductItem: FC<IProductItem> = ({ product }) => {
    const navigate = useNavigate();
    return (
        <TableRow
            key={product.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
            <TableCell align={"right"}>{product.id}</TableCell>
            <TableCell align={"left"} sx={{ display: "flex", flexDirection: "column" }}>
                <Link
                    component={"a"}
                    sx={{ cursor: "pointer" }}
                    variant={"subtitle1"}
                    onClick={() => {
                        navigate("/product/" + product.id);
                    }}
                >
                    {product.title}
                </Link>
                <Image source={product.thumbnail}/>

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