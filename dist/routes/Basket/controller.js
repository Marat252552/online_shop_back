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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../db/models");
const response_1 = require("../Response/response");
class BasketController {
    getBasketItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { basketId } = res.locals.user;
                let basket = yield models_1.Basket.findOne({
                    where: { id: basketId },
                    include: [{ model: models_1.BasketDevice, as: 'basket_devices' }]
                });
                res.status(200).json({ basket }).end();
            }
            catch (e) {
                console.log(e);
                (0, response_1.IntServErr)(res);
            }
        });
    }
}
exports.default = new BasketController();
