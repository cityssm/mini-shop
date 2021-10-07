export const handler = (_request, response) => {
    return response.render("order-expired", {
        pageTitle: "Order Expired"
    });
};
