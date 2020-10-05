import type { Request } from "express";
import type { StoreValidatorReturn } from "./types";

export const validate = (req: Request): StoreValidatorReturn => {

  const orderNumber = req.body.orderNumber;

  if (!orderNumber || orderNumber === "") {
    return {
      isValid: false,
      errorCode: "missingOrderNumber"
    };
  }

  const orderSecret = req.body.orderSecret;

  if (!orderSecret || orderSecret === "") {
    return {
      isValid: false,
      errorCode: "missingOrderSecret"
    };
  }

  return {
    isValid: true,
    orderNumber,
    orderSecret,
    paymentID: orderNumber
  };
};
