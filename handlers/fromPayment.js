"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_abuse_points_1 = require("@cityssm/express-abuse-points");
const configFns = require("../helpers/configFns");
const moneris_hpp_1 = require("../helpers/stores/moneris-hpp");
const testing_free_1 = require("../helpers/stores/testing-free");
const updateOrderAsPaid_1 = require("@cityssm/mini-shop-db/updateOrderAsPaid");
const handler = async (req, res) => {
    const storeType = configFns.getProperty("store.storeType");
    let storeValidatorReturn = {
        isValid: false,
        errorCode: "noHandler"
    };
    switch (storeType) {
        case "moneris-hpp":
            storeValidatorReturn = await moneris_hpp_1.validate(req);
            break;
        case "testing-free":
            storeValidatorReturn = testing_free_1.validate(req);
            break;
        default:
            break;
    }
    let orderRecordMarkedAsPaid = false;
    if (storeValidatorReturn.isValid) {
        orderRecordMarkedAsPaid = await updateOrderAsPaid_1.updateOrderAsPaid(storeValidatorReturn);
    }
    const urlPrefix = configFns.getProperty("reverseProxy.urlPrefix");
    if (storeValidatorReturn.isValid && orderRecordMarkedAsPaid) {
        return res.redirect(urlPrefix + "/order/" + storeValidatorReturn.orderNumber + "/" + storeValidatorReturn.orderSecret);
    }
    else {
        express_abuse_points_1.recordAbuse(req);
        return res.redirect(urlPrefix + "/order/error");
    }
};
exports.handler = handler;
