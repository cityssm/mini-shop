import * as configTypes from "../types/configTypes";
export declare function getProperty(propertyName: "application.httpPort"): number;
export declare function getProperty(propertyName: "application.https"): configTypes.Config_HTTPSConfig;
export declare function getProperty(propertyName: "session.cookieName"): string;
export declare function getProperty(propertyName: "session.secret"): string;
export declare function getProperty(propertyName: "session.maxAgeMillis"): number;
export declare function getProperty(propertyName: "fees"): {
    [feeName: string]: configTypes.Config_Fee;
};
export declare function getProperty(propertyName: "products"): {
    [productSKU: string]: configTypes.Config_Product;
};
export declare function getClientSideProduct(productSKU: string): configTypes.Config_Product;
