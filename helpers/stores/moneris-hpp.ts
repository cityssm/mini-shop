import { getOrderNumberBySecret } from "@cityssm/mini-shop-db/getOrderNumberBySecret";

import type { Request } from "express";
import type { StoreValidatorReturn } from "./types";


interface MonerisResponse {
  response_order_id?: string;
  result?: string;
  response_code?: string;
  bank_approval_code?: string;
  card?: string;
  cardholder: string;
  f4l4?: string;
  charge_total?: string;
  bank_transaction_id?: string;
  rvarSecret?: string;
}


export const validate = async (req: Request): Promise<StoreValidatorReturn> => {

  const monerisResponse: MonerisResponse = req.body;

  /*
   * Check result
   * 1 = approved
   * 0 = declined or incomplete
   * See https://developer.moneris.com/en/Documentation/NA/E-Commerce%20Solutions/Hosted%20Solutions/Hosted%20Payment%20Page
   */

  const resultCode = monerisResponse.result;

  if (!resultCode) {
    return {
      isValid: false,
      errorCode: "noResult"
    };
  }

  if (resultCode !== "1") {
    return {
      isValid: false,
      errorCode: "paymentDeclined"
    };
  }

  /*
   * Order IDs
   */

  const orderNumberForm = monerisResponse.response_order_id;

  if (!orderNumberForm || orderNumberForm === "") {
    return {
      isValid: false,
      errorCode: "missingOrderNumber"
    };
  }

  const orderSecret = monerisResponse.rvarSecret;

  if (!orderSecret || orderSecret === "") {
    return {
      isValid: false,
      errorCode: "missingOrderSecret"
    };
  }

  /*
   * Handle when retry numbers are appended to the order numbers.
   * ex. RCT-20201005-23423242-r02
   */

  const orderNumberDB = await getOrderNumberBySecret(orderSecret);

  if (!orderNumberDB || !orderNumberForm.includes(orderNumberDB)) {
    return {
      isValid: false,
      errorCode: "invalidOrderNumber"
    };
  }


  return {
    isValid: true,
    orderNumber: orderNumberDB,
    orderSecret,
    paymentID: monerisResponse.bank_transaction_id,
    paymentData: {
      response_code: monerisResponse.response_code,
      bank_approval_code: monerisResponse.bank_approval_code,
      cardholder: monerisResponse.cardholder,
      card: monerisResponse.card,
      f4l4: monerisResponse.f4l4,
      charge_total: req.body.charge_total
    }
  };
};
