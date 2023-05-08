import { Basket, BasketDevice } from "../../db/models"
import { IntServErr } from "../Response/response"
import { getBasketItemsRes_T } from "./types"

class BasketController {
    async getBasketItems(req: any, res: getBasketItemsRes_T) {
        try {
            let {basketId} = res.locals.user
            let basket = await Basket.findOne({
                where: {id: basketId},
                include: [{model: BasketDevice, as: 'basket_devices'}],
            })
            res.status(200).json({basket}).end()
        } catch(e) {
            console.log(e)
            IntServErr(res)
        }
    }
}

export default new BasketController()