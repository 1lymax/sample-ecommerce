import queryString from "query-string";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {PRODUCT_API_URL, SELECTED_COLUMNS} from "../../config/api.config";
import {IProductCreate, IProduct, IProductApiResult} from "../../types/product.type";


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
        getProductById: builder.query<IProduct, string | undefined>({
            query: (id) => `${id}`,
        }),
        getCategories: builder.query<string[], void>({
            query: () => `categories`,
        }),

        createProduct: builder.mutation<IProduct, IProductCreate>({
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
} = productApi;

export const {} = productApi.endpoints;