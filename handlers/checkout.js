export const handler = (_request, response) => {
    return response.render("checkout", {
        pageTitle: "Checkout"
    });
};
