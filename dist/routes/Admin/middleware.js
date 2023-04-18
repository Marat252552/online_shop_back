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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class MiddleWare {
    verification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let AccessToken = req.headers.authorization.split(' ')[1];
                let isTokenValid = jsonwebtoken_1.default.verify(AccessToken, process.env.JWT_ACCESS_KEY);
                if (!isTokenValid) {
                    return res.sendStatus(401).end();
                }
                let decodedToken = jsonwebtoken_1.default.decode(AccessToken);
                if (decodedToken.role !== 'ADMIN') {
                    return res.sendStatus(403).end();
                }
                next();
            }
            catch (e) {
                console.log(e);
                res.sendStatus(401).end();
            }
        });
    }
}
exports.default = new MiddleWare();
