import { v4 as uuidv4 } from "uuid";

import * as log from "fancy-log";

import type * as configTypes from "../types/configTypes";
import type * as sqlTypes from "mssql";


/*
 * LOAD CONFIGURATION
 */

let config: configTypes.Config = {};

try {

  config = require("../data/config");

} catch (e) {

  config = require("../data/config-sample");

  log.error("No \"data/config.js\" found, using \"data/config-sample.js\".");
}

Object.freeze(config);


/*
 * SET UP FALLBACK VALUES
 */


const configFallbackValues = new Map<string, any>();

configFallbackValues.set("application.httpPort", 7777);

configFallbackValues.set("orderNumberFunction", () => {
  return uuidv4();
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


export function getProperty(propertyName: "application.httpPort"): number;
export function getProperty(propertyName: "application.https"): configTypes.Config_HTTPSConfig;

export function getProperty(propertyName: "mssqlConfig"): sqlTypes.config;

export function getProperty(propertyName: "orderNumberFunction"): () => string;

export function getProperty(propertyName: "site.header.backgroundColorClass"): () => string;

export function getProperty(propertyName: "site.footer.isVisible"): () => boolean;
export function getProperty(propertyName: "site.footer.backgroundColorClass"): () => string;
export function getProperty(propertyName: "site.footer.textColorClass"): () => string;
export function getProperty(propertyName: "site.footer.footerEjs"): () => string;

export function getProperty(propertyName: "views.products.title"): () => string;
export function getProperty(propertyName: "views.checkout.title"): () => string;
export function getProperty(propertyName: "views.checkout_shipping.title"): () => string;

export function getProperty(propertyName: "views.toPayment.headerEjs"): () => string;

export function getProperty(propertyName: "views.order.title"): () => string;
export function getProperty(propertyName: "views.order.headerEjs"): () => string;

export function getProperty(propertyName: "store.storeType"): string;

export function getProperty(propertyName: "fees"): { [feeName: string]: configTypes.Config_Fee };
export function getProperty(propertyName: "products"): { [productSKU: string]: configTypes.Config_Product };

export function getProperty(propertyName: string): any {

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


const clientSideProducts: { [productSKU: string]: configTypes.Config_Product } = {};

export function getClientSideProduct(productSKU: string) {

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
