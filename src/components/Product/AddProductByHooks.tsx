// @flow
import * as React from "react";
import styled from "styled-components";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";

import {useInput} from "../../hooks/useInput";
import {PRODUCT_LIST} from "../../config/routes";
import LoadingContainer from "../LoadingContainer";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useMessageError} from "../../hooks/useMessageError";
import {useIsValid, Validations} from "../../hooks/useIsValid";
import {useMessageSuccess} from "../../hooks/useMessageSuccess";
import {useInputMuiSelect} from "../../hooks/useInputMuiSelect";
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


export const AddProductByHooks = () => {
    const navigate = useNavigate();
    const { categories } = useAppSelector(state => state.product);
    const [createProduct, { status, error, isSuccess }] = useCreateProductMutation();
    const [firstSubmit, setFirstSubmit] = useState(false);
    useGetCategoriesQuery();

    useMessageSuccess("Product was added", isSuccess);
    useMessageError("Product create error", error);

    const title = useInput("", "title");
    const titleCheck = useIsValid(title.value, "Title",
        [{ validation: Validations.IS_SHORTER_THAN, value: 5 }]);

    const description = useInput("", "description");
    const descriptionCheck = useIsValid(description.value, "Description",
        [
            { validation: Validations.IS_LONGER_THAN, value: 250 },
            { validation: Validations.IS_SHORTER_THAN, value: 5 }
        ]);

    const category = useInputMuiSelect("", "category");
    const categoryCheck = useIsValid(category.value, "Category",
        [{ validation: Validations.IS_EMPTY }]);

    const price = useInput("", "price");
    const priceCheck = useIsValid(price.value, "Price",
        [{ validation: Validations.IS_POSITIVE_INTEGER }]);

    const stock = useInput("", "stock");
    const stockCheck = useIsValid(stock.value, "Stock",
        [{ validation: Validations.IS_POSITIVE_INTEGER }]);

    const isValidForm: boolean = titleCheck.isValid &&
        descriptionCheck.isValid && categoryCheck.isValid &&
        priceCheck.isValid && stockCheck.isValid


    const handleSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!firstSubmit) setFirstSubmit(true);
        if (isValidForm)
           createProduct({
               title: title.value,
               description: description.value,
               category: category.value,
               price: price.value,
               stock: stock.value
           })
    };

    useEffect(() => {
        if (isSuccess) {
            navigate(PRODUCT_LIST);
        }
        // eslint-disable-next-line
    }, [isSuccess]);

    return (
        <Container>
            {status === "pending" && <LoadingContainer/>}
            <Typography sx={{ m: 2 }} variant="h4">Add new product</Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    sx={{ marginY: 1 }}
                    {...title}
                    error={firstSubmit && !titleCheck.isValid}
                    helperText={firstSubmit && !titleCheck.isValid && titleCheck.errors}
                />
                <TextField
                    rows={4}
                    multiline
                    sx={{ marginY: 1 }}
                    {...description}
                    error={firstSubmit && !descriptionCheck.isValid}
                    helperText={firstSubmit && !descriptionCheck.isValid && descriptionCheck.errors}
                />
                <FormControl fullWidth sx={{ marginY: 1 }}
                             error={firstSubmit && !categoryCheck.isValid}>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                        labelId="category"
                        {...category}
                        error={firstSubmit && !categoryCheck.isValid}
                    >
                        {categories.map((category) => (
                            <MenuItem value={category} key={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{firstSubmit && !categoryCheck.isValid && categoryCheck.errors}</FormHelperText>
                </FormControl>
                <TextField
                    sx={{ marginY: 1 }}
                    { ...price}
                    error={firstSubmit && !priceCheck.isValid}
                    helperText={firstSubmit && !priceCheck.isValid && priceCheck.errors}
                />
                <TextField
                    sx={{ marginY: 1 }}
                    { ...stock}
                    error={firstSubmit && !stockCheck.isValid}
                    helperText={firstSubmit && !stockCheck.isValid && stockCheck.errors}
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