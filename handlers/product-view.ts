import { recordAbuse } from "@cityssm/express-abuse-points";
import * as configFunctions from "../helpers/configFunctions.js";

import type { RequestHandler } from "express";


export const handler: RequestHandler = (request, response) => {

  const productSKU = request.params.productSKU;
  const product = configFunctions.getProperty("products")[productSKU];

  if (!product) {
    recordAbuse(request);
    response.status(404);
    return response.render("product-notFound");
  }

  return response.render("product-view", {
    pageTitle: product.productName,
    productSKU,
    product
  });
};
