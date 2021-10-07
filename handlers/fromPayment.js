import { recordAbuse } from "@cityssm/express-abuse-points";
import * as configFns from "../helpers/configFns.js";
import { validate as monerisHPP_validate } from "../helpers/stores/moneris-hpp.js";
import { validate as testingFree_validate } from "../helpers/stores/testing-free.js";
import { updateOrderAsPaid } from "@cityssm/mini-shop-db/updateOrderAsPaid.js";
export const handler = async (req, res) => {
    const storeType = configFns.getProperty("store.storeType");
    let storeValidatorReturn = {
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
    let orderRecordMarkedAsPaid = false;
    if (storeValidatorReturn.isValid) {
        orderRecordMarkedAsPaid = await updateOrderAsPaid(storeValidatorReturn);
    }
    const urlPrefix = configFns.getProperty("reverseProxy.urlPrefix");
    if (storeValidatorReturn.isValid && orderRecordMarkedAsPaid) {
        return res.redirect(urlPrefix + "/order/" + storeValidatorReturn.orderNumber + "/" + storeValidatorReturn.orderSecret);
    }
    else {
        recordAbuse(req);
        return res.redirect(urlPrefix + "/order/error");
    }
};
