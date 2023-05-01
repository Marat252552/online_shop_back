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
class AdminController {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { offset, limit, roles = ['USER', 'MANAGER'], searchValue } = req.body;
                let users;
                let usersAmount;
                if (searchValue !== '') {
                    let sql_response = yield models_1.User.findAll({ where: {
                            role: roles,
                            login: { [sequelize_1.Op.substring]: [searchValue] }
                        }, offset, limit });
                    users = sql_response.map(user => {
                        return user.dataValues;
                    });
                    usersAmount = yield models_1.User.count({
                        where: {
                            role: roles,
                            login: { [sequelize_1.Op.substring]: [searchValue] },
                        },
                    });
                }
                else {
                    let sql_response = yield models_1.User.findAll({ where: {
                            role: roles
                        }, offset, limit });
                    users = sql_response.map(user => {
                        return user.dataValues;
                    });
                    console.log(users);
                    usersAmount = yield models_1.User.count({
                        where: {
                            role: roles
                        }
                    });
                }
                res.json({
                    users,
                    usersAmount
                }).status(200).end();
            }
            catch (e) {
                console.log(e);
                res.sendStatus(400).end();
            }
        });
    }
    changeRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id, newRole } = req.body;
                if (!id || !newRole) {
                    return res.sendStatus(400).end();
                }
                yield models_1.User.update({ role: req.body.newRole }, { where: { id: req.body.id } });
                let user = yield models_1.User.findOne({ where: { id } });
                res.json({ user }).status(200).end();
            }
            catch (e) {
                console.log(e);
                res.sendStatus(400).end();
            }
        });
    }
}
exports.default = new AdminController();
