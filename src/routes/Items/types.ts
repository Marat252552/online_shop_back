export type getItemsReq_T = {
    body: {
        offset: number,
        limit: number,
        brandTags: Array<number>,
        typeTags: Array<number>,
        searchValue: string
    }
}

export type createItemReq_T = {
    body: {
        name: string,
        description: string
        price: string,
        typeId: number,
        brandId: number
    },
    files: {
        img: any
    }
}

export type deleteItemReq_T = {
    params: {
        id: number
    }
}
export type getItemReq_T = {
    params: {
        id: number
    }
}

export type addToBasketReq_T = {
    headers: {
        authorization: string
    },
    params: {
        // id товара
        id: string
    }
}