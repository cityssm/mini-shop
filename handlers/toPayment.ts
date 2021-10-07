import { getOrder as miniShopDB_getOrder } from "@cityssm/mini-shop-db/getOrder.js";

import type { RequestHandler } from "express";


export const handler: RequestHandler = async (request, response) => {

  const orderNumber: string = request.body.orderNumber;
  const orderSecret: string = request.body.orderSecret;

  const order = await miniShopDB_getOrder(orderNumber, orderSecret, false);

  return !order
    ? response.render("toPayment-expired")
    : response.render("toPayment", {
      order
    });
};
