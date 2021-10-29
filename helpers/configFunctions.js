import { v4 as uuidv4 } from "uuid";
import debug from "debug";
const debugConfig = debug("mini-shop:configFunctions");
let config = {};
try {
    config = (await import("../data/config.js")).config;
}
catch (_a) {
    config = (await import("../data/config-sample.js")).config;
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
    return "RCT-" + uuidv4().toUpperCase();
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
configFallbackValues.set("productHandlers", []);
configFallbackValues.set("currency.code", "CAD");
configFallbackValues.set("currency.currencyName", "Canadian Dollars");
export function getProperty(propertyName) {
    if (Object.prototype.hasOwnProperty.call(configOverrides, propertyName)) {
        return configOverrides[propertyName];
    }
    const propertyNameSplit = propertyName.split(".");
    let currentObject = config;
    for (const element of propertyNameSplit) {
        currentObject = currentObject[element];
        if (!currentObject) {
            return configFallbackValues.get(propertyName);
        }
    }
    return currentObject;
}
export function overrideProperty(propertyName, propertyValue) {
    configOverrides[propertyName] = propertyValue;
}
const clientSideProducts = {};
export function getClientSideProduct(productSKU) {
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
