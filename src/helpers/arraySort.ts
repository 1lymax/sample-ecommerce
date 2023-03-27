import {IProduct} from "../types/product.type";

interface ISortProducts {
    (array: IProduct[], column: keyof IProduct, order: string): IProduct[]
}

export const sortProducts:ISortProducts = (array: IProduct[], column: keyof IProduct, order: string) => {
    if (typeof column === "number") {
        if (order === "asc") {
            return array.sort((a, b) => {
                return a[column] - b[column]
            })
        } else {
            return array.sort((a, b) => {
                return b[column] - a[column];
            })
        }
    } else {
        if (order === "asc") {
            return array.sort((a, b) => {
                let fa = a[column],
                    fb = b[column]

                if (fa < fb) {
                    return -1
                }
                if (fa > fb) {
                    return 1
                }
                return 0
            })
        } else {
            return array.sort((a, b) => {
                let fa = a[column],
                    fb = b[column]

                if (fa > fb) {
                    return -1
                }
                if (fa < fb) {
                    return 1
                }
                return 0
            })
        }

    }
};
