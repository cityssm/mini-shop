import { Router } from "express";

import * as configFunctions from "../helpers/configFunctions.js";

import { handler as handler_products } from "../handlers/products.js";
import { handler as handler_productView } from "../handlers/product-view.js";


export const router = Router();


router.get("/", handler_products);


router.get("/:productSKU", handler_productView);


if (configFunctions.getProperty("productHandlers").includes("ssm-ticket_parking/doIsTagNumberEligible")) {
  const handler_ticket = (await import("../handlers/products/ssm-ticket_parking/doIsTagNumberEligible.js")).handler;
  router.post("/ssm-ticket_parking/doIsTagNumberEligible", handler_ticket);
}


export default router;
