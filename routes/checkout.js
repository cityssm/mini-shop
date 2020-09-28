"use strict";
const express_1 = require("express");
const checkout_1 = require("../handlers/checkout");
const getProductDetails_1 = require("../handlers/getProductDetails");
const createOrder_1 = require("../handlers/createOrder");
const toPayment_1 = require("../handlers/toPayment");
const fromPayment_1 = require("../handlers/fromPayment");
const router = express_1.Router();
router.get("/", checkout_1.handler);
router.post("/doGetProductDetails", getProductDetails_1.handler);
router.post("/doCreateOrder", createOrder_1.handler);
router.post("/toPayment", toPayment_1.handler);
router.all("/fromPayment", fromPayment_1.handler);
module.exports = router;
//# sourceMappingURL=checkout.js.map