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

  const toPaymentObject: Record<string, unknown> = {
    order
  };

  if (storeType === "moneris-checkout") {

    const monerisCheckout = await import("../helpers/stores/moneris-checkout.js");
    const ticket = await monerisCheckout.preloadRequest(order);

    if (ticket) {
      toPaymentObject.ticket = ticket;
    } else {
      return response.redirect (configFunctions.getProperty("reverseProxy.urlPrefix") + "/order/error");
    }
  }

  return response.render("toPayment", toPaymentObject);
};
