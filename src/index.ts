import express from 'express'
import dotenv from 'dotenv'
import {User, Basket, BasketDevice, Device, DeviceInfo, Brand, Type, Rating, TypeBrand} from './db/models'
import db from './db/db'
import bodyParser from 'body-parser'
import GetAuthRouter from './routes/Auth/router'
import cors from 'cors'
import GetAdminRouter from './routes/Admin/router'

dotenv.config()
const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173']
}))

const AuthRouter = GetAuthRouter()
const AdminRouter = GetAdminRouter()

app.use('/admin', AdminRouter)
app.use('/auth', AuthRouter)

const Start = async () => {
    let PORT = process.env.PORT
    try {
        await db.authenticate()
        await db.sync()
        app.listen(PORT, () => {
            console.log('server is running on port ' + PORT)
        })
    } catch(e) {
        console.log(e)
    }
}

Start()