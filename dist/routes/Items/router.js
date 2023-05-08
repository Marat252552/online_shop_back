"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const UserMiddleware_1 = __importDefault(require("../Middleware/UserMiddleware"));
let verification = UserMiddleware_1.default.verification;
const GetItemsRouter = () => {
    const router = express_1.default.Router();
    router.get('/:id', controller_1.default.getItem);
    router.post('/find', controller_1.default.getItems);
    router.post('/:id', verification, controller_1.default.addToBasket);
    router.post('/', controller_1.default.createItem);
    router.delete('/:id', controller_1.default.deleteItem);
    return router;
};
exports.default = GetItemsRouter;
