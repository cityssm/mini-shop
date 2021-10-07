import { recordAbuse } from "@cityssm/express-abuse-points";
import * as configFns from "../helpers/configFns.js";

import { getOrder as miniShopDB_getOrder } from "@cityssm/mini-shop-db/getOrder.js";

import type { RequestHandler } from "express";


export const handler: RequestHandler = async (req, res) => {

  const orderNumber = req.params.orderNumber;
  const orderSecret = req.params.orderSecret;

  const order = await miniShopDB_getOrder(orderNumber, orderSecret, true);

  if (order) {
    if (order.redirectURL && order.redirectURL !== "") {

      return res.redirect(order.redirectURL + "/" + orderNumber + "/" + orderSecret);

    } else {
      return res.render("order", {
        pageTitle: "Order " + orderNumber,
        order
      });
    }
  } else {
    recordAbuse(req);
    return res.redirect(configFns.getProperty("reverseProxy.urlPrefix") + "/order/expired");
  }
};
