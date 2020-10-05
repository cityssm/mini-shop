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
exports.getOrderNumberBySecret = void 0;
const sql = require("mssql");
const configFns = require("../configFns");
exports.getOrderNumberBySecret = (orderSecret) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield sql.connect(configFns.getProperty("mssqlConfig"));
        const orderResult = yield pool.request()
            .input("orderSecret", sql.UniqueIdentifier, orderSecret)
            .query("select orderNumber" +
            " from MiniShop.Orders" +
            " where orderIsRefunded = 0 and orderIsDeleted = 0" +
            " and orderSecret = @orderSecret");
        if (!orderResult.recordset || orderResult.recordset.length === 0) {
            return false;
        }
        return orderResult.recordset[0].orderNumber;
    }
    catch (e) {
        console.log(e);
    }
    return false;
});
//# sourceMappingURL=getOrderNumberBySecret.js.map