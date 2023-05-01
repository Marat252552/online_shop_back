import express from 'express'
import AdminController from './controller'
import middleware from '../Middleware/AdminMiddleware'

const GetAdminRouter = () => {
    let router = express.Router()
    router.post('/users', AdminController.getUsers)
    router.put('/users', middleware.verification, AdminController.changeRole)
    return router
}

export default GetAdminRouter