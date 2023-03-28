// @flow
import * as React from "react";
import {FC} from "react";
import styled from "styled-components";
import {useParams} from "react-router";

const Container = styled.div``;

interface IProductDetail {
}

export const ProductDetail: FC<IProductDetail> = ({}) => {
    const { id } = useParams();
    //useGetProductByIdQuery({ id })

    return (
        <Container>

        </Container>
    );
};