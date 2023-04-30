"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const GetAuthRouter = () => {
    const router = express_1.default.Router();
    router.post('/signin', controller_1.default.signin);
    router.post('/login', controller_1.default.login);
    router.get('/refresh', controller_1.default.refresh);
    router.get('/logged', controller_1.default.logged);
    router.get('/isdupl', controller_1.default.isDupl);
    router.delete('/logout', controller_1.default.logout);
    return router;
};
exports.default = GetAuthRouter;
