import { getOrder } from "../helpers/miniShopDB/getOrder";

import type { RequestHandler } from "express";


export const handler: RequestHandler = async (req, res) => {

  const orderNumber = req.params.orderNumber;
  const orderSecret = req.params.orderSecret;

  const order = await getOrder(orderNumber, orderSecret, true);

  if (order) {
    return res.render("order", {
      order
    });
  } else {
    return res.redirect("/order/expired");
  }
};
