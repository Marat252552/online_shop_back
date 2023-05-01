


export const IntServErr = (res: any) => {
    return res.status(500).json({message: 'Произошла непредвиденная ошибка'}).end()
}

export const BadRequest = (res: any, message: string) => {
    return res.status(400).json({message}).end()
}

export const OKResponse = (res: any, message?: string) => {
    return res.status(200).json({message}).end()
}

export const Unauthorized = (res: any) => {
    return res.sendStatus(401).end()
}

export const Forbidden = (res: any) => {
    return res.sendStatus(403).end()
}