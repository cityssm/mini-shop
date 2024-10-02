import { getProperty } from './configFunctions.js';
import { getStringByLanguage, removeTranslationFromProduct } from './translationHelpers.js';
const languages = getProperty('languages') ?? '';
const language = languages.length > 0 ? languages[0] : 'en';
export function fixProducts(configProducts) {
    const miniShopProducts = {};
    for (const [productSku, product] of Object.entries(configProducts)) {
        const miniShopDatabaseProduct = removeTranslationFromProduct(product, language);
        miniShopDatabaseProduct.productSKU = productSku;
        miniShopProducts[productSku] = miniShopDatabaseProduct;
    }
    return miniShopProducts;
}
export function fixFees(configFees) {
    const miniShopFees = {};
    for (const [feeSKU, fee] of Object.entries(configFees)) {
        const miniShopDatabaseFee = {
            feeSKU,
            feeName: getStringByLanguage(fee.feeName, language),
            feeCalculation: (miniShopDatabaseProduct) => {
                return fee.feeCalculation(miniShopDatabaseProduct);
            }
        };
        miniShopFees[feeSKU] = miniShopDatabaseFee;
    }
    return miniShopFees;
}