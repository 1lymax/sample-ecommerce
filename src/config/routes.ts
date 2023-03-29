import {Main} from "../components/Main";
import {ProductList} from "../pages/ProductList";
import {AddProduct} from "../components/Product/AddProduct";
import {ProductDetail} from "../pages/ProductDetail";
import {AddProductByHooks} from "../components/Product/AddProductByHooks";

export const MAIN_ROUTE = '/'
export const PRODUCT_LIST = '/product'
export const PRODUCT_DETAIL = '/product'
export const ADD_PRODUCT_ROUTE = '/product/add'
export const ADD_PRODUCT_BY_HOOKS = '/product/add_by_hooks'

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
    {
        path: ADD_PRODUCT_BY_HOOKS,
        Component: AddProductByHooks
    },
    {
        path: PRODUCT_DETAIL + "/:id",
        Component: ProductDetail
    }
]