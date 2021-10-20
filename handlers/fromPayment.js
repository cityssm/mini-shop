import { recordAbuse } from "@cityssm/express-abuse-points";
import * as configFunctions from "../helpers/configFunctions.js";
import { validate as monerisHPP_validate } from "../helpers/stores/moneris-hpp.js";
import { validate as testingFree_validate } from "../helpers/stores/testing-free.js";
import { updateOrderAsPaid } from "@cityssm/mini-shop-db";
export const handler = async (request, response) => {
    const storeType = configFunctions.getProperty("store.storeType");
    let storeValidatorReturn = {
        isValid: false,
        errorCode: "noHandler"
    };
    switch (storeType) {
        case "moneris-hpp":
            storeValidatorReturn = await monerisHPP_validate(request);
            break;
        case "testing-free":
            storeValidatorReturn = testingFree_validate(request);
            break;
        default:
            break;
    }
    let orderRecordMarkedAsPaid = false;
    if (storeValidatorReturn.isValid) {
        orderRecordMarkedAsPaid = await updateOrderAsPaid(storeValidatorReturn);
    }
    const urlPrefix = configFunctions.getProperty("reverseProxy.urlPrefix");
    if (storeValidatorReturn.isValid && orderRecordMarkedAsPaid) {
        return response.redirect(urlPrefix + "/order/" + storeValidatorReturn.orderNumber + "/" + storeValidatorReturn.orderSecret);
    }
    else {
        recordAbuse(request);
        return response.redirect(urlPrefix + "/order/error");
    }
};
