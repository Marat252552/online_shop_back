import express from 'express'
import TypesController from './controller'


const GetTypesRouter = () => {
    let router = express.Router()
    router.post('/find', TypesController.getTypes)
    router.post('/', TypesController.createType)
    return router
}

export default GetTypesRouter