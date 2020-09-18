import type { RequestHandler } from "express";

import * as configFns from "../helpers/configFns";


export const handler: RequestHandler = (req, res) => {

  const productSKUs = (req.body.productSKUs as string).split(",");

  const products = {};
  const fees = {};

  for (const productSKU of productSKUs) {

    const product = configFns.getClientSideProduct(productSKU);

    if (product) {

      products[productSKU] = product;

      if (product.fees) {

        product.feeTotals = {};

        for (const feeName of product.fees) {

          const fee = configFns.getProperty("fees")[feeName];

          if (fee) {
            product.feeTotals[feeName] = fee.feeCalculation(product);
            fees[feeName] = fee;
          } else {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete products[productSKU];
            break;
          }
        }
      }
    }
  }

  return res.json({
    products,
    fees
  });
};
