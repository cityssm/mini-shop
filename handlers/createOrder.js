import { createOrder as miniShopDB_createOrder } from '@cityssm/mini-shop-db';
import { captchaIsMatch, purgeCaptcha } from '../helpers/captchaFunctions.js';
import * as configFunctions from '../helpers/configFunctions.js';
export default async function handler(request, response) {
    if (configFunctions.getProperty('settings.checkout_includeCaptcha')) {
        const captchaKey = request.body.captchaKey;
        const captchaText = request.body.captchaText;
        if (!captchaIsMatch(captchaKey, captchaText)) {
            response.json({
                success: false,
                message: 'Image text does not match.'
            });
            return;
        }
    }
    const formData = request.body;
    const orderIDs = await miniShopDB_createOrder(formData);
    if (configFunctions.getProperty('settings.checkout_includeCaptcha') &&
        orderIDs.success) {
        purgeCaptcha(request.body.captchaKey);
    }
    response.json(orderIDs);
}
