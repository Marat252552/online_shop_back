export type getItemsReq_T = {
    query: {
        offset: number,
        limit: number,
        brandId: string,
        typeId: string
    }
}

export type createItemReq_T = {
    body: {
        name: string,
        description: string
        price: string,
        rating: string,
        typeId: number,
        brandId: number
    },
    files: {
        img: any
    }
}

export type getItemReq_T = {
    params: {
        id: number
    }
}