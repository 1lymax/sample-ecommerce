// @flow
import * as React from "react";
import {FC, useEffect, useState} from "react";
import styled from "styled-components";
import {Autocomplete, InputAdornment, OutlinedInput, TextField} from "@mui/material";
import {Search} from "@mui/icons-material";
import {useGetCategoriesQuery} from "../../store/actions/product.api";
import {useAppSelector} from "../../hooks/appHook";
import {useProductActions} from "../../hooks/apiActions";
import {useErrorMessage} from "../../hooks/useErrorMessage";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

interface IProductSearch {

}

export const ProductSearch: FC<IProductSearch> = () => {
    const [searchError, setSearchError] = useState<Error | undefined>(undefined);
    const { categories, apiSelectedCategory, apiQuery } = useAppSelector(state => state.product);
    const { setApiSelectedCategory, setApiQuery } = useProductActions();
    useGetCategoriesQuery();

    useErrorMessage("Can't search product and category at the same time", searchError);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApiQuery(e.target.value);
    };

    const handleSelectChange = (e: React.SyntheticEvent<Element, Event>, newValue: string | null) => {
        console.log(newValue);
        setApiSelectedCategory(newValue ? newValue : "");

    };

    const handleSelectInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(e.target.value);
        if (!e.target.value) setApiSelectedCategory("");
    };

    useEffect(() => {
        if (apiSelectedCategory.length > 0 && apiQuery.length > 0) {
            setSearchError(new Error("Can't load data"));
        } else {
            setSearchError(undefined);
        }
    }, [apiSelectedCategory, apiQuery]);

    useEffect(() => {
        if (searchError) {
            setApiQuery("");
        }
    }, [searchError]);

    return (
        <Container>
            <OutlinedInput type={"search"}
                           value={apiQuery}
                           placeholder={"Search product..."}
                           sx={{ width: 300, marginX: 3 }}
                           onChange={handleInputChange}
                           startAdornment={
                               <InputAdornment position="start">
                                   <Search/>
                               </InputAdornment>
                           }
            />
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={categories}
                sx={{ width: 300, marginX: 3 }}
                onChange={handleSelectChange}
                renderInput={(params) => <TextField onChange={handleSelectInputChange} {...params} label="Choose category..."/>}
            />
        </Container>
    );
};