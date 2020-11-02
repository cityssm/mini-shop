import { getOrderNumberBySecret } from "@cityssm/mini-shop-db/getOrderNumberBySecret";

import type { Request } from "express";
import type { StoreValidatorReturn } from "./types";


export const validate = async (req: Request): Promise<StoreValidatorReturn> => {

  /*
   * Check result
   * 1 = approved
   * 0 = declined or incomplete
   * See https://developer.moneris.com/en/Documentation/NA/E-Commerce%20Solutions/Hosted%20Solutions/Hosted%20Payment%20Page
   */

  const resultCode = req.body.result;

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

  const orderNumberForm = req.body.response_order_id as string;

  if (!orderNumberForm || orderNumberForm === "") {
    return {
      isValid: false,
      errorCode: "missingOrderNumber"
    };
  }

  const orderSecret = req.body.rvarSecret;

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
    paymentID: req.body.bank_transaction_id,
    paymentData: {
      response_code: req.body.response_code,
      bank_approval_code: req.body.bank_approval_code,
      cardholder: req.body.cardholder,
      card: req.body.card,
      f4l4: req.body.f4l4,
      charge_total: req.body.charge_total
    }
  };
};
