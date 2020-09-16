"use strict";
const express_1 = require("express");
const checkout_1 = require("../handlers/checkout");
const router = express_1.Router();
router.get("/", checkout_1.handler);
module.exports = router;
