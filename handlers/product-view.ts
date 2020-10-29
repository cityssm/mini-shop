import type { RequestHandler } from "express";

import * as configFns from "../helpers/configFns";


export const handler: RequestHandler = (req, res) => {

  const productSKU = req.params.productSKU;

  if (!configFns.getProperty("products")[productSKU]) {

    res.status(404);

    return res.render("product-notFound");
  }

  return res.render("product-view", {
    productSKU
  });
};
