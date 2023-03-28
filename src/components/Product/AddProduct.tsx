// @flow
import * as yup from "yup";
import * as React from "react";
import {useFormik} from "formik";
import {FC, useEffect} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router";
import {useCreateProductMutation, useGetCategoriesQuery} from "../../store/actions/product.api";
import {Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";

import {PRODUCT_LIST} from "../../config/routes";
import {useAppSelector} from "../../hooks/appHook";
import LoadingContainer from "../LoadingContainer";
import {useErrorMessage} from "../../hooks/useErrorMessage";
import {useSuccessMessage} from "../../hooks/useSuccessMessage";

const Container = styled.div`
  position: relative;
  width: 400px;
  margin: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
`;

interface IAddProduct {

}

const productSchema = yup.object({
    title: yup
        .string()
        .required("Title is required")
        .min(8, "Title should be of minimum 5 characters length"),
    description: yup
        .string(),
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


export const AddProduct: FC<IAddProduct> = () => {
    const navigate = useNavigate();
    const { categories } = useAppSelector(state => state.product);
    const [createProduct, { status, error, isSuccess }] = useCreateProductMutation();

    useGetCategoriesQuery();

    useSuccessMessage("Product was added", isSuccess);
    useErrorMessage("Product create error", error);

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

    return (
        <Container>
            {status === "pending" && <LoadingContainer/>}
            <Typography sx={{ m: 2 }} variant="h4">Add new product</Typography>

            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Title"
                    sx={{ marginY: 1 }}
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />
                <TextField
                    rows={4}
                    multiline
                    fullWidth
                    type="text"
                    id="description"
                    name="description"
                    label="Description"
                    sx={{ marginY: 1 }}
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />
                <FormControl fullWidth sx={{ marginY: 1 }}
                             error={formik.touched.category && Boolean(formik.errors.category)}>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                        id="category"
                        name="category"
                        label="Category"
                        labelId="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        error={formik.touched.category && Boolean(formik.errors.category)}
                    >
                        {categories.map((category) => (
                            <MenuItem value={category} key={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{formik.touched.category && formik.errors.category}</FormHelperText>
                </FormControl>
                <TextField
                    fullWidth
                    id="price"
                    name="price"
                    label="Price"
                    type="text"
                    sx={{ marginY: 1 }}
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                />
                <TextField
                    fullWidth
                    id="stock"
                    type="text"
                    name="stock"
                    label="Stock"
                    sx={{ marginY: 1 }}
                    value={formik.values.stock}
                    onChange={formik.handleChange}
                    error={formik.touched.stock && Boolean(formik.errors.stock)}
                    helperText={formik.touched.stock && formik.errors.stock}
                />
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