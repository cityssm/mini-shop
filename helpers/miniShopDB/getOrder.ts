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
        " and (datediff(minute, orderTime, getdate()) < 60 or datediff(minute, paymentTime, getdate()) < 60)" +
        " and orderNumber = @orderNumber" +
        " and orderSecret = @orderSecret" +
        " and orderIsPaid = @orderIsPaid");

    const order = orderResult.recordset[0] as Order;

    return order;

  } catch (e) {
    console.log(e);
  }

  return false;
};
