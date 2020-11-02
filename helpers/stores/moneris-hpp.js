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
exports.validate = void 0;
const getOrderNumberBySecret_1 = require("@cityssm/mini-shop-db/getOrderNumberBySecret");
exports.validate = (req) => __awaiter(void 0, void 0, void 0, function* () {
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
    const orderNumberForm = req.body.response_order_id;
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
    const orderNumberDB = yield getOrderNumberBySecret_1.getOrderNumberBySecret(orderSecret);
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
});
