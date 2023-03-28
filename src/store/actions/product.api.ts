import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IProductCreate, IProduct, IProductApiResult} from "../../types/product.type";
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
    useGetProductByCategoryQuery
} = productApi;

export const {} = productApi.endpoints;