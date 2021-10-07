import { Router } from "express";
import { handler as handler_orderError } from "../handlers/order-error.js";
import { handler as handler_orderExpired } from "../handlers/order-expired.js";
import { handler as handler_orderReceipt } from "../handlers/order-receipt.js";
export const router = Router();
router.get("/error", handler_orderError);
router.get("/expired", handler_orderExpired);
router.get("/:orderNumber/:orderSecret", handler_orderReceipt);
export default router;
