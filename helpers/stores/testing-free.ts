import type { Request } from "express";
import type { StoreValidatorReturn } from "./types";

export const validate = (request: Request): StoreValidatorReturn => {

  const orderNumber = request.body.orderNumber;

  if (!orderNumber || orderNumber === "") {
    return {
      isValid: false,
      errorCode: "missingOrderNumber"
    };
  }

  const orderSecret = request.body.orderSecret;

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
