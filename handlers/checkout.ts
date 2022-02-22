import { generateNewCaptcha } from "../helpers/captchaFunctions.js";

import type { RequestHandler } from "express";


export const handler: RequestHandler = async (_request, response) => {

  const captchaKey = await generateNewCaptcha();

  return response.render("checkout", {
    pageTitle: "Checkout",
    captchaKey
  });
};
