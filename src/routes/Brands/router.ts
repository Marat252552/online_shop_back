import express from 'express'
import BrandsController from './controller'
import ManagerMiddleware from '../Middleware/ManagerMiddleware'

let verification = ManagerMiddleware.verification

const GetBrandsRouter = () => {
    let router = express.Router()
    router.post('/', verification, BrandsController.createBrand)
    router.get('/:id', BrandsController.getBrand)
    router.post('/find', BrandsController.getBrands)
    router.delete('/:id', verification, BrandsController.deleteBrand)
    return router
}

export default GetBrandsRouter