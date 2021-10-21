import { getOrder as miniShopDB_getOrder } from "@cityssm/mini-shop-db";
import * as configFunctions from "../helpers/configFunctions.js";
export const handler = async (request, response) => {
    const orderNumber = request.body.orderNumber;
    const orderSecret = request.body.orderSecret;
    const order = await miniShopDB_getOrder(orderNumber, orderSecret, false);
    if (!order) {
        return response.render("toPayment-expired");
    }
    const storeType = configFunctions.getProperty("store.storeType");
    const toPaymentObject = {
        order
    };
    if (storeType === "moneris-checkout") {
        const monerisCheckout = await import("../helpers/stores/moneris-checkout.js");
        const ticket = await monerisCheckout.preloadRequest(order);
        if (ticket) {
            toPaymentObject.ticket = ticket;
        }
    }
    return response.render("toPayment", toPaymentObject);
};
