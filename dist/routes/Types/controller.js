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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const models_1 = require("../../db/models");
const response_1 = require("../Response/response");
class TypesController {
    createType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name } = req.body;
                if (!name) {
                    return res.sendStatus(400).end();
                }
                let type = yield models_1.Type.create({
                    name
                });
                res
                    .json({ type })
                    .status(201)
                    .end();
            }
            catch (e) {
                console.log(e);
                res.sendStatus(400).end();
            }
        });
    }
    getTypes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { offset, limit, searchValue } = req.body;
                if (offset === undefined || limit === undefined || searchValue === undefined) {
                    return (0, response_1.BadRequest)(res, 'Неполный запрос');
                }
                let types;
                let typesAmount;
                if (searchValue !== '') {
                    types = yield models_1.Type.findAll({
                        offset,
                        limit,
                        where: {
                            name: { [sequelize_1.Op.substring]: searchValue }
                        }
                    });
                    typesAmount = yield models_1.Type.count({
                        where: {
                            name: { [sequelize_1.Op.substring]: searchValue }
                        }
                    });
                }
                else {
                    types = yield models_1.Type.findAll({
                        offset,
                        limit
                    });
                    typesAmount = yield models_1.Type.count({});
                }
                res
                    .json({ types, typesAmount })
                    .status(200)
                    .end();
            }
            catch (e) {
                console.log(e);
                (0, response_1.IntServErr)(res);
            }
        });
    }
    deleteType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.params;
                let sql_response = yield models_1.Type.destroy({ where: { id } });
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
exports.default = new TypesController();
