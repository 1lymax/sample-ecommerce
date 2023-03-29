// @flow
import * as React from "react";
import styled from "styled-components";
import {useNavigate, useParams} from "react-router";
import {useGetProductByIdQuery} from "../store/actions/product.api";
import LoadingContainer from "../components/LoadingContainer";
import {useMessageError} from "../hooks/useMessageError";
import {RatingStars} from "../components/Product/RatingStars";
import {Button} from "@mui/material";
import {ChevronLeft} from "@mui/icons-material";

const Container = styled.div`
  width: 800px;
  margin: 40px 20px;
`;

const ProductContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
`;
const Title = styled.div`
  font-size: 3rem;
  margin: 30px 0;
`;
const Image = styled.div<{ source: string | undefined }>`
  width: 400px;
  height: 400px;
  background-image: url("${props => props.source}");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 400px;
`;
const Description = styled.p`
  font-size: 1.5rem;
  margin-top: 30px;
`;
const Price = styled.div`
  margin: 10px 10px 10px 0;
  display: flex;
  justify-content: space-between;
`;
const Stock = styled.div`
  margin: 10px 10px 10px 0;
  display: flex;
  justify-content: space-between;
`;
const Rating = styled.div`
  margin: 10px 10px 10px 0;
  display: flex;
  justify-content: center;
`;

const RatingTitle = styled.div`
margin-right: 20px;
`

export const ProductDetail = () => {
    const { id } = useParams<string>();
    const navigate = useNavigate()
    const { error, status, data: product } = useGetProductByIdQuery(id);
    const rating = product?.rating ? product.rating : 0

    useMessageError("Cannot load data", error);

    return (
        <>

            <Container>
                {status === "pending" && <LoadingContainer/>}
                <Button variant="outlined" startIcon={<ChevronLeft />} onClick={() => navigate(-1)}>
                    Back
                </Button>
                <Title>{product?.title}</Title>
                <ProductContainer>
                    <Left>
                        <Image source={product?.thumbnail}/>
                    </Left>
                    <Right>
                        <Rating>
                            <RatingTitle>Rating:</RatingTitle>
                            <div><RatingStars rating={rating}/></div>
                        </Rating>
                        <Price>
                            <div>Price:</div>
                            <div>{product?.price}</div>
                        </Price>
                        <Stock>
                            <div>Stock:</div>
                            <div>{product?.stock}</div>
                        </Stock>
                    </Right>
                </ProductContainer>
                <Description>{product?.description}</Description>
                {}
            </Container>
        </>
    );
};