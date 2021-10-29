import { isTagNumberEligible } from "../../../helpers/products/ssm-ticket_parking.js";

import type { RequestHandler } from "express";


export const handler: RequestHandler = async (request, response) => {

  const tagNumber = request.body.tagNumber as string;

  const isEligible = await isTagNumberEligible(tagNumber);

  return response.json({
    tagNumber,
    isEligible
  });
};


export default handler;
