"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../db/models");
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const response_1 = require("../Response/response");
class ItemsController {
    getItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { brandTags, typeTags, limit, offset, searchValue } = req.body;
                let items = {};
                let itemsAmount;
                if (searchValue !== '') {
                    if (brandTags[0] !== undefined && typeTags[0] != undefined) {
                        items = (yield models_1.Item.findAll({ limit, offset, where: { brandId: brandTags, typeId: typeTags, name: { [sequelize_1.Op.substring]: [searchValue] } }, include: [{ model: models_1.Brand, as: 'brand' }, { model: models_1.Type, as: 'type' }] }));
                        itemsAmount = yield models_1.Item.count({ where: { brandId: brandTags, typeId: typeTags, name: { [sequelize_1.Op.substring]: [searchValue] } } });
                    }
                    if (brandTags[0] !== undefined && typeTags[0] === undefined) {
                        items = (yield models_1.Item.findAll({ where: { brandId: brandTags, name: { [sequelize_1.Op.substring]: [searchValue] } }, limit, offset, include: [{ model: models_1.Brand, as: 'brand' }, { model: models_1.Type, as: 'type' }] }));
                        itemsAmount = yield models_1.Item.count({ where: { brandId: brandTags, name: { [sequelize_1.Op.substring]: [searchValue] } } });
                    }
                    if (brandTags[0] === undefined && typeTags[0] !== undefined) {
                        items = (yield models_1.Item.findAll({ where: { typeId: typeTags, name: { [sequelize_1.Op.substring]: [searchValue] } }, limit, offset, include: [{ model: models_1.Brand, as: 'brand' }, { model: models_1.Type, as: 'type' }] }));
                        itemsAmount = yield models_1.Item.count({ where: { typeId: typeTags, name: { [sequelize_1.Op.substring]: [searchValue] } } });
                    }
                    if (brandTags[0] === undefined && typeTags[0] === undefined) {
                        items = (yield models_1.Item.findAll({ where: { name: { [sequelize_1.Op.substring]: [searchValue] } }, offset, limit, include: [{ model: models_1.Brand, as: 'brand' }, { model: models_1.Type, as: 'type' }] }));
                        itemsAmount = yield models_1.Item.count({ where: { name: { [sequelize_1.Op.substring]: [searchValue] } } });
                    }
                }
                else {
                    if (brandTags[0] !== undefined && typeTags[0] !== undefined) {
                        items = (yield models_1.Item.findAll({ limit, offset, where: { brandId: brandTags, typeId: typeTags }, include: [{ model: models_1.Brand, as: 'brand' }, { model: models_1.Type, as: 'type' }] }));
                        itemsAmount = yield models_1.Item.count({ where: { brandId: brandTags, typeId: typeTags } });
                    }
                    if (brandTags[0] !== undefined && typeTags[0] === undefined) {
                        items = (yield models_1.Item.findAll({ where: { brandId: brandTags }, limit, offset, include: [{ model: models_1.Brand, as: 'brand' }, { model: models_1.Type, as: 'type' }] }));
                        itemsAmount = yield models_1.Item.count({ where: { brandId: brandTags } });
                    }
                    if (brandTags[0] === undefined && typeTags[0] !== undefined) {
                        items = (yield models_1.Item.findAll({ where: { typeId: typeTags }, limit, offset, include: [{ model: models_1.Brand, as: 'brand' }, { model: models_1.Type, as: 'type' }] }));
                        itemsAmount = yield models_1.Item.count({ where: { typeId: typeTags } });
                    }
                    if (brandTags[0] === undefined && typeTags[0] === undefined) {
                        items = (yield models_1.Item.findAll({ offset, limit, include: [{ model: models_1.Brand, as: 'brand' }, { model: models_1.Type, as: 'type' }] }));
                        itemsAmount = yield models_1.Item.count();
                    }
                }
                res
                    .json({ items, itemsAmount })
                    .status(200)
                    .end();
            }
            catch (e) {
                console.log(e);
                res.sendStatus(400).end();
            }
        });
    }
    createItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, price, brandId, typeId, description } = req.body;
                let rating = 0;
                let { img } = req.files;
                if (!name || !price || !img || !brandId || !typeId || !description) {
                    return res.status(400).json({ message: 'Не все поля заполнены' }).end();
                }
                let imgName = (0, uuid_1.v4)() + '.jpg';
                img.mv(path_1.default.resolve(__dirname, './../../', 'static', imgName));
                let item = yield models_1.Item.create({
                    name,
                    price,
                    rating,
                    imgName,
                    brandId,
                    typeId,
                    description
                });
                res
                    .status(201)
                    .json(item)
                    .end();
            }
            catch (e) {
                console.log(e);
                res.status(400).json({ message: 'Произошла непредвиденная ошибка' }).end();
            }
        });
    }
    getItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.params;
                let item = yield models_1.Item.findOne({
                    where: { id }
                });
                res
                    .json({ item })
                    .status(200)
                    .end();
            }
            catch (e) {
                console.log(e);
                res.sendStatus(400).end();
            }
        });
    }
    deleteItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.params;
                yield models_1.Item.destroy({ where: { id } });
                res
                    .sendStatus(200)
                    .end();
            }
            catch (e) {
                console.log(e);
                res.sendStatus(400).end();
            }
        });
    }
    addToBasket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let itemId = req.params.id;
                let { basketId } = res.locals.user;
                yield models_1.BasketDevice.create({
                    basketId,
                    itemId
                });
                let basket = yield models_1.Basket.findOne({
                    where: { id: 5 },
                    include: [{ model: models_1.BasketDevice, as: 'basket_devices' }]
                });
                res.status(200).json({ message: 'Добавлено в корзину', basket });
            }
            catch (e) {
                console.log(e);
                (0, response_1.IntServErr)(res);
            }
        });
    }
}
exports.default = new ItemsController();
