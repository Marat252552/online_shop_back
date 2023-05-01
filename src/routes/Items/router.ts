import express from 'express'
import ItemsController from './controller'

const GetItemsRouter = () => {
    const router = express.Router()
    router.get('/:id', ItemsController.getItem)
    router.post('/', ItemsController.createItem)
    router.post('/find', ItemsController.getItems)
    router.delete('/:id', ItemsController.deleteItem)
    return router
}

export default GetItemsRouter