"use strict";
const express_1 = require("express");
const products_1 = require("../handlers/products");
const product_view_1 = require("../handlers/product-view");
const router = express_1.Router();
router.get("/", products_1.handler);
router.get("/:productSKU", product_view_1.handler);
module.exports = router;
