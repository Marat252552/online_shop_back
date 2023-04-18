"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const GetAdminRouter = () => {
    let router = express_1.default.Router();
    router.get('/users', controller_1.default.getUsers);
    return router;
};
exports.default = GetAdminRouter;
