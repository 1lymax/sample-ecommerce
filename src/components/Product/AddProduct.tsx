// @flow
import * as yup from "yup";
import * as React from "react";
import {useFormik} from "formik";
import {useEffect} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router";
import {Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";

import {PRODUCT_LIST} from "../../config/routes";
import {useAppSelector} from "../../hooks/useAppSelector";
import LoadingContainer from "../LoadingContainer";
import {useMessageError} from "../../hooks/useMessageError";
import {useMessageSuccess} from "../../hooks/useMessageSuccess";
import {useInputFormikMui} from "../../hooks/useInputFormikMui";
import {useCreateProductMutation, useGetCategoriesQuery} from "../../store/actions/product.api";

const Container = styled.div`
  position: relative;
  width: 400px;
  margin: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
`;

const productSchema = yup.object({
    title: yup
        .string()
        .required("Title is required")
        .min(5, "Title should be of minimum 5 characters length"),
    description: yup.string(),
    category: yup
        .string()
        .required("You should choose a category"),
    price: yup
        .number()
        .required("Price cannot be null")
        .positive("Price should be positive")
        .integer("Price should be an integer"),
    stock: yup
        .number()
        .required("Stock cannot be null")
        .positive("Stock should be positive")
        .integer("Stock should be an integer"),
});


export const AddProduct = () => {
    const navigate = useNavigate();
    const { categories } = useAppSelector(state => state.product);
    const [createProduct, { status, error, isSuccess }] = useCreateProductMutation();

    useGetCategoriesQuery();

    useMessageSuccess("Product was added", isSuccess);
    useMessageError("Product create error", error);

    useEffect(() => {
        if (isSuccess) {
            formik.resetForm();
            navigate(PRODUCT_LIST);
        }
    }, [isSuccess]);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            category: "",
            price: "",
            stock: ""
        },
        validationSchema: productSchema,
        onSubmit: (values) => {
            createProduct(values);
        },
    });

    const titleProps = useInputFormikMui(formik, "title");
    const descriptionProps = useInputFormikMui(formik, "description");
    const categoryProps = useInputFormikMui(formik, "category");
    const priceProps = useInputFormikMui(formik, "price");
    const stockProps = useInputFormikMui(formik, "stock");

    return (
        <Container>
            {status === "pending" && <LoadingContainer/>}
            <Typography sx={{ m: 2 }} variant="h4">Add new product</Typography>

            <form onSubmit={formik.handleSubmit}>
                <TextField sx={{ marginY: 1 }}
                           {...titleProps}/>
                <TextField rows={4}
                           multiline
                           sx={{ marginY: 1 }}
                           {...descriptionProps}
                />
                <FormControl fullWidth sx={{ marginY: 1 }}
                             error={categoryProps.error}>
                    <InputLabel id="category">Category</InputLabel>
                    <Select {...categoryProps}>
                        {categories.map((category) => (
                            <MenuItem value={category} key={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{categoryProps.helperText}</FormHelperText>
                </FormControl>
                <TextField sx={{ marginY: 1 }} {...priceProps}/>
                <TextField sx={{ marginY: 1 }} {...stockProps}/>
                <Button fullWidth
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{ marginY: 3 }}
                >
                    Add Product
                </Button>
            </form>
        </Container>
    );
};