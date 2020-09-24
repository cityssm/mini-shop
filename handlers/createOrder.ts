import { createOrder as miniShopDB_createOrder } from "../helpers/miniShopDB/createOrder";

import type { RequestHandler } from "express";
import type { ShippingForm } from "../types/recordTypes";


export const handler: RequestHandler = async (req, res) => {

  const formData = req.body as ShippingForm;

  const orderIDs = await miniShopDB_createOrder(formData);

  return res.json(orderIDs);
};
