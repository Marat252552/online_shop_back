

export type getUsersReq_T = {
    query: {
        offset: number,
        limit: number,
        role: string
    },
    headers: {
        authorization: string
    }
}

export type verificationReq_T = {
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