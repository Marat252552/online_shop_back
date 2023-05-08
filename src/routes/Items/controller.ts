import { Basket, BasketDevice, Brand, Item, Type, User } from "../../db/models";
import { addToBasketReq_T, createItemReq_T, deleteItemReq_T, getItemReq_T, getItemsReq_T } from "./types";
import {v4} from 'uuid'
import path from 'path'
import { Item_T } from "../../shared/types";
import { Op, where } from "sequelize";
import { IntServErr, OKResponse } from "../Response/response";

class ItemsController {
    async getItems(req: getItemsReq_T, res: any) {
        try {
            let {brandTags, typeTags, limit, offset, searchValue} = req.body
            let items = {}
            let itemsAmount
            if(searchValue !== '') {
                if(brandTags[0] !== undefined && typeTags[0] != undefined) {
                    items = await Item.findAll({limit, offset, where: {brandId: brandTags, typeId: typeTags, name: {[Op.substring]: [searchValue]}}, include: [{model: Brand, as: 'brand'}, {model: Type, as: 'type'}]}) as any
                    itemsAmount = await Item.count({where: {brandId: brandTags, typeId: typeTags, name: {[Op.substring]: [searchValue]}}})
                }
                if(brandTags[0] !== undefined && typeTags[0] === undefined) {
                    items = await Item.findAll({where: {brandId: brandTags, name: {[Op.substring]: [searchValue]}}, limit, offset, include: [{model: Brand, as: 'brand'}, {model: Type, as: 'type'}]}) as any
                    itemsAmount = await Item.count({where: {brandId: brandTags, name: {[Op.substring]: [searchValue]}}})
                }
                if(brandTags[0] === undefined && typeTags[0] !== undefined) {
                    items = await Item.findAll({where: {typeId: typeTags, name: {[Op.substring]: [searchValue]}}, limit, offset, include: [{model: Brand, as: 'brand'}, {model: Type, as: 'type'}]}) as any
                    itemsAmount = await Item.count({where: {typeId: typeTags, name: {[Op.substring]: [searchValue]}}})
                }
                if(brandTags[0] === undefined && typeTags[0] === undefined) {
                    items = await Item.findAll({where: {name: {[Op.substring]: [searchValue]}}, offset, limit, include: [{model: Brand, as: 'brand'}, {model: Type, as: 'type'}]}) as any
                    itemsAmount = await Item.count({where: {name: {[Op.substring]: [searchValue]}}})
                }
            } else {
                if(brandTags[0] !== undefined && typeTags[0] !== undefined) {
                    items = await Item.findAll({limit, offset, where: {brandId: brandTags, typeId: typeTags}, include: [{model: Brand, as: 'brand'}, {model: Type, as: 'type'}]}) as any
                    itemsAmount = await Item.count({where: {brandId: brandTags, typeId: typeTags}})
                }
                if(brandTags[0] !== undefined && typeTags[0] === undefined) {
                    items = await Item.findAll({where: {brandId: brandTags}, limit, offset, include: [{model: Brand, as: 'brand'}, {model: Type, as: 'type'}]}) as any
                    itemsAmount = await Item.count({where: {brandId: brandTags}})
                }
                if(brandTags[0] === undefined && typeTags[0] !== undefined) {
                    items = await Item.findAll({where: {typeId: typeTags}, limit, offset, include: [{model: Brand, as: 'brand'}, {model: Type, as: 'type'}]}) as any
                    itemsAmount = await Item.count({where: {typeId: typeTags}})
                }
                if(brandTags[0] === undefined && typeTags[0] === undefined) {
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
    async addToBasket(req: addToBasketReq_T, res: any) {
        try {
            let itemId = req.params.id
            let {basketId} = res.locals.user
            await BasketDevice.create({
                basketId,
                itemId
            })
            let basket = await Basket.findOne({
                where: {id: 5},
                include: [{ model: BasketDevice, as: 'basket_devices' }]
            })
            res.status(200).json({message: 'Добавлено в корзину', basket})
        } catch(e) {
            console.log(e)
            IntServErr(res)
        }
    }
}

export default new ItemsController()