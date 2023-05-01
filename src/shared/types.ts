export type TokenData_T = {
    id: number,
    login: string,
    role: string,
    basketId: number
}

export type Item_T = {
    id: number,
    name: string,
    description: string,
    price: number,
    rating: number,
    imgName: string,
    createdAt: string,
    updatedAt: string,
    brandId: number,
    typeId: number
}

export type verificationReq_T = {
    headers: {
        authorization: string
    }
}