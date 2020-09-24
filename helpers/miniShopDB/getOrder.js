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
exports.getOrder = void 0;
const sql = require("mssql");
const configFns = require("../configFns");
exports.getOrder = (orderNumber, orderSecret, orderIsPaid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield sql.connect(configFns.getProperty("mssqlConfig"));
        const orderResult = yield pool.request()
            .input("orderNumber", sql.VarChar(50), orderNumber)
            .input("orderSecret", sql.UniqueIdentifier, orderSecret)
            .input("orderIsPaid", sql.Bit, orderIsPaid ? 1 : 0)
            .query("select orderID, orderNumber, orderSecret, orderTime," +
            " shippingName, shippingAddress1, shippingAddress2," +
            " shippingCity, shippingProvince, shippingCountry, shippingPostalCode," +
            " shippingEmailAddress, shippingPhoneNumberDay, shippingPhoneNumberEvening," +
            " paymentID, paymentTime" +
            " from MiniShop.Orders" +
            " where orderIsRefunded = 0 and orderIsDeleted = 0" +
            " and (datediff(minute, orderTime, getdate()) < 60 or datediff(minute, paymentTime, getdate()) < 60)" +
            " and orderNumber = @orderNumber" +
            " and orderSecret = @orderSecret" +
            " and orderIsPaid = @orderIsPaid");
        const order = orderResult.recordset[0];
        return order;
    }
    catch (e) {
        console.log(e);
    }
    return false;
});
