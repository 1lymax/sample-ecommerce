import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IProduct, IProductApiResult} from "../../types/product.type";
import {PRODUCT_API_URL, SELECTED_COLUMNS} from "../../config/api.config";


export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: PRODUCT_API_URL }),
    tagTypes: ["product"],
    endpoints: (builder) => ({
        getAllProducts: builder.query<IProductApiResult, any>({
            query: (args) => ({
                url: ``,
                params: { ...args, select: SELECTED_COLUMNS},

            }),
            providesTags: ["product"]
        }),

        getProductById: builder.query<IProduct, string>({
            query: (id) => `/${id}&select=${SELECTED_COLUMNS}`,
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
                url: "",
                method: "POST",
                body: args
            }),
            invalidatesTags: ["product"],
        })
    }),
});


export const { useGetAllProductsQuery, useGetProductByIdQuery, useCreateProductMutation } = productApi;

export const {} = productApi.endpoints;