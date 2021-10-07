import { recordAbuse } from "@cityssm/express-abuse-points";
import * as configFunctions from "../helpers/configFunctions.js";

import { getOrder as miniShopDB_getOrder } from "@cityssm/mini-shop-db/getOrder.js";

import type { RequestHandler } from "express";


export const handler: RequestHandler = async (request, response) => {

  const orderNumber = request.params.orderNumber;
  const orderSecret = request.params.orderSecret;

  const order = await miniShopDB_getOrder(orderNumber, orderSecret, true);

  if (order) {
    return order.redirectURL && order.redirectURL !== ""
      ? response.redirect(order.redirectURL + "/" + orderNumber + "/" + orderSecret)
      : response.render("order", {
        pageTitle: "Order " + orderNumber,
        order
      });
  } else {
    recordAbuse(request);
    return response.redirect(configFunctions.getProperty("reverseProxy.urlPrefix") + "/order/expired");
  }
};
