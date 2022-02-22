import { captchaIsMatch, purgeCaptcha } from "../helpers/captchaFunctions.js";
import { createOrder as miniShopDB_createOrder } from "@cityssm/mini-shop-db";
export const handler = async (request, response) => {
    const captchaKey = request.body.captchaKey;
    const captchaText = request.body.captchaText;
    if (!captchaIsMatch(captchaKey, captchaText)) {
        return response.json({
            success: false,
            message: "Image text does not match."
        });
    }
    const formData = request.body;
    const orderIDs = await miniShopDB_createOrder(formData);
    if (orderIDs.success) {
        purgeCaptcha(captchaKey);
    }
    return response.json(orderIDs);
};
