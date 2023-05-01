

export type getUsersReq_T = {
    body: {
        roles: Array<string>,
        offset: number,
        limit: number,
        searchValue: string
    }
    headers: {
        authorization: string
    }
}



export type changeRoleReq_T = {
    body: {
        id: number,
        newRole: string
    }
}