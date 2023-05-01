"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const ManagerMiddleware_1 = __importDefault(require("../Middleware/ManagerMiddleware"));
let verification = ManagerMiddleware_1.default.verification;
const GetBrandsRouter = () => {
    let router = express_1.default.Router();
    router.post('/', verification, controller_1.default.createBrand);
    router.get('/:id', controller_1.default.getBrand);
    router.post('/find', controller_1.default.getBrands);
    router.delete('/:id', verification, controller_1.default.deleteBrand);
    return router;
};
exports.default = GetBrandsRouter;
