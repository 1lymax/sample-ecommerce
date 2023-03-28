import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IProduct, IProductApiResult} from "../../types/product.type";
import {PRODUCT_API_URL, SELECTED_COLUMNS} from "../../config/api.config";
import queryString from "query-string";


export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: PRODUCT_API_URL }),
    tagTypes: ["product"],
    endpoints: (builder) => ({
        getAllProducts: builder.query<IProductApiResult, any>({
            query: (args) => ({
                url: (args.q.length > 0 ? `search/` : "") +
                    (args.category.length > 0 ? `category/${args.category}` : ""),
                params: queryString.parse(queryString.stringify({ ...args, select: SELECTED_COLUMNS }, {skipEmptyString: true})),

            }),
            providesTags: ["product"]
        }),

        getProductById: builder.query<IProduct, string>({
            query: (id) => `${id}&select=${SELECTED_COLUMNS}`,
        }),
        getProductByCategory: builder.query<IProductApiResult, any>({
            query: (arg) => `category/${arg.category}`,
            providesTags: ["product"]
        }),
        getCategories: builder.query<string[], void>({
            query: () => `categories`,
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


export const {
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useGetCategoriesQuery,
    useGetProductByCategoryQuery
} = productApi;

export const {} = productApi.endpoints;