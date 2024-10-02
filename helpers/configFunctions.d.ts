import { type LanguageCode } from 'iso-639-1';
import type * as sqlTypes from 'mssql';
import type * as configTypes from '../types/configTypes.js';
declare const defaultValues: {
    'application.applicationName': string | configTypes.StringWithTranslations;
    'application.httpPort': number;
    'reverseProxy.disableCompression': boolean;
    'reverseProxy.disableEtag': boolean;
    'reverseProxy.blockViaXForwardedFor': boolean;
    'reverseProxy.urlPrefix': string;
    mssqlConfig: sqlTypes.config;
    languages: LanguageCode[];
    orderNumberFunction: () => string;
    'site.header.backgroundColorClass': string;
    'site.footer.isVisible': boolean;
    'site.footer.backgroundColorClass': string;
    'site.footer.textColorClass': string;
    'site.footer.footerEjs': string;
    'views.products.title': string;
    'views.checkout.title': {
        en: string;
        fr: string;
    };
    'views.checkout_shipping.title': string;
    'views.order.title': {
        en: string;
        fr: string;
    };
    'views.order.headerEjs': string;
    'views.toPayment.headerEjs': string;
    fees: Record<string, configTypes.ConfigFeeDefinition>;
    products: Record<string, configTypes.ConfigProduct>;
    productHandlers: configTypes.ProductHandlers[];
    store: configTypes.StoreConfigs;
    'store.storeType': configTypes.StoreTypes;
    'currency.code': string;
    'currency.currencyName': {
        en: string;
        fr: string;
    };
    'settings.checkout_includeCaptcha': boolean;
};
export declare function getProperty<K extends keyof typeof defaultValues>(propertyName: K, fallbackValue?: (typeof defaultValues)[K]): (typeof defaultValues)[K];
export declare function overrideProperty(propertyName: 'reverseProxy.urlPrefix', propertyValue: string): void;
export declare function getClientSideProduct(productSKU: string): configTypes.ConfigProduct;
export declare function getPropertyByLanguage<K extends keyof typeof defaultValues>(propertyName: K, preferredLanguage?: LanguageCode): string | undefined;
export declare function getLanguages(): string[][];
export {};
