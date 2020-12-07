import type * as configTypes from "../types/configTypes";
import type * as sqlTypes from "mssql";
export declare function getProperty(propertyName: "application.httpPort"): number;
export declare function getProperty(propertyName: "application.https"): configTypes.Config_HTTPSConfig;
export declare function getProperty(propertyName: "reverseProxy.disableCompression"): boolean;
export declare function getProperty(propertyName: "reverseProxy.disableEtag"): boolean;
export declare function getProperty(propertyName: "reverseProxy.urlPrefix"): "";
export declare function getProperty(propertyName: "mssqlConfig"): sqlTypes.config;
export declare function getProperty(propertyName: "orderNumberFunction"): () => string;
export declare function getProperty(propertyName: "site.header.backgroundColorClass"): () => string;
export declare function getProperty(propertyName: "site.footer.isVisible"): () => boolean;
export declare function getProperty(propertyName: "site.footer.backgroundColorClass"): () => string;
export declare function getProperty(propertyName: "site.footer.textColorClass"): () => string;
export declare function getProperty(propertyName: "site.footer.footerEjs"): () => string;
export declare function getProperty(propertyName: "views.products.title"): () => string;
export declare function getProperty(propertyName: "views.checkout.title"): () => string;
export declare function getProperty(propertyName: "views.checkout_shipping.title"): () => string;
export declare function getProperty(propertyName: "views.toPayment.headerEjs"): () => string;
export declare function getProperty(propertyName: "views.order.title"): () => string;
export declare function getProperty(propertyName: "views.order.headerEjs"): () => string;
export declare function getProperty(propertyName: "store.storeType"): string;
export declare function getProperty(propertyName: "fees"): {
    [feeName: string]: configTypes.Config_Fee;
};
export declare function getProperty(propertyName: "products"): {
    [productSKU: string]: configTypes.Config_Product;
};
export declare function getClientSideProduct(productSKU: string): configTypes.Config_Product;
