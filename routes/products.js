import { Router } from "express";
import { handler as handler_products } from "../handlers/products.js";
import { handler as handler_productView } from "../handlers/product-view.js";
export const router = Router();
router.get("/", handler_products);
router.get("/:productSKU", handler_productView);
export default router;
