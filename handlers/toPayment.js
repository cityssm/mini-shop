"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const getOrder_1 = require("@cityssm/mini-shop-db/getOrder");
const handler = async (req, res) => {
    const orderNumber = req.body.orderNumber;
    const orderSecret = req.body.orderSecret;
    const order = await getOrder_1.getOrder(orderNumber, orderSecret, false);
    if (!order) {
        return res.render("toPayment-expired");
    }
    else {
        return res.render("toPayment", {
            order
        });
    }
};
exports.handler = handler;
