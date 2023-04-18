import express from 'express'
import BrandsController from './controller'

const GetBrandsRouter = () => {
    let router = express.Router()
    router.post('/', BrandsController.createBrand)
    router.get('/:id', BrandsController.getBrand)
    router.get('/', BrandsController.getBrands)
    return router
}

export default GetBrandsRouter