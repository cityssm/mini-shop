"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientSideProduct = exports.overrideProperty = exports.getProperty = void 0;
const uuid_1 = require("uuid");
const debug_1 = require("debug");
const debugConfig = debug_1.debug("mini-shop:configFns");
let config = {};
try {
    config = require("../data/config");
}
catch (e) {
    config = require("../data/config-sample");
    debugConfig("No \"data/config.js\" found, using \"data/config-sample.js\".");
}
Object.freeze(config);
const configOverrides = {};
const configFallbackValues = new Map();
configFallbackValues.set("application.applicationName", "Mini Shop");
configFallbackValues.set("application.httpPort", 7777);
configFallbackValues.set("reverseProxy.disableCompression", false);
configFallbackValues.set("reverseProxy.disableEtag", false);
configFallbackValues.set("reverseProxy.blockViaXForwardedFor", false);
configFallbackValues.set("reverseProxy.urlPrefix", "");
configFallbackValues.set("orderNumberFunction", () => {
    return "RCT-" + uuid_1.v4().toUpperCase();
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
configFallbackValues.set("currency.code", "CAD");
configFallbackValues.set("currency.currencyName", "Canadian Dollars");
function getProperty(propertyName) {
    if (configOverrides.hasOwnProperty(propertyName)) {
        return configOverrides[propertyName];
    }
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
function overrideProperty(propertyName, propertyValue) {
    configOverrides[propertyName] = propertyValue;
}
exports.overrideProperty = overrideProperty;
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
                fees: serverSideProduct.fees || [],
                formFieldsToSave: serverSideProduct.formFieldsToSave
            };
        }
    }
    return clientSideProducts[productSKU];
}
exports.getClientSideProduct = getClientSideProduct;
