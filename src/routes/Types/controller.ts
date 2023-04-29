import { Type } from "../../db/models"
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
            let {offset, limit} = req.query
            let types = await Type.findAll({
                offset,
                limit
            })
            let typesAmount = await Type.count()
            res
                .json({types, typesAmount})
                .status(200)
                .end()
        } catch(e) {
            console.log(e)
            res.sendStatus(400).end()
        }
    }
}

export default new TypesController()