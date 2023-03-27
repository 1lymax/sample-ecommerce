import {configureStore} from "@reduxjs/toolkit";
import {productSlice} from "./slices/product.slice";
import {productApi} from "./actions/product.api";


export const store =
    configureStore({
        reducer: {
            [productSlice.name]: productSlice.reducer,

             [productApi.reducerPath]: productApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                 .concat(productApi.middleware),
        // devTools: true,
    });

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch