import express from 'express'
import ItemsController from './controller'
import UserMiddleware from '../Middleware/UserMiddleware'

let verification = UserMiddleware.verification

const GetItemsRouter = () => {
    const router = express.Router()
    router.get('/:id', ItemsController.getItem)
    router.post('/find', ItemsController.getItems)
    router.post('/:id', verification, ItemsController.addToBasket)
    router.post('/', ItemsController.createItem)
    router.delete('/:id', ItemsController.deleteItem)
    return router
}

export default GetItemsRouter