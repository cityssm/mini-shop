import { createOrder as miniShopDB_createOrder } from "@cityssm/mini-shop-db/createOrder.js";

import type { RequestHandler } from "express";
import type { ShippingForm } from "../types/recordTypes";


export const handler: RequestHandler = async (request, response) => {

  const formData = request.body as ShippingForm;

  const orderIDs = await miniShopDB_createOrder(formData);

  return response.json(orderIDs);
};
