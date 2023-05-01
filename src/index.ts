import express from 'express'
import dotenv from 'dotenv'
import {User, Basket, BasketDevice, DeviceInfo, Brand, Type, Rating, TypeBrand} from './db/models'
import db from './db/db'
import bodyParser from 'body-parser'
import GetAuthRouter from './routes/Auth/router'
import cors from 'cors'
import GetAdminRouter from './routes/Admin/router'
import GetItemsRouter from './routes/Items/router'
import fileUpload from 'express-fileupload'
import GetTypesRouter from './routes/Types/router'
import GetBrandsRouter from './routes/Brands/router'
import path from 'path'

dotenv.config()
const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173']
}))
app.use(bodyParser.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, 'static')))

const AuthRouter = GetAuthRouter()
const AdminRouter = GetAdminRouter()
const ItemsRouter = GetItemsRouter()
const TypesRouter = GetTypesRouter()
const BrandsRouter = GetBrandsRouter()

app.use('/admin', AdminRouter)
app.use('/auth', AuthRouter)
app.use('/items', ItemsRouter)
app.use('/types', TypesRouter)
app.use('/brands', BrandsRouter)

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