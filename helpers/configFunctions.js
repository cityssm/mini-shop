import { Configurator } from '@cityssm/configurator';
import debug from 'debug';
import iso639 from 'iso-639-1';
import { v4 as uuidv4 } from 'uuid';
import { getStringByLanguage } from './translationHelpers.js';
const debugConfig = debug('mini-shop:configFunctions');
const defaultValues = {
    'application.applicationName': 'Mini Shop',
    'application.httpPort': 7777,
    'application.https': undefined,
    'reverseProxy.disableCompression': false,
    'reverseProxy.disableEtag': false,
    'reverseProxy.blockViaXForwardedFor': false,
    'reverseProxy.urlPrefix': '',
    mssqlConfig: undefined,
    languages: ['en'],
    orderNumberFunction: () => {
        return `RCT-${uuidv4().toUpperCase()}`;
    },
    'site.header.backgroundColorClass': 'info',
    'site.footer.isVisible': true,
    'site.footer.backgroundColorClass': 'dark',
    'site.footer.textColorClass': 'light',
    'site.footer.footerEjs': 'site_thanks.ejs',
    'views.products.title': 'Products',
    'views.checkout.title': {
        en: 'Checkout',
        fr: 'Paiement'
    },
    'views.checkout_shipping.title': 'Shipping Details',
    'views.order.title': {
        en: 'Order Summary',
        fr: 'Récapitulation'
    },
    'views.order.headerEjs': 'order_print.ejs',
    'views.toPayment.headerEjs': 'toPayment_redirecting.ejs',
    fees: {},
    products: {},
    productHandlers: [],
    store: undefined,
    'store.storeType': undefined,
    'currency.code': 'CAD',
    'currency.currencyName': {
        en: 'Canadian Dollars',
        fr: 'Dollars canadiens'
    },
    'settings.checkout_includeCaptcha': true
};
let config = {};
try {
    config = (await import('../data/config.js')).config;
}
catch {
    config = (await import('../data/config-sample.js')).config;
    debugConfig('No "data/config.js" found, using "data/config-sample.js".');
}
const configurator = new Configurator(defaultValues, config);
const configOverrides = {};
export function getProperty(propertyName, fallbackValue) {
    if (Object.hasOwn(configOverrides, propertyName)) {
        return configOverrides[propertyName];
    }
    return configurator.getConfigProperty(propertyName, fallbackValue);
}
export function overrideProperty(propertyName, propertyValue) {
    configOverrides[propertyName] = propertyValue;
}
const clientSideProducts = {};
export function getClientSideProduct(productSKU) {
    if (Object.keys(clientSideProducts).length === 0) {
        const serverSideProducts = getProperty('products');
        for (const serverProductSKU of Object.keys(serverSideProducts)) {
            const serverSideProduct = serverSideProducts[serverProductSKU];
            if (serverSideProduct !== undefined) {
                clientSideProducts[serverProductSKU] = {
                    productName: serverSideProduct.productName,
                    price: serverSideProduct.price,
                    image: serverSideProduct.image,
                    fees: serverSideProduct.fees ?? [],
                    formFieldsToSave: serverSideProduct.formFieldsToSave
                };
            }
        }
    }
    return clientSideProducts[productSKU];
}
export function getPropertyByLanguage(propertyName, preferredLanguage = 'en') {
    const languageStringProperty = getProperty(propertyName);
    return getStringByLanguage(languageStringProperty, preferredLanguage);
}
export function getLanguages() {
    const configLanguages = getProperty('languages');
    const languages = [];
    for (const configLanguage of configLanguages) {
        languages.push([
            configLanguage,
            iso639.getNativeName(configLanguage) ?? configLanguage
        ]);
    }
    return languages;
}
