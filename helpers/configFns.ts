import * as configTypes from "../types/configTypes";

/*
 * LOAD CONFIGURATION
 */

let config: configTypes.Config = {};

try {

  config = require("../data/config");

} catch (e) {

  config = {};

  console.error("No \"data/config.js\" found.");

}

Object.freeze(config);


/*
 * SET UP FALLBACK VALUES
 */


const configFallbackValues = new Map<string, any>();

configFallbackValues.set("application.httpPort", 7777);

configFallbackValues.set("session.cookieName", "mini-shop-sid");
configFallbackValues.set("session.secret", "cityssm/mini-shop");
configFallbackValues.set("session.maxAgeMillis", 60 * 60 * 1000);

configFallbackValues.set("views.products.title", "Products");

configFallbackValues.set("fees", {});
configFallbackValues.set("products", {});


export function getProperty(propertyName: "application.httpPort"): number;
export function getProperty(propertyName: "application.https"): configTypes.Config_HTTPSConfig;

export function getProperty(propertyName: "session.cookieName"): string;
export function getProperty(propertyName: "session.secret"): string;
export function getProperty(propertyName: "session.maxAgeMillis"): number;

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
