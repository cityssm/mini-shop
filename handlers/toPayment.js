import { getOrder as miniShopDB_getOrder } from "@cityssm/mini-shop-db/getOrder.js";
export const handler = async (req, res) => {
    const orderNumber = req.body.orderNumber;
    const orderSecret = req.body.orderSecret;
    const order = await miniShopDB_getOrder(orderNumber, orderSecret, false);
    if (!order) {
        return res.render("toPayment-expired");
    }
    else {
        return res.render("toPayment", {
            order
        });
    }
};
