"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_abuse_points_1 = require("@cityssm/express-abuse-points");
const configFns = require("../helpers/configFns");
const getOrder_1 = require("@cityssm/mini-shop-db/getOrder");
const handler = async (req, res) => {
    const orderNumber = req.params.orderNumber;
    const orderSecret = req.params.orderSecret;
    const order = await getOrder_1.getOrder(orderNumber, orderSecret, true);
    if (order) {
        if (order.redirectURL && order.redirectURL !== "") {
            return res.redirect(order.redirectURL + "/" + orderNumber + "/" + orderSecret);
        }
        else {
            return res.render("order", {
                pageTitle: "Order " + orderNumber,
                order
            });
        }
    }
    else {
        express_abuse_points_1.recordAbuse(req);
        return res.redirect(configFns.getProperty("reverseProxy.urlPrefix") + "/order/expired");
    }
};
exports.handler = handler;
