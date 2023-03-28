import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {productApi} from "../actions/product.api";
import {sortProducts} from "../../helpers/arraySort";
import {IProduct, IProductApiResult, KeyValue, IProductFilter, ProductState} from "../../types/product.type";

const filterInitialState = {
    id: 0,
    title: "",
    description: "",
    price: 0,
    rating: 0,
    stock: 0,
    category: ""
}

const initialState: ProductState = {
    products: [],
    filteredSortedProducts: [],
    categories: [],
    total: 0,
    apiSelectedCategory: "",
    apiQuery: "",
    sortColumn: "id",
    sortOrder: "asc",
    filter: filterInitialState
};


export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<IProduct[]>) => {
            state.products = action.payload;
        },
        setFilteredProducts: (state, action: PayloadAction<IProduct[]>) => {
            state.filteredSortedProducts = action.payload;
        },
        setSortColumn: (state, action: PayloadAction<string>) => {
            state.sortColumn = action.payload;
            state.filteredSortedProducts = state.products = sortProducts(
                state.filteredSortedProducts,
                action.payload as keyof IProduct,
                state.sortOrder
            );
        },
        setSortOrder: (state, action: PayloadAction<string>) => {
            state.sortOrder = action.payload;
            state.filteredSortedProducts = state.products = sortProducts(
                state.filteredSortedProducts,
                state.sortColumn as keyof IProduct,
                action.payload
            );
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
        },
        setApiSelectedCategory: (state, action: PayloadAction<string>) => {
            state.apiSelectedCategory = action.payload
        },
        setApiQuery: (state, action: PayloadAction<string>) => {
            state.apiQuery = action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addMatcher(productApi.endpoints.getAllProducts.matchFulfilled, (state, action: PayloadAction<IProductApiResult>) => {
                state.products = action.payload.products;
                state.filteredSortedProducts = action.payload.products;
                state.total = action.payload.total;
                state.filter = filterInitialState

            })
            .addMatcher(productApi.endpoints.getCategories.matchFulfilled, (state, action: PayloadAction<string[]>) => {
                state.categories = action.payload;
                state.filter = filterInitialState
            })
            .addMatcher(productApi.endpoints.getProductByCategory.matchFulfilled, (state, action: PayloadAction<IProductApiResult>) => {
                state.products = action.payload.products;
                state.filteredSortedProducts = action.payload.products;
                state.filter = filterInitialState
            });

    },
});

export const { setProducts, setFilteredProducts } = productSlice.actions;
export const productActionCreators = productSlice.actions;

export default productSlice.reducer;