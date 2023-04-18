import express from 'express'
import AdminController from './controller'
import middleware from './middleware'

const GetAdminRouter = () => {
    let router = express.Router()
    router.get('/users', middleware.verification, AdminController.getUsers)
    router.put('/users', middleware.verification, AdminController.changeRole)
    return router
}

export default GetAdminRouter