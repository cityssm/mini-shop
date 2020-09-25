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
exports.isOrderFoundAndPaid = void 0;
const sql = require("mssql");
const configFns = require("../configFns");
exports.isOrderFoundAndPaid = (orderNumber, orderSecret) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield sql.connect(configFns.getProperty("mssqlConfig"));
        const orderResult = yield pool.request()
            .input("orderNumber", sql.VarChar(50), orderNumber)
            .input("orderSecret", sql.UniqueIdentifier, orderSecret)
            .query("select orderID, orderIsPaid" +
            " from MiniShop.Orders" +
            " where orderIsRefunded = 0 and orderIsDeleted = 0" +
            " and orderNumber = @orderNumber" +
            " and orderSecret = @orderSecret");
        if (orderResult.recordset && orderResult.recordset.length === 1) {
            const order = orderResult.recordset[0];
            return {
                found: true,
                orderID: order.orderID,
                paid: order.orderIsPaid
            };
        }
    }
    catch (e) {
        console.log(e);
    }
    return {
        found: false,
        paid: false
    };
});
