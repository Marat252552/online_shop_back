

export type createTypeReq_T = {
    body: {
        name: string
    }
}

export type getTypesReq_T = {
    body: {
        offset: number,
        limit: number,
        searchValue: string
    }
}