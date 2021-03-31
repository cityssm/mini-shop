"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const createOrder_1 = require("@cityssm/mini-shop-db/createOrder");
const handler = async (req, res) => {
    const formData = req.body;
    const orderIDs = await createOrder_1.createOrder(formData);
    return res.json(orderIDs);
};
exports.handler = handler;
