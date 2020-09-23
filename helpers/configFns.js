"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientSideProduct = exports.getProperty = void 0;
let config = {};
try {
    config = require("../data/config");
}
catch (e) {
    config = {};
    console.error("No \"data/config.js\" found.");
}
Object.freeze(config);
const configFallbackValues = new Map();
configFallbackValues.set("application.httpPort", 7777);
configFallbackValues.set("session.cookieName", "mini-shop-sid");
configFallbackValues.set("session.secret", "cityssm/mini-shop");
configFallbackValues.set("session.maxAgeMillis", 60 * 60 * 1000);
configFallbackValues.set("site.header.backgroundColorClass", "info");
configFallbackValues.set("site.footer.isVisible", true);
configFallbackValues.set("site.footer.backgroundColorClass", "dark");
configFallbackValues.set("site.footer.textColorClass", "light");
configFallbackValues.set("site.footer.footerEjs", "thanks.ejs");
configFallbackValues.set("views.products.title", "Products");
configFallbackValues.set("views.checkout.title", "Checkout");
configFallbackValues.set("views.checkout_shipping.title", "Shipping Details");
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
