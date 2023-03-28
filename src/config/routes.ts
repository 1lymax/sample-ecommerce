import {Main} from "../components/Main";
import {ProductList} from "../pages/ProductList";
import {AddProduct} from "../components/Product/AddProduct";

export const MAIN_ROUTE = '/'
export const PRODUCT_LIST = '/product'
export const ADD_PRODUCT_ROUTE = '/product/add'

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: PRODUCT_LIST,
        Component: ProductList
    },
    {
        path: ADD_PRODUCT_ROUTE,
        Component: AddProduct
    },
]