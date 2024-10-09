import { recordAbuse } from '@cityssm/express-abuse-points';
import { getOrder as miniShopDB_getOrder } from '@cityssm/mini-shop-db';
import * as configFunctions from '../helpers/configFunctions.js';
export default async function handler(request, response) {
    const orderNumber = request.params.orderNumber;
    const orderSecret = request.params.orderSecret;
    const order = await miniShopDB_getOrder(orderNumber, orderSecret, true);
    if (order) {
        order.redirectURL && order.redirectURL !== ''
            ? response.redirect(order.redirectURL + '/' + orderNumber + '/' + orderSecret)
            : response.render('order', {
                pageTitle: 'Order ' + orderNumber,
                order
            });
    }
    else {
        recordAbuse(request);
        response.redirect(configFunctions.getProperty('reverseProxy.urlPrefix') + '/order/expired');
    }
}
