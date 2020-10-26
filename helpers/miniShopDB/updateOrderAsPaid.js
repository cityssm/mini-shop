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
exports.updateOrderAsPaid = void 0;
const sql = require("mssql");
const configFns = require("../configFns");
const isOrderFoundAndPaid_1 = require("./isOrderFoundAndPaid");
exports.updateOrderAsPaid = (validOrder) => __awaiter(void 0, void 0, void 0, function* () {
    if (!validOrder.isValid) {
        return false;
    }
    const order = yield isOrderFoundAndPaid_1.isOrderFoundAndPaid(validOrder.orderNumber, validOrder.orderSecret);
    if (!order.found) {
        return false;
    }
    else if (order.paid) {
        return true;
    }
    try {
        const pool = yield sql.connect(configFns.getProperty("mssqlConfig"));
        yield pool.request()
            .input("paymentID", sql.NVarChar(50), validOrder.paymentID)
            .input("orderID", sql.BigInt, order.orderID)
            .query("update MiniShop.Orders" +
            " set paymentID = @paymentID," +
            " paymentTime = getdate()" +
            " where orderID = @orderID");
        if (validOrder.paymentData) {
            for (const dataName of Object.keys(validOrder.paymentData)) {
                yield pool.request()
                    .input("orderID", sql.BigInt, order.orderID)
                    .input("dataName", sql.VarChar(30), dataName)
                    .input("dataValue", sql.NVarChar, validOrder.paymentData[dataName])
                    .query("insert into MiniShop.PaymentData (orderID, dataName, dataValue)" +
                    " values (@orderID, @dataName, @dataValue)");
            }
        }
        return true;
    }
    catch (e) {
        console.log(e);
    }
    return false;
});
