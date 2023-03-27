import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IProduct, IProductApiResult, ProductState} from "../../types/product.type";
import {productApi} from "../actions/product.api";
import {sortProducts} from "../../helpers/arraySort";


const initialState: ProductState = {
    products: [],
    limit: 10,
    skip: 0,
    total: 0,
    sortColumn: 'id',
    sortOrder: 'asc'
}


export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action:PayloadAction<IProduct[]>) => {
            state.products = action.payload
        },
        setSkip: (state, action:PayloadAction<number>) => {
            state.skip = action.payload
        },
        setLimit: (state, action:PayloadAction<number>) => {
            state.limit = action.payload
        },
        setSortColumn: (state, action:PayloadAction<string>) => {
            type Key = keyof IProduct;
            state.sortColumn = action.payload
            state.products = sortProducts(state.products,action.payload as Key, state.sortOrder)
        },
        setSortOrder: (state, action:PayloadAction<string>) => {
            type Key = keyof IProduct;
            state.sortOrder = action.payload
            state.products = sortProducts(state.products,state.sortColumn as Key, action.payload)
        }
    },
    extraReducers (builder) {
        builder
            .addMatcher(productApi.endpoints.getAllProducts.matchFulfilled, (state, action:PayloadAction<IProductApiResult>) => {
                state.products = action.payload.products
                state.skip = action.payload.skip
                state.limit = action.payload.limit
                state.total = action.payload.total
            })

    },
})

export const {setProducts} = productSlice.actions
export const productActionCreators = productSlice.actions

export default productSlice.reducer