export function removeTranslationFromProduct(configProduct, language) {
    const miniShopDatabaseProduct = {
        productName: getStringByLanguage(configProduct.productName, language),
        price: configProduct.price,
        formFieldsToSave: [],
        fees: configProduct.fees,
        feeTotals: configProduct.feeTotals
    };
    for (const formFieldToSave of configProduct.formFieldsToSave ?? []) {
        miniShopDatabaseProduct.formFieldsToSave?.push({
            fieldName: getStringByLanguage(formFieldToSave.fieldName, language),
            formFieldName: formFieldToSave.formFieldName
        });
    }
    return miniShopDatabaseProduct;
}
export function getStringByLanguage(languageStringProperty, preferredLanguage) {
    if (languageStringProperty === undefined) {
        return undefined;
    }
    else if (typeof languageStringProperty === 'string') {
        return languageStringProperty;
    }
    else {
        return (languageStringProperty[preferredLanguage] ??
            languageStringProperty[Object.keys(languageStringProperty)[0]]);
    }
}
