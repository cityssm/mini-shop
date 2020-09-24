import { getOrder as miniShopDB_getOrder } from "../helpers/miniShopDB/getOrder";

import type { RequestHandler } from "express";


export const handler: RequestHandler = async (req, res) => {

  const orderNumber: string = req.body.orderNumber;
  const orderSecret: string = req.body.orderSecret;

  const order = await miniShopDB_getOrder(orderNumber, orderSecret, false);

  if (!order) {

    return res.render("toPayment-expired");

  } else {

    return res.render("toPayment", {
      order
    });
  }

};
