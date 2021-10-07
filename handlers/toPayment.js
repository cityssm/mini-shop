import { getOrder as miniShopDB_getOrder } from "@cityssm/mini-shop-db/getOrder.js";
export const handler = async (request, response) => {
    const orderNumber = request.body.orderNumber;
    const orderSecret = request.body.orderSecret;
    const order = await miniShopDB_getOrder(orderNumber, orderSecret, false);
    return !order
        ? response.render("toPayment-expired")
        : response.render("toPayment", {
            order
        });
};
