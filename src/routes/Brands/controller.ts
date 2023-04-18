import { v4 } from "uuid"
import { createBrandReq_T, getBrandReq_T } from "./types"
import path from 'path'
import { Brand, Item } from "../../db/models"


class BrandsController {
    async createBrand(req: createBrandReq_T, res: any) {
        try {
            let {img} = req.files
            let {name} = req.body
            if(!name || !img) {
                return res.sendStatus(400).end()
            }
            let imgName = v4() + '.jpg'
            let brand = await Brand.create({
                name,
                imgName
            })
            img.mv(path.resolve(__dirname, './../../', 'static', imgName))
            res
                .json({brand})
                .status(201)
                .end()
        } catch(e) {
            console.log(e)
            res.sendStatus(400).end()
        }
    }
    async getBrand(req: getBrandReq_T, res: any) {
        try {
            let {id} = req.params
            let brand = await Brand.findOne({
                where: {id},
                include: [{model: Item, as: 'items'}]
            })
            res
                .json({brand})
                .status(200)
                .end()
        } catch(e) {
            console.log(e)
            res.sendStatus(400).end()
        }
    }
    async getBrands(req: any, res: any) {
        try {
            let brands = await Brand.findAll()
            res
                .json({brands})
                .status(200)
                .end()
        } catch(e) {
            console.log(e)
            res.sendStatus(400).end()
        }
    }
}

export default new BrandsController()