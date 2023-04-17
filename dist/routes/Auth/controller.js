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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateTokens = (id, login, role, basketId) => {
    let A_key = process.env.JWT_ACCESS_KEY;
    let R_key = process.env.JWT_REFRESH_KEY;
    let AccessToken = jsonwebtoken_1.default.sign({ id, login, role, basketId }, A_key);
    let RefreshToken = jsonwebtoken_1.default.sign({ id, login, role, basketId }, R_key);
    return { AccessToken, RefreshToken };
};
class AuthController {
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { login, password, remember } = req.body;
                if (!login || !password) {
                    return res.sendStatus(400).end();
                }
                let isLoginDupl = yield models_1.User.findOne({
                    where: { login }
                });
                if (isLoginDupl) {
                    return res.sendStatus(400).end();
                }
                let hashedPassword = bcrypt_1.default.hashSync(password, 7);
                let sqlUser = yield models_1.User.create({
                    login, password: hashedPassword
                });
                let basket = yield models_1.Basket.create({
                    userId: sqlUser.id
                });
                let userANDbasket = yield models_1.User.findOne({
                    where: { id: sqlUser.id },
                    include: [{ model: models_1.Basket, as: 'basket' }]
                });
                let { AccessToken, RefreshToken } = generateTokens(sqlUser.id, sqlUser.login, sqlUser.role, basket.id);
                let RD_User = {
                    id: userANDbasket.id,
                    login: userANDbasket.login,
                    role: userANDbasket.role,
                    basket: {
                        id: userANDbasket.basket.id
                    }
                };
                if (remember) {
                    return res
                        .cookie('RefreshToken', RefreshToken, { maxAge: 1000 * 60 * 30 })
                        .status(201)
                        .json({
                        user: RD_User,
                        AccessToken
                    }).end();
                }
                else {
                    return res.status(201).json({
                        user: RD_User,
                        AccessToken
                    }).end();
                }
            }
            catch (e) {
                console.log(e);
                res.sendStatus(400).end();
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { login, password } = req.body;
                let sqlUser = yield models_1.User.findOne({
                    where: { login },
                    include: [{ model: models_1.Basket, as: 'basket' }]
                });
                if (!sqlUser) {
                    return res.sendStatus(400).end();
                }
                let isPasswordValid = bcrypt_1.default.compareSync(password, sqlUser.password);
                if (!isPasswordValid) {
                    return res.sendStatus(400).end();
                }
                let { AccessToken, RefreshToken } = generateTokens(sqlUser.id, sqlUser.login, sqlUser.role, sqlUser.basket.id);
                let RD_User = {
                    id: sqlUser.id,
                    login: sqlUser.login,
                    role: sqlUser.role,
                    basket: {
                        id: sqlUser.basket.id
                    }
                };
                if (req.body.remember) {
                    return res
                        .cookie('RefreshToken', RefreshToken, { maxAge: 1000 * 60 * 30 })
                        .status(200)
                        .json({
                        user: RD_User,
                        AccessToken
                    })
                        .end();
                }
                else {
                    return res
                        .status(200)
                        .json({
                        user: RD_User,
                        AccessToken
                    })
                        .end();
                }
            }
            catch (e) {
                console.log(e);
                res.sendStatus(400).end();
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie('RefreshToken').status(200).end();
            }
            catch (e) {
                console.log(e);
                res.sendStatus(400).end();
            }
        });
    }
    refresh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let OldRefreshToken = req.headers.cookie.split('=')[1];
                let isTokenValid = jsonwebtoken_1.default.verify(OldRefreshToken, process.env.JWT_REFRESH_KEY);
                if (!isTokenValid) {
                    return res.sendStatus(400).end();
                }
                let decodedToken = jsonwebtoken_1.default.decode(OldRefreshToken);
                let user = yield models_1.User.findOne({
                    where: { id: decodedToken.id },
                    include: [{ model: models_1.Basket, as: 'basket' }]
                });
                let { AccessToken, RefreshToken } = generateTokens(user.id, user.login, user.role, user.basket.id);
                res
                    .cookie('RefreshToken', RefreshToken, { maxAge: 1000 * 60 * 30 })
                    .json({
                    user,
                    AccessToken
                })
                    .status(200)
                    .end();
            }
            catch (e) {
                console.log(e);
                res.sendStatus(400).end();
            }
        });
    }
    logged(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let AccessToken = req.headers.authorization.split(' ')[1];
                if (!AccessToken) {
                    return res.sendStatus(401).end();
                }
                let IsTokenValid = jsonwebtoken_1.default.verify(AccessToken, process.env.JWT_ACCESS_KEY);
                if (!IsTokenValid) {
                    return res.sendStatus(401).end();
                }
                let decodedToken = jsonwebtoken_1.default.decode(AccessToken);
                let sqlUser = yield models_1.User.findOne({
                    where: { id: decodedToken.id },
                    include: [{ model: models_1.Basket, as: 'basket' }]
                });
                let RD_User = {
                    id: sqlUser.id,
                    login: sqlUser.login,
                    role: sqlUser.role,
                    basket: {
                        id: sqlUser.basket.id
                    }
                };
                res
                    .json({
                    user: RD_User
                })
                    .status(200).end();
            }
            catch (e) {
                console.log(e);
                res.sendStatus(401).end();
            }
        });
    }
}
exports.default = new AuthController();
