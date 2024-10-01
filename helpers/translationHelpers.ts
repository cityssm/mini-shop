import type { Product as MiniShopDatabaseProduct } from '@cityssm/mini-shop-db/types.js'
import type { LanguageCode } from 'iso-639-1'

import type {
  ConfigProduct,
  StringWithTranslations
} from '../types/configTypes.js'

export function removeTranslationFromProduct(
  configProduct: ConfigProduct,
  language: LanguageCode
): MiniShopDatabaseProduct {
  const miniShopDatabaseProduct: MiniShopDatabaseProduct = {
    productName: getStringByLanguage(configProduct.productName, language),
    price: configProduct.price,
    formFieldsToSave: [],
    fees: configProduct.fees,
    feeTotals: configProduct.feeTotals
  }

  for (const formFieldToSave of configProduct.formFieldsToSave ?? []) {
    miniShopDatabaseProduct.formFieldsToSave?.push({
      fieldName: getStringByLanguage(formFieldToSave.fieldName, language),
      formFieldName: formFieldToSave.formFieldName
    })
  }

  return miniShopDatabaseProduct
}

export function getStringByLanguage(
  languageStringProperty: string | StringWithTranslations | undefined,
  preferredLanguage: LanguageCode
): string | undefined {
  if (languageStringProperty === undefined) {
    return undefined
  } else if (typeof languageStringProperty === 'string') {
    return languageStringProperty
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (
      languageStringProperty[preferredLanguage] ??
      languageStringProperty[Object.keys(languageStringProperty)[0]]
    )
  }
}
