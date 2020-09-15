import type { RequestHandler } from "express";


export const handler: RequestHandler = (req, res) => {

  const productSKU = req.params.productSKU;

  return res.render("product-view", {
    productSKU
  });
};
