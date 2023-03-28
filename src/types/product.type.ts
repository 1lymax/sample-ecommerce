// ID, назва, опис, ціна, фото, рейтинг, сток, категорія.
export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    rating: number;
    stock: number;
    category: string
}

export interface ProductState {
    products: IProduct[],
    filteredSortedProducts: IProduct[],
    categories: string[],
    apiSelectedCategory: string,
    apiQuery: string,
    total: number,
    sortColumn: string,
    sortOrder: string,
    filter: Omit<IProduct, 'thumbnail'> | null
}

export interface IProductApiResult {
    products: IProduct[],
    limit: number,
    skip: number,
    total: number
}


export type IProductFilter = Omit<IProduct, 'thumbnail'>

export type KeyValue<T> = {
    [P in keyof T]: {
        key: P;
        value: T[P];
    }
}[keyof T];

