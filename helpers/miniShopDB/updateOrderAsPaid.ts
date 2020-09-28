import * as sql from "mssql";
import * as configFns from "../configFns";

import { isOrderFoundAndPaid } from "./isOrderFoundAndPaid";

import type { StoreValidatorReturn } from "../stores/types";


export const updateOrderAsPaid = async (validOrder: StoreValidatorReturn): Promise<boolean> => {

  if (!validOrder.isValid) {
    return false;
  }

  // Check if the order can be marked as paid

  const order = await isOrderFoundAndPaid(validOrder.orderNumber, validOrder.orderSecret);

  if (!order.found) {
    return false;

  } else if (order.paid) {
    return true;
  }

  try {
    const pool: sql.ConnectionPool = await sql.connect(configFns.getProperty("mssqlConfig"));

    await pool.request()
      .input("paymentID", sql.NVarChar(50), validOrder.paymentID)
      .input("orderID", sql.BigInt, order.orderID)
      .query("update MiniShop.Orders" +
        " set paymentID = @paymentID," +
        " paymentTime = getdate()" +
        " where orderID = @orderID");

    if (validOrder.paymentData) {

      for (const dataName of Object.keys(validOrder.paymentData)) {

        await pool.request()
          .input("orderID", sql.BigInt, order.orderID)
          .input("dataName", sql.VarChar(30), dataName)
          .input("dataValue", sql.NVarChar, validOrder.paymentData[dataName])
          .query("insert into MiniShop.PaymentData (orderID, dataName, dataValue)" +
            " values (@orderID, @dataName, @dataValue)");
      }
    }

    return true;

  } catch (e) {
    console.log(e);
  }

  return false;
};
