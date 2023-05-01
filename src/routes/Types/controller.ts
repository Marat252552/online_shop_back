import { Op } from "sequelize"
import { Type } from "../../db/models"
import { BadRequest, IntServErr } from "../Response/response"
import { createTypeReq_T, getTypesReq_T } from "./types"



class TypesController {
    async createType(req: createTypeReq_T, res: any) {
        try {
            let {name} = req.body
            if(!name) {
                return res.sendStatus(400).end()
            }
            let type = await Type.create({
                name
            })
            res
                .json({type})
                .status(201)
                .end()
        } catch(e) {
            console.log(e)
            res.sendStatus(400).end()
        }
    }
    async getTypes(req: getTypesReq_T, res: any) {
        try {
            console.log('---------------------wadawdawdaw', req.body)
            let {offset, limit, searchValue} = req.body
            if(offset === undefined || limit === undefined || searchValue === undefined) {
                return BadRequest(res, 'Неполный запрос')
            }
            let types
            let typesAmount
            if(searchValue !== '') {
                types = await Type.findAll({
                    offset,
                    limit,
                    where: {
                        name: {[Op.substring]: searchValue}
                    }
                })
                typesAmount = await Type.count({
                    where: {
                        name: {[Op.substring]: searchValue}
                    }
                })
            } else {
                types = await Type.findAll({
                    offset,
                    limit
                })
                typesAmount = await Type.count({
                })
            }
            res
                .json({types, typesAmount})
                .status(200)
                .end()
        } catch(e) {
            console.log(e)
            IntServErr(res)
        }
    }
}

export default new TypesController()