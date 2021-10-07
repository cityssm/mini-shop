import { createOrder as miniShopDB_createOrder } from "@cityssm/mini-shop-db/createOrder.js";
export const handler = async (req, res) => {
    const formData = req.body;
    const orderIDs = await miniShopDB_createOrder(formData);
    return res.json(orderIDs);
};
