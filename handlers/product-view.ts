import { recordAbuse } from "@cityssm/express-abuse-points";
import * as configFns from "../helpers/configFns.js";

import type { RequestHandler } from "express";


export const handler: RequestHandler = (req, res) => {

  const productSKU = req.params.productSKU;
  const product = configFns.getProperty("products")[productSKU];

  if (!product) {
    recordAbuse(req);
    res.status(404);
    return res.render("product-notFound");
  }

  return res.render("product-view", {
    pageTitle: product.productName,
    productSKU,
    product
  });
};
