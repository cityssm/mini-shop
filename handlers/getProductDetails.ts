import type { RequestHandler } from "express";

import * as configFns from "../helpers/configFns";


export const handler: RequestHandler = (req, res) => {

  const productSKUs = (req.body.productSKUs as string).split(",");

  const products = {};
  const fees = {};

  for (const productSKU of productSKUs) {

    /*
     * Validate the product SKU
     */

    const product = configFns.getClientSideProduct(productSKU);

    // If product not available, don't add it to the list.
    if (!product) {
      continue;
    }

    /*
     * Calculate fees
     */

    let addProductToObject = true;
    product.feeTotals = {};

    for (const feeName of product.fees) {

      const fee = configFns.getProperty("fees")[feeName];

      if (fee) {
        product.feeTotals[feeName] = fee.feeCalculation(product);
        fees[feeName] = fee;
      } else {
        addProductToObject = false;
        break;
      }
    }

    // Add valid product to list.
    if (addProductToObject) {
      products[productSKU] = product;
    }
  }

  return res.json({
    products,
    fees
  });
};
