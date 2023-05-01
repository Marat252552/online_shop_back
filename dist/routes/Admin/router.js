"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const AdminMiddleware_1 = __importDefault(require("../Middleware/AdminMiddleware"));
const GetAdminRouter = () => {
    let router = express_1.default.Router();
    router.post('/users', controller_1.default.getUsers);
    router.put('/users', AdminMiddleware_1.default.verification, controller_1.default.changeRole);
    return router;
};
exports.default = GetAdminRouter;
