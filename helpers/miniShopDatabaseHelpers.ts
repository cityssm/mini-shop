import type {
  Fee as MiniShopDatabaseFee,
  Product as MiniShopDatabaseProduct
} from '@cityssm/mini-shop-db/types.js'

import type {
  ConfigFeeDefinition,
  ConfigProduct
} from '../types/configTypes.js'

import { getProperty } from './configFunctions.js'
import {
  getStringByLanguage,
  removeTranslationFromProduct
} from './translationHelpers.js'

const languages = getProperty('languages')

const language = languages.length > 0 ? languages[0] : 'en'

export function fixProducts(
  configProducts: Record<string, ConfigProduct | undefined>
): Record<string, MiniShopDatabaseProduct> {
  const miniShopProducts: Record<string, MiniShopDatabaseProduct> = {}

  for (const [productSku, product] of Object.entries(configProducts)) {
    if (product === undefined) {
      continue
    }

    const miniShopDatabaseProduct = removeTranslationFromProduct(
      product,
      language
    )
    miniShopDatabaseProduct.productSKU = productSku
    miniShopProducts[productSku] = miniShopDatabaseProduct
  }

  return miniShopProducts
}

export function fixFees(
  configFees: Record<string, ConfigFeeDefinition | undefined>
): Record<string, MiniShopDatabaseFee> {
  const miniShopFees: Record<string, MiniShopDatabaseFee> = {}

  for (const [feeSKU, fee] of Object.entries(configFees)) {
    if (fee === undefined) {
      continue
    }

    const miniShopDatabaseFee: MiniShopDatabaseFee = {
      feeSKU,
      feeName: getStringByLanguage(fee.feeName, language) as string,
      feeCalculation: (miniShopDatabaseProduct) => {
        return fee.feeCalculation(miniShopDatabaseProduct)
      }
    }

    miniShopFees[feeSKU] = miniShopDatabaseFee
  }

  return miniShopFees
}
