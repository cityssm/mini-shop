import * as sql from "mssql";
import * as configFns from "../configFns";


export const isOrderFoundAndPaid = async (orderNumber: string, orderSecret: string): Promise<{
  found: boolean;
  paid: boolean;
  orderID?: number;
}> => {

  try {
    const pool: sql.ConnectionPool =
      await sql.connect(configFns.getProperty("mssqlConfig"));

    const orderResult = await pool.request()
      .input("orderNumber", sql.VarChar(50), orderNumber)
      .input("orderSecret", sql.UniqueIdentifier, orderSecret)
      .query("select orderID, orderIsPaid" +
        " from MiniShop.Orders" +
        " where orderIsRefunded = 0 and orderIsDeleted = 0" +
        " and orderNumber = @orderNumber" +
        " and orderSecret = @orderSecret");

    if (orderResult.recordset && orderResult.recordset.length === 1) {

      const order: {
        orderID: number;
        orderIsPaid: boolean;
      } = orderResult.recordset[0];

      return {
        found: true,
        orderID: order.orderID,
        paid: order.orderIsPaid
      };

    }

  } catch (e) {
    console.log(e);
  }

  return {
    found: false,
    paid: false
  };
};
