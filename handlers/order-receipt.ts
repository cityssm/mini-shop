import { getOrder as miniShopDB_getOrder } from "@cityssm/mini-shop-db/getOrder";

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
        order
      });
    }
  } else {
    return res.redirect("/order/expired");
  }
};
