import type { RequestHandler } from "express";


export const handler: RequestHandler = (_request, response) => {
  return response.render("order-expired", {
    pageTitle: "Order Expired"
  });
};
