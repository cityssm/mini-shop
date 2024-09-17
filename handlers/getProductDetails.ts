import type { RequestHandler } from 'express'

import * as configFunctions from '../helpers/configFunctions.js'
import type {
  ConfigFeeDefinition,
  ConfigProduct
} from '../types/configTypes.js'


const getProductAndFeeDetails = (productSKUs: string[]) => {
  const products: Record<string, ConfigProduct> = {}
  const fees: Record<string, ConfigFeeDefinition> = {}

  for (const productSKU of productSKUs) {
    /*
     * Validate the product SKU
     */

    const product = configFunctions.getClientSideProduct(productSKU)

    // If product not available, don't add it to the list.
    if (!product) {
      continue
    }

    /*
     * Calculate fees
     */

    let addProductToObject = true
    product.feeTotals = {}

    for (const feeName of product.fees) {
      const fee = configFunctions.getProperty('fees')[feeName]

      if (fee) {
        product.feeTotals[feeName] = fee.feeCalculation(product)
        fees[feeName] = fee
      } else {
        addProductToObject = false
        break
      }
    }

    // Add valid product to list.
    if (addProductToObject) {
      products[productSKU] = product
    }
  }

  return {
    products,
    fees
  }
}

export const handler: RequestHandler = (request, response) => {
  const productSKUs = (request.body.productSKUs as string).split(',')

  const returnObject = getProductAndFeeDetails(productSKUs)

  return response.json(returnObject)
}

export default handler
