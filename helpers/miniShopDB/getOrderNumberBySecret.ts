import * as sql from "mssql";
import * as configFns from "../configFns";


export const getOrderNumberBySecret = async (orderSecret: string) => {

  try {
    const pool: sql.ConnectionPool =
      await sql.connect(configFns.getProperty("mssqlConfig"));

    // Get the order record

    const orderResult = await pool.request()
      .input("orderSecret", sql.UniqueIdentifier, orderSecret)
      .query("select orderNumber" +
        " from MiniShop.Orders" +
        " where orderIsRefunded = 0 and orderIsDeleted = 0" +
        " and orderSecret = @orderSecret");

    if (!orderResult.recordset || orderResult.recordset.length === 0) {
      return false;
    }

    return orderResult.recordset[0].orderNumber as string;

  } catch (e) {
    console.log(e);
  }

  return false;
};
