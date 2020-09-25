import * as sql from "mssql";
import * as configFns from "../configFns";

import type { Order } from "../../types/recordTypes";


export const getOrder = async (orderNumber: string, orderSecret: string, orderIsPaid: boolean) => {

  try {
    const pool: sql.ConnectionPool =
      await sql.connect(configFns.getProperty("mssqlConfig"));

    // Get the order record

    const orderResult = await pool.request()
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
        " and (datediff(minute, orderTime, getdate()) < 60 or datediff(minute, paymentTime, getdate()) < 120)" +
        " and orderNumber = @orderNumber" +
        " and orderSecret = @orderSecret" +
        " and orderIsPaid = @orderIsPaid");

    if (!orderResult.recordset || orderResult.recordset.length === 0) {
      return false;
    }

    const order = orderResult.recordset[0] as Order;

    // Get order items

    const orderItemsResult = await pool.request()
      .input("orderID", sql.BigInt, order.orderID)
      .query("select itemIndex, productSKU, unitPrice, quantity, itemTotal" +
        " from MiniShop.OrderItems" +
        " where orderID = @orderID");

    order.items = orderItemsResult.recordset;

    // Get order fees

    const orderFeesResult = await pool.request()
      .input("orderID", sql.BigInt, order.orderID)
      .query("select feeName, feeTotal" +
        " from MiniShop.OrderFees" +
        " where orderID = @orderID");

    order.fees = orderFeesResult.recordset;

    if (orderIsPaid) {

      const paymentDataResult = await pool.request()
        .input("orderID", sql.BigInt, order.orderID)
        .query("select dataName, dataValue" +
          " from MiniShop.PaymentData" +
          " where orderID = @orderID");

      order.paymentData = paymentDataResult.recordset;
    }

    return order;

  } catch (e) {
    console.log(e);
  }

  return false;
};
