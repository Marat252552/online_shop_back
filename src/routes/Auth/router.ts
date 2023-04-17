import express from 'express'
import AuthController from './controller'

const GetAuthRouter = () => {
    const router = express.Router()
    router.post('/signin', AuthController.signin)
    router.post('/login', AuthController.login)
    router.get('/refresh', AuthController.refresh)
    router.get('/logged', AuthController.logged)
    router.delete('/logout', AuthController.logout)
    return router
}

export default GetAuthRouter