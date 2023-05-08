import express from 'express'
import BasketController from './controller'
import UserMiddleware from '../Middleware/UserMiddleware'

let verification = UserMiddleware.verification

const GetBasketRouter = () => {
    let router = express.Router()
    router.get('/', verification, BasketController.getBasketItems)
    return router
}

export default GetBasketRouter