

export type signinReq_T = {
    body: {
        login: string,
        password: string,
        remember: boolean
    }
}

export type loginReq_T = {
    body: {
        login: string,
        password: string,
        remember: boolean
    }
}

export type refreshReq_T = {
    headers: {
        cookie: string
    }
}

export type loggedReq_T = {
    headers: {
        authorization: string
    }
}
export type sqlUser_T = {
    id: number,
    login: string,
    password: string,
    createdAt: string,
    updatedAt: string,
    role: string,
    basket: {
        id: number,
        createdAt: string,
        updatedAt: string,
        userId: number
    }
}

export type RD_User_T = {
    id: number,
    login: string,
    role: string,
    basket: {
        id: number
    }
}

export type isDuplReq_T = {
    query: {
        login: string
    }
}