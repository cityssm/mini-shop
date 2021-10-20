import { getOrder as miniShopDB_getOrder } from "@cityssm/mini-shop-db";

import * as configFunctions from "../helpers/configFunctions.js";

import type { RequestHandler } from "express";


export const handler: RequestHandler = async (request, response) => {

  const orderNumber: string = request.body.orderNumber;
  const orderSecret: string = request.body.orderSecret;

  const order = await miniShopDB_getOrder(orderNumber, orderSecret, false);

  if (!order) {
    return response.render("toPayment-expired");
  }

  const storeType = configFunctions.getProperty("store.storeType");



  return response.render("toPayment", {
    order
  });
};
