

export type createBrandReq_T = {
    body: {
        name: string
    },
    files: {
        img: any
    }
}

export type getBrandReq_T = {
    params: {
        id: number
    }
}

export type getBrandsReq_T = {
    query: {
        offset: number,
        limit: number
    }
}