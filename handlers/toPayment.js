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
const getOrder_1 = require("../helpers/miniShopDB/getOrder");
exports.handler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderNumber = req.body.orderNumber;
    const orderSecret = req.body.orderSecret;
    const order = yield getOrder_1.getOrder(orderNumber, orderSecret, false);
    if (!order) {
        return res.render("toPayment-expired");
    }
    else {
        return res.render("toPayment", {
            order
        });
    }
});
