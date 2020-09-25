import type * as configTypes from "../types/configTypes";
import type * as sqlTypes from "mssql";
export declare function getProperty(propertyName: "application.httpPort"): number;
export declare function getProperty(propertyName: "application.https"): configTypes.Config_HTTPSConfig;
export declare function getProperty(propertyName: "mssqlConfig"): sqlTypes.config;
export declare function getProperty(propertyName: "orderNumberFunction"): () => string;
export declare function getProperty(propertyName: "store.storeType"): string;
export declare function getProperty(propertyName: "fees"): {
    [feeName: string]: configTypes.Config_Fee;
};
export declare function getProperty(propertyName: "products"): {
    [productSKU: string]: configTypes.Config_Product;
};
export declare function getClientSideProduct(productSKU: string): configTypes.Config_Product;
