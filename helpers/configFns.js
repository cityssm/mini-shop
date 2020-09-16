"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProperty = void 0;
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
configFallbackValues.set("views.products.title", "Products");
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
