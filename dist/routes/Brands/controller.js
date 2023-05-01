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
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const models_1 = require("../../db/models");
const response_1 = require("../Response/response");
const sequelize_1 = require("sequelize");
class BrandsController {
    createBrand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { img } = req.files;
                let { name } = req.body;
                if (!name || !img) {
                    return res.sendStatus(400).end();
                }
                let imgName = (0, uuid_1.v4)() + '.jpg';
                let brand = yield models_1.Brand.create({
                    name,
                    imgName
                });
                img.mv(path_1.default.resolve(__dirname, './../../', 'static', imgName));
                res
                    .json({ brand })
                    .status(201)
                    .end();
            }
            catch (e) {
                console.log(e);
                res.sendStatus(400).end();
            }
        });
    }
    getBrand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.params;
                let brand = yield models_1.Brand.findOne({
                    where: { id },
                    include: [{ model: models_1.Item, as: 'items' }]
                });
                res
                    .json({ brand })
                    .status(200)
                    .end();
            }
            catch (e) {
                console.log(e);
                res.sendStatus(400).end();
            }
        });
    }
    getBrands(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { offset, limit, searchValue } = req.body;
                if (offset === undefined || limit === undefined || searchValue === undefined) {
                    return (0, response_1.BadRequest)(res, 'Неполный запрос');
                }
                let brands;
                let brandsAmount;
                if (searchValue !== '') {
                    brands = yield models_1.Brand.findAll({
                        offset, limit, where: {
                            name: { [sequelize_1.Op.substring]: searchValue }
                        }
                    });
                    brandsAmount = yield models_1.Brand.count({
                        where: {
                            name: { [sequelize_1.Op.substring]: searchValue }
                        }
                    });
                }
                else {
                    brands = yield models_1.Brand.findAll({
                        offset, limit
                    });
                    brandsAmount = yield models_1.Brand.count();
                }
                res
                    .json({ brands, brandsAmount })
                    .status(200)
                    .end();
            }
            catch (e) {
                console.log(e);
                res.sendStatus(400).end();
            }
        });
    }
    deleteBrand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.params;
                let sql_response = yield models_1.Brand.destroy({ where: { id } });
                if (sql_response === 0) {
                    return (0, response_1.BadRequest)(res, 'Удаляемый объект не найден');
                }
                (0, response_1.OKResponse)(res, 'Объект удален');
            }
            catch (e) {
                console.log(e);
                (0, response_1.IntServErr)(res);
            }
        });
    }
}
exports.default = new BrandsController();
