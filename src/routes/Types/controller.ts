import { Type } from "../../db/models"
import { createTypeReq_T } from "./types"



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
}

export default new TypesController()