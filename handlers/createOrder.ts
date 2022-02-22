import { captchaIsMatch } from "../helpers/captchaFunctions.js";

import { createOrder as miniShopDB_createOrder } from "@cityssm/mini-shop-db";

import type { RequestHandler } from "express";
import type { ShippingForm } from "@cityssm/mini-shop-db/types";


export const handler: RequestHandler = async (request, response) => {

  const captchaKey = request.body.captchaKey;
  const captchaText = request.body.captchaText;

  if (!captchaIsMatch(captchaKey, captchaText)) {
    return response.json({
      success: false,
      message: "Image text does not match."
    });
  }

  const formData = request.body as ShippingForm;


  const orderIDs = await miniShopDB_createOrder(formData);

  return response.json(orderIDs);
};
