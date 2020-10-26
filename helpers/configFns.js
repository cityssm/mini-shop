"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientSideProduct = exports.getProperty = void 0;
const uuid_1 = require("uuid");
let config = {};
try {
    config = require("../data/config");
}
catch (e) {
    config = require("../data/config-sample");
    console.error("No \"data/config.js\" found, using \"data/config-sample.js\".");
}
Object.freeze(config);
const configFallbackValues = new Map();
configFallbackValues.set("application.httpPort", 7777);
configFallbackValues.set("orderNumberFunction", () => {
    return uuid_1.v4();
});
configFallbackValues.set("site.header.backgroundColorClass", "info");
configFallbackValues.set("site.footer.isVisible", true);
configFallbackValues.set("site.footer.backgroundColorClass", "dark");
configFallbackValues.set("site.footer.textColorClass", "light");
configFallbackValues.set("site.footer.footerEjs", "site_thanks.ejs");
configFallbackValues.set("views.products.title", "Products");
configFallbackValues.set("views.checkout.title", "Checkout");
configFallbackValues.set("views.checkout_shipping.title", "Shipping Details");
configFallbackValues.set("views.order.title", "Order Summary");
configFallbackValues.set("views.order.headerEjs", "order_print.ejs");
configFallbackValues.set("views.toPayment.headerEjs", "toPayment_redirecting.ejs");
configFallbackValues.set("fees", {});
configFallbackValues.set("products", {});
function getProperty(propertyName) {
    const propertyNameSplit = propertyName.split(".");
    let currentObj = config;
    for (let index = 0; index < propertyNameSplit.length; index += 1) {
        currentObj = currentObj[propertyNameSplit[index]];
        if (!currentObj) {
            return configFallbackValues.get(propertyName);
        }
    }
    return currentObj;
}
exports.getProperty = getProperty;
const clientSideProducts = {};
function getClientSideProduct(productSKU) {
    if (Object.keys(clientSideProducts).length === 0) {
        const serverSideProducts = getProperty("products");
        for (const serverProductSKU of Object.keys(serverSideProducts)) {
            const serverSideProduct = serverSideProducts[serverProductSKU];
            clientSideProducts[serverProductSKU] = {
                productName: serverSideProduct.productName,
                price: serverSideProduct.price,
                image: serverSideProduct.image,
                fees: serverSideProduct.fees,
                formFieldsToSave: serverSideProduct.formFieldsToSave
            };
        }
    }
    return clientSideProducts[productSKU];
}
exports.getClientSideProduct = getClientSideProduct;
