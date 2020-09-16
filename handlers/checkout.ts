import type { RequestHandler } from "express";


export const handler: RequestHandler = (_req, res) => {
  return res.render("checkout");
};
