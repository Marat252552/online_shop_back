"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const GetBrandsRouter = () => {
    let router = express_1.default.Router();
    router.post('/', controller_1.default.createBrand);
    router.get('/:id', controller_1.default.getBrand);
    router.get('/', controller_1.default.getBrands);
    return router;
};
exports.default = GetBrandsRouter;
