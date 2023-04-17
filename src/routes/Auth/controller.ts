import { Basket, User } from "../../db/models"
import { RD_User_T, loggedReq_T, loginReq_T, refreshReq_T, signinReq_T, sqlUser_T } from "./types"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const generateTokens = (id: number, login: string, role: string, basketId: number) => {
    let A_key = process.env.JWT_ACCESS_KEY!
    let R_key = process.env.JWT_REFRESH_KEY!
    let AccessToken = jwt.sign({ id, login, role, basketId }, A_key)
    let RefreshToken = jwt.sign({ id, login, role, basketId }, R_key)
    return { AccessToken, RefreshToken }
}

class AuthController {
    async signin(req: signinReq_T, res: any) {
        try {
            let { login, password, remember } = req.body
            if (!login || !password) {
                return res.sendStatus(400).end()
            }
            let isLoginDupl = await User.findOne({
                where: { login }
            })
            if (isLoginDupl) {
                return res.sendStatus(400).end()
            }
            let hashedPassword = bcrypt.hashSync(password, 7)
            let sqlUser = await User.create({
                login, password: hashedPassword
            }) as any
            let basket = await Basket.create({
                userId: sqlUser.id
            }) as any
            let userANDbasket = await User.findOne({
                where: { id: sqlUser.id },
                include: [{ model: Basket, as: 'basket' }]
            }) as any
            let { AccessToken, RefreshToken } = generateTokens(sqlUser.id, sqlUser.login, sqlUser.role, basket.id)
            let RD_User: RD_User_T = {
                id: userANDbasket.id,
                login: userANDbasket.login,
                role: userANDbasket.role,
                basket: {
                    id: userANDbasket.basket.id
                }
            }
            if(remember) {
                return res
                .cookie('RefreshToken', RefreshToken, { maxAge: 1000 * 60 * 30 })
                .status(201)
                .json({
                    user: RD_User,
                    AccessToken
                }).end()
            } else {
                return res.status(201).json({
                    user: RD_User,
                    AccessToken
                }).end()
            }
            
        } catch (e) {
            console.log(e)
            res.sendStatus(400).end()
        }
    }
    async login(req: loginReq_T, res: any) {
        try {
            let { login, password } = req.body
            let sqlUser: sqlUser_T = await User.findOne({
                where: { login },
                include: [{ model: Basket, as: 'basket' }]
            }) as any
            if (!sqlUser) {
                return res.sendStatus(400).end()
            }
            let isPasswordValid = bcrypt.compareSync(password, sqlUser.password)
            if (!isPasswordValid) {
                return res.sendStatus(400).end()
            }
            let { AccessToken, RefreshToken } = generateTokens(sqlUser.id, sqlUser.login, sqlUser.role, sqlUser.basket.id)
            let RD_User: RD_User_T = {
                id: sqlUser.id,
                login: sqlUser.login,
                role: sqlUser.role,
                basket: {
                    id: sqlUser.basket.id
                }
            }
            if (req.body.remember) {
                return res
                    .cookie('RefreshToken', RefreshToken, { maxAge: 1000 * 60 * 30 })
                    .status(200)
                    .json({
                        user: RD_User,
                        AccessToken
                    })
                    .end()
            } else {
                return res
                    .status(200)
                    .json({
                        user: RD_User,
                        AccessToken
                    })
                    .end()
            }
        } catch (e) {
            console.log(e)
            res.sendStatus(400).end()
        }
    }
    async logout(req: any, res: any) {
        try {
            res.clearCookie('RefreshToken').status(200).end()
        } catch (e) {
            console.log(e)
            res.sendStatus(400).end()
        }
    }
    async refresh(req: refreshReq_T, res: any) {
        try {
            let OldRefreshToken = req.headers.cookie.split('=')[1]
            let isTokenValid = jwt.verify(OldRefreshToken, process.env.JWT_REFRESH_KEY!)
            if (!isTokenValid) {
                return res.sendStatus(400).end()
            }
            let decodedToken = jwt.decode(OldRefreshToken) as any
            let user = await User.findOne({
                where: { id: decodedToken.id },
                include: [{ model: Basket, as: 'basket' }]
            }) as any
            let { AccessToken, RefreshToken } = generateTokens(user.id, user.login, user.role, user.basket.id)
            res
                .cookie('RefreshToken', RefreshToken, { maxAge: 1000 * 60 * 30 })
                .json({
                    user,
                    AccessToken
                })
                .status(200)
                .end()
        } catch (e) {
            console.log(e)
            res.sendStatus(400).end()
        }
    }
    async logged(req: loggedReq_T, res: any) {
        try {
            let AccessToken = req.headers.authorization.split(' ')[1]
            if(!AccessToken) {
                return res.sendStatus(401).end()
            }
            let IsTokenValid = jwt.verify(AccessToken, process.env.JWT_ACCESS_KEY!)
            if (!IsTokenValid) {
                return res.sendStatus(401).end()
            }
            let decodedToken = jwt.decode(AccessToken) as any
            let sqlUser: sqlUser_T = await User.findOne({
                where: { id: decodedToken.id },
                include: [{ model: Basket, as: 'basket' }]
            }) as any
            let RD_User: RD_User_T = {
                id: sqlUser.id,
                login: sqlUser.login,
                role: sqlUser.role,
                basket: {
                    id: sqlUser.basket.id
                }
            }
            res
            .json({
                user: RD_User
            })
            .status(200).end()
        } catch (e) {
            console.log(e)
            res.sendStatus(401).end()
        }
    }
}

export default new AuthController()