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
    limit: number,
    skip: number,
    total: number,
    sortColumn: string,
    sortOrder: string
}

export interface IProductApiResult {
    products: IProduct[],
    limit: number,
    skip: number,
    total: number
}