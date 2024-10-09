import { getOrder as miniShopDB_getOrder } from '@cityssm/mini-shop-db';
import { getProperty } from '../helpers/configFunctions.js';
import { preferredLanguageCookieKey } from '../helpers/translationHelpers.js';
export default async function handler(request, response) {
    const orderNumber = request.body.orderNumber;
    const orderSecret = request.body.orderSecret;
    const order = await miniShopDB_getOrder(orderNumber, orderSecret, false);
    if (!order) {
        response.render('toPayment-expired');
        return;
    }
    const storeType = getProperty('store.storeType');
    const preferredLanguage = (request.cookies[preferredLanguageCookieKey] ??
        'en');
    const toPaymentObject = {
        order
    };
    if (storeType === 'moneris-checkout') {
        const monerisCheckout = await import('../helpers/stores/moneris-checkout.js');
        const ticket = await monerisCheckout.preloadRequest(order, preferredLanguage);
        if (ticket) {
            toPaymentObject.ticket = ticket;
        }
        else {
            response.redirect(getProperty('reverseProxy.urlPrefix') + '/order/error');
            return;
        }
    }
    response.render('toPayment', toPaymentObject);
}
