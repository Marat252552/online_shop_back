"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const GetTypesRouter = () => {
    let router = express_1.default.Router();
    router.post('/find', controller_1.default.getTypes);
    router.post('/', controller_1.default.createType);
    router.delete('/:id', controller_1.default.deleteType);
    return router;
};
exports.default = GetTypesRouter;
