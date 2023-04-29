import express from 'express'
import TypesController from './controller'


const GetTypesRouter = () => {
    let router = express.Router()
    router.post('/', TypesController.createType)
    router.get('/', TypesController.getTypes)
    return router
}

export default GetTypesRouter