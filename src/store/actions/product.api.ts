import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IProduct} from "../../types/product.type";

const PRODUCT_API_URL = "https://dummyjson.com/products"


export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({baseUrl: PRODUCT_API_URL}),
    tagTypes: ['product'],
    endpoints: (builder) => ({
        getAllProducts: builder.query<IProduct[], void>({
            query: () => ``,
            providesTags: ['product'],
        }),

        getProductById: builder.query<IProduct, string>({
            query: (id) => `/${id}`,
        }),

        // searchAlbum: builder.query<IProduct[], any>({
        //     query: (arg) => ({
        //         url: `album/search/artist`,
        //         params: arg
        //     }),
            // onCacheEntryAdded(arg, {dispatch, cacheDataLoaded} ): Promise<void> | void {
            //     try {
            //         console.log('onCacheEntryAdded')
            //         cacheDataLoaded.then(result => {
            //             dispatch(setAlbums(result.data))})
            //     }catch (e) {
            //         console.log(e)
            //     }
            //
            // }
        //}),
        createProduct: builder.mutation<IProduct, FormData>({
            query: (args) => ({
                url: '',
                method: 'POST',
                body: args
            }),
            invalidatesTags: ['product'],
        })
    }),
})


export const { } = productApi

export const {} = productApi.endpoints