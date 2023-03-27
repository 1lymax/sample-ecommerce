// @flow
import * as React from "react";
import {FC} from "react";
import styled from "styled-components";
import {IProduct} from "../types/product.type";

const Container = styled.div``

interface IProductDetail {
 product: IProduct
}

export const ProductDetail: FC<IProductDetail> = ({product}) => {

 return (
  <Container>
      {product.title}
  </Container>
 );
};