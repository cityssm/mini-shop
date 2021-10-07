export const handler = (_request, response) => {
    return response.render("order-error", {
        pageTitle: "Order Error"
    });
};
