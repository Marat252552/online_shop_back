import express from 'express'
import ItemsController from './controller'

const GetItemsRouter = () => {
    const router = express.Router()
    router.get('/:id', ItemsController.getItem)
    router.get('/', ItemsController.getItems)
    router.post('/', ItemsController.createItem)
    router.delete('/:id', ItemsController.deleteItem)
    return router
}

export default GetItemsRouter