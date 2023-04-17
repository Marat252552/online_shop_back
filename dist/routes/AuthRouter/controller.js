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
class AuthController {
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { login, password } = req.body;
                if (!login || !password) {
                    return res.sendStatus(400).end();
                }
                let user = yield models_1.User.create({
                    login, password
                });
                let basket = yield models_1.Basket.create({
                    userId: user.id
                });
                let user2 = yield models_1.User.findOne({
                    where: { id: user.id },
                    include: [{ model: models_1.Basket, as: 'basket' }]
                });
                res.status(201).json(user2).end();
            }
            catch (e) {
                console.log(e);
                res.sendStatus(400).end();
            }
        });
    }
}
exports.default = new AuthController();
