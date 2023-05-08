"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const UserMiddleware_1 = __importDefault(require("../Middleware/UserMiddleware"));
let verification = UserMiddleware_1.default.verification;
const GetBasketRouter = () => {
    let router = express_1.default.Router();
    router.get('/', verification, controller_1.default.getBasketItems);
    return router;
};
exports.default = GetBasketRouter;
