"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = (_req, res) => {
    return res.render("order-expired", {
        pageTitle: "Order Expired"
    });
};
exports.handler = handler;
