"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const configFns = require("../helpers/configFns");
const moneris_hpp_1 = require("../helpers/stores/moneris-hpp");
const testing_free_1 = require("../helpers/stores/testing-free");
const updateOrderAsPaid_1 = require("@cityssm/mini-shop-db/updateOrderAsPaid");
const handler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const storeType = configFns.getProperty("store.storeType");
    let storeValidatorReturn = {
        isValid: false,
        errorCode: "noHandler"
    };
    switch (storeType) {
        case "moneris-hpp":
            storeValidatorReturn = yield moneris_hpp_1.validate(req);
            break;
        case "testing-free":
            storeValidatorReturn = testing_free_1.validate(req);
            break;
        default:
            break;
    }
    let orderRecordMarkedAsPaid = false;
    if (storeValidatorReturn.isValid) {
        orderRecordMarkedAsPaid = yield updateOrderAsPaid_1.updateOrderAsPaid(storeValidatorReturn);
    }
    const urlPrefix = configFns.getProperty("reverseProxy.urlPrefix");
    if (storeValidatorReturn.isValid && orderRecordMarkedAsPaid) {
        return res.redirect(urlPrefix + "/order/" + storeValidatorReturn.orderNumber + "/" + storeValidatorReturn.orderSecret);
    }
    else {
        return res.redirect(urlPrefix + "/order/error");
    }
});
exports.handler = handler;
