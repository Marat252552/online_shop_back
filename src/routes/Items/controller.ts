import { Brand, Item, Type } from "../../db/models";
import { createItemReq_T, deleteItemReq_T, getItemReq_T, getItemsReq_T } from "./types";
import {v4} from 'uuid'
import path from 'path'
import { Item_T } from "../../shared/types";
import { Op, where } from "sequelize";

class ItemsController {
    async getItems(req: getItemsReq_T, res: any) {
        try {
            let {brandId, typeId, limit, offset, searchValue} = req.body
            let items = {}
            let itemsAmount
            if(searchValue !== '') {
                if(brandId != 0 && typeId != 0) {
                    items = await Item.findAll({limit, offset, where: {brandId, typeId, name: {[Op.substring]: [searchValue]}}, include: [{model: Brand, as: 'brand'}, {model: Type, as: 'type'}]}) as any
                    itemsAmount = await Item.count({where: {brandId, typeId, name: {[Op.substring]: [searchValue]}}})
                } 
                if(brandId != 0 && typeId == 0) {
                    items = await Item.findAll({where: {brandId, name: {[Op.substring]: [searchValue]}}, limit, offset, include: [{model: Brand, as: 'brand'}, {model: Type, as: 'type'}]}) as any
                    itemsAmount = await Item.count({where: {brandId, name: {[Op.substring]: [searchValue]}}})
                }
                if(brandId == 0 && typeId != 0) {
                    items = await Item.findAll({where: {typeId, name: {[Op.substring]: [searchValue]}}, limit, offset, include: [{model: Brand, as: 'brand'}, {model: Type, as: 'type'}]}) as any
                    itemsAmount = await Item.count({where: {typeId, name: {[Op.substring]: [searchValue]}}})
                }
                if(brandId == 0 && typeId == 0) {
                    items = await Item.findAll({where: {name: {[Op.substring]: [searchValue]}}, offset, limit, include: [{model: Brand, as: 'brand'}, {model: Type, as: 'type'}]}) as any
                    itemsAmount = await Item.count({where: {name: {[Op.substring]: [searchValue]}}})
                }
            } else {
                if(brandId != 0 && typeId != 0) {
                    items = await Item.findAll({limit, offset, where: {brandId, typeId}, include: [{model: Brand, as: 'brand'}, {model: Type, as: 'type'}]}) as any
                    itemsAmount = await Item.count({where: {brandId, typeId}})
                } 
                if(brandId != 0 && typeId == 0) {
                    items = await Item.findAll({where: {brandId}, limit, offset, include: [{model: Brand, as: 'brand'}, {model: Type, as: 'type'}]}) as any
                    itemsAmount = await Item.count({where: {brandId}})
                }
                if(brandId == 0 && typeId != 0) {
                    items = await Item.findAll({where: {typeId}, limit, offset, include: [{model: Brand, as: 'brand'}, {model: Type, as: 'type'}]}) as any
                    itemsAmount = await Item.count({where: {typeId}})
                }
                if(brandId == 0 && typeId == 0) {
                    items = await Item.findAll({offset, limit, include: [{model: Brand, as: 'brand'}, {model: Type, as: 'type'}]}) as any
                    itemsAmount = await Item.count()
                }
            }
            res
                .json({items, itemsAmount})
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
            let {name, price, brandId, typeId, description} = req.body
            let rating = 0
            let {img} = req.files
            if(!name || !price || !img || !brandId || !typeId || !description) {
                return res.status(400).json({message: 'Не все поля заполнены'}).end()
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
                .status(201)
                .json(item)
                .end()
        } catch(e) {
            console.log(e)
            res.status(400).json({message: 'Произошла непредвиденная ошибка'}).end()
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
    async deleteItem(req: deleteItemReq_T, res: any) {
        try {
            let {id} = req.params
            await Item.destroy({where: {id}})
            res
                .sendStatus(200)
                .end()
        } catch(e) {
            console.log(e)
            res.sendStatus(400).end()
        }
    }
}

export default new ItemsController()