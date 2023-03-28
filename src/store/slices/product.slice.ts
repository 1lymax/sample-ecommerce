import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IProduct, IProductApiResult, KeyValue, IProductFilter, ProductState} from "../../types/product.type";
import {productApi} from "../actions/product.api";
import {sortProducts} from "../../helpers/arraySort";


const initialState: ProductState = {
    products: [],
    filtSortProducts: [],
    limit: 10,
    skip: 0,
    total: 0,
    sortColumn: "id",
    sortOrder: "asc",
    filter: {
        id: 0,
        title: "",
        description: "",
        price: 0,
        rating: 0,
        stock: 0,
        category: ""
    }
};


export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<IProduct[]>) => {
            state.products = action.payload;
        },
        setFilteredProducts: (state, action: PayloadAction<IProduct[]>) => {
            state.filtSortProducts = action.payload;
        },
        setSkip: (state, action: PayloadAction<number>) => {
            state.skip = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },
        setSortColumn: (state, action: PayloadAction<string>) => {
            type Key = keyof IProduct;
            state.sortColumn = action.payload;
            state.filtSortProducts = state.products = sortProducts(state.filtSortProducts, action.payload as Key, state.sortOrder);
        },
        setSortOrder: (state, action: PayloadAction<string>) => {
            type Key = keyof IProduct;
            state.sortOrder = action.payload;
            state.filtSortProducts = state.products = sortProducts(state.filtSortProducts, state.sortColumn as Key, action.payload);
        },

        setFilter: (state, action: PayloadAction<KeyValue<IProductFilter>>) => {
            for (const [key, value] of Object.entries(action.payload)) {
                type Key = keyof IProductFilter
                if (state.filter) {
                    const changeValue = typeof state.filter[key as Key] === "number" ? parseInt(value) : value;
                    // @ts-ignore
                    state.filter[key as Key] = changeValue;
                }
            }
        }

    },
    extraReducers(builder) {
        builder
            .addMatcher(productApi.endpoints.getAllProducts.matchFulfilled, (state, action: PayloadAction<IProductApiResult>) => {
                state.products = action.payload.products;
                state.filtSortProducts = action.payload.products;
                state.skip = action.payload.skip;
                state.limit = action.payload.limit;
                state.total = action.payload.total;
            });

    },
});

export const { setProducts, setFilteredProducts } = productSlice.actions;
export const productActionCreators = productSlice.actions;

export default productSlice.reducer;