"use strict";
const express_1 = require("express");
const order_error_1 = require("../handlers/order-error");
const order_expired_1 = require("../handlers/order-expired");
const order_receipt_1 = require("../handlers/order-receipt");
const router = express_1.Router();
router.get("/error", order_error_1.handler);
router.get("/expired", order_expired_1.handler);
router.get("/:orderNumber/:orderSecret", order_receipt_1.handler);
module.exports = router;
//# sourceMappingURL=order.js.map