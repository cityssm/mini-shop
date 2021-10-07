import { createOrder as miniShopDB_createOrder } from "@cityssm/mini-shop-db/createOrder.js";
export const handler = async (request, response) => {
    const formData = request.body;
    const orderIDs = await miniShopDB_createOrder(formData);
    return response.json(orderIDs);
};
