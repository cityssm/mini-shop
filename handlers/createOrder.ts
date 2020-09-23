import type { RequestHandler } from "express";

import type { ShippingForm } from "../types/recordTypes";


export const handler: RequestHandler = (req, res) => {

  const formData = req.body as ShippingForm;

  console.log(formData);

  return res.json(formData);
};
