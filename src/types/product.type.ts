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

export interface IProducts {
    products: IProduct[]
}

export interface ProductsState {
    products: IProducts
}