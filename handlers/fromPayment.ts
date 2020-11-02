import * as configFns from "../helpers/configFns";

import { validate as monerisHPP_validate } from "../helpers/stores/moneris-hpp";
import { validate as testingFree_validate } from "../helpers/stores/testing-free";

import { updateOrderAsPaid } from "@cityssm/mini-shop-db/updateOrderAsPaid";

import type { RequestHandler } from "express";
import type { StoreValidatorReturn } from "../helpers/stores/types";


export const handler: RequestHandler = async (req, res) => {

  // Validate store-specific result

  const storeType = configFns.getProperty("store.storeType");

  let storeValidatorReturn: StoreValidatorReturn = {
    isValid: false,
    errorCode: "noHandler"
  };

  switch (storeType) {

    case "moneris-hpp":
      storeValidatorReturn = await monerisHPP_validate(req);
      break;

    case "testing-free":
      storeValidatorReturn = testingFree_validate(req);
      break;

    default:
      break;
  }

  // Update the Order record

  let orderRecordMarkedAsPaid = false;

  if (storeValidatorReturn.isValid) {
    orderRecordMarkedAsPaid = await updateOrderAsPaid(storeValidatorReturn);
  }

  // Redirect to receipt

  if (storeValidatorReturn.isValid && orderRecordMarkedAsPaid) {
    return res.redirect("/order/" + storeValidatorReturn.orderNumber + "/" + storeValidatorReturn.orderSecret);
  } else {
    return res.redirect("/order/error");
  }
};
