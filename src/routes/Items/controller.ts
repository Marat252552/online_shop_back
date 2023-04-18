import { Brand, Item, Type } from "../../db/models";
import { createItemReq_T, getItemReq_T, getItemsReq_T } from "./types";
import {v4} from 'uuid'
import path from 'path'
import { Item_T } from "../../shared/types";


class ItemsController {
    async getItems(req: getItemsReq_T, res: any) {
        try {
            let {brandId, typeId, limit, offset} = req.query
            if(!offset || !limit) {
                return res.sendStatus(400).end()
            }
            let items = {}
            if(brandId && typeId) {
                items = await Item.findAll({limit, offset, where: {brandId, typeId}, include: [{model: Brand, as: 'brand'}, {model: Type, as: 'type'}]}) as any
            } 
            if(brandId && !typeId) {
                items = await Item.findAll({where: {brandId}, limit, offset, include: [{model: Brand, as: 'brand'}, {model: Type, as: 'type'}]}) as any
            }
            if(!brandId && typeId) {
                items = await Item.findAll({where: {typeId}, limit, offset, include: [{model: Brand, as: 'brand'}, {model: Type, as: 'type'}]}) as any
            }
            if(!brandId && !typeId) {
                items = await Item.findAll({limit, offset, include: [{model: Brand, as: 'brand'}, {model: Type, as: 'type'}]}) as any
            }
            res
                .json({items})
                .status(200)
                .end()
        } catch(e) {
            console.log(e)
            res.sendStatus(400).end()
        }
        // try {
        //     let {brandId,limit,offset,typeId} = req.query
        //     if(!brandId || !limit || !offset|| !typeId) {
        //         return res.sendStatus(400).end()
        //     }
        //     let items
        //     if(brandId === 'ANY' && typeId === 'ANY') {
        //         items = await Item.findAll({
        //             offset,
        //             limit
        //         })
        //     }
        //     if(brandId === 'ANY') {
        //         items = await Item.findAll({
        //             where: {typeId},
        //             offset,
        //             limit
        //         })
        //     }
        //     if(typeId === 'ANY') {
        //         items = await Item.findAll({
        //             where: {brandId},
        //             offset,
        //             limit
        //         })
        //     }
        //     if(typeId !== 'ANY' && brandId !== 'ANY') {
        //         items = await Item.findAll({
        //             where: {brandId, typeId},
        //             offset,
        //             limit
        //         })
        //     }
        //     res.json({items}).status(200).end()
        // } catch(e) {
        //     console.log(e)
        //     res.sendStatus(400).end()
        // }
    }
    async createItem(req: createItemReq_T, res: any) {
        try {
            let {name, price, rating, brandId, typeId, description} = req.body
            let {img} = req.files
            if(!name || !price || !rating || !img || !brandId || !typeId || !description) {
                return res.sendStatus(400).end()
            }
            let imgName = v4() + '.jpg'
            img.mv(path.resolve(__dirname, './../../', 'static', imgName))
            let item = await Item.create({
                name,
                price,
                rating,
                imgName,
                brandId,
                typeId,
                description
            })
            res
                .json(item)
                .status(201)
                .end()
        } catch(e) {
            console.log(e)
            res.sendStatus(400).end()
        }
    }
    async getItem(req: getItemReq_T, res: any) {
        try {
            let {id} = req.params
            let item = await Item.findOne({
                where: {id}
            })
            res
                .json({item})
                .status(200)
                .end()
        } catch(e) {
            console.log(e)
            res.sendStatus(400).end()
        }
    }
}

export default new ItemsController()