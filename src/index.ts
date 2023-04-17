import express from 'express'
import dotenv from 'dotenv'
import {User, Basket, BasketDevice, Device, DeviceInfo, Brand, Type, Rating, TypeBrand} from './db/models'
import db from './db/db'
import bodyParser from 'body-parser'

dotenv.config()
const app = express()



app.use(bodyParser.urlencoded({
    extended: true
}))


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