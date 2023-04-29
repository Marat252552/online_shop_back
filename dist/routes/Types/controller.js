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
const models_1 = require("../../db/models");
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
                let { offset, limit } = req.query;
                let types = yield models_1.Type.findAll({
                    offset,
                    limit
                });
                let typesAmount = yield models_1.Type.count();
                res
                    .json({ types, typesAmount })
                    .status(200)
                    .end();
            }
            catch (e) {
                console.log(e);
                res.sendStatus(400).end();
            }
        });
    }
}
exports.default = new TypesController();
