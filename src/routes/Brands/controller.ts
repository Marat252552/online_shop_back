import { v4 } from "uuid"
import { createBrandReq_T, deleteBrandReq_T, getBrandReq_T, getBrandsReq_T } from "./types"
import path from 'path'
import { Brand, Item } from "../../db/models"
import { BadRequest, IntServErr, OKResponse } from "../Response/response"
import { Op } from "sequelize"


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
    async getBrands(req: getBrandsReq_T, res: any) {
        try {
            let {offset, limit, searchValue} = req.body
            if(offset === undefined || limit === undefined || searchValue === undefined) {
                return BadRequest(res, 'Неполный запрос')
            }
            let brands
            let brandsAmount
            if(searchValue !== '') {
                brands = await Brand.findAll({
                    offset, limit, where: {
                        name: {[Op.substring]: searchValue}
                    }
                })
                brandsAmount = await Brand.count({
                    where: {
                        name: {[Op.substring]: searchValue}
                    }
                })
            } else {
                brands = await Brand.findAll({
                    offset, limit
                })
                brandsAmount = await Brand.count()
            }
            res
                .json({brands, brandsAmount})
                .status(200)
                .end()
        } catch(e) {
            console.log(e)
            res.sendStatus(400).end()
        }
    }
    async deleteBrand(req: deleteBrandReq_T, res: any) {
        try {
            let {id} = req.params
            let sql_response = await Brand.destroy({where: {id}})
            if(sql_response === 0) {
                return BadRequest(res, 'Удаляемый объект не найден')
            }
            OKResponse(res, 'Объект удален')
        } catch(e) {
            console.log(e)
            IntServErr(res)
        }
    }
}

export default new BrandsController()