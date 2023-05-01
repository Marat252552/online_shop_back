

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
    body: {
        offset: number,
        limit: number,
        searchValue: string
    }
}

export type deleteBrandReq_T = {
    params: {
        id: string
    }
}