import {useEffect} from "react";
import {useAppSelector} from "./appHook";
import {useProductActions} from "./apiActions";
import {IProductFilter} from "../types/product.type";

export const useFilterProducts = (): void => {
    const { products, filter } = useAppSelector(state => state.product);
    const { setFilteredProducts } = useProductActions();

    useEffect(() => {
        let tempProducts = products;
        type Key = keyof IProductFilter
        if (filter) {
            for (const [key, value] of Object.entries(filter)) {
                if (!!value) {
                    if (typeof value === "string") {
                        tempProducts = tempProducts.filter(
                            item => item[key as Key]
                                .toString()
                                .toLowerCase().includes(value.toLowerCase()));
                    } else {
                        tempProducts = tempProducts.filter(
                            item => item[key as Key] === value);
                    }
                }
            }
            setFilteredProducts(tempProducts);
        }
    }, [filter]);
};