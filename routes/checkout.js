"use strict";
const express_1 = require("express");
const checkout_1 = require("../handlers/checkout");
const getProductDetails_1 = require("../handlers/getProductDetails");
const router = express_1.Router();
router.get("/", checkout_1.handler);
router.post("/doGetProductDetails", getProductDetails_1.handler);
module.exports = router;
