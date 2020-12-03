import type { RequestHandler } from "express";

import * as configFns from "../helpers/configFns";


export const handler: RequestHandler = (req, res) => {

  const productSKU = req.params.productSKU;
  const product = configFns.getProperty("products")[productSKU];

  if (!product) {
    res.status(404);
    return res.render("product-notFound");
  }

  return res.render("product-view", {
    pageTitle: product.productName,
    productSKU,
    product
  });
};
