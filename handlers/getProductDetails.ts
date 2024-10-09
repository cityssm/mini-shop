import type { Request, Response } from 'express'

import {
  getClientSideProduct,
  getProperty
} from '../helpers/configFunctions.js'
import type {
  ConfigFeeDefinition,
  ConfigProduct
} from '../types/configTypes.js'

function getProductAndFeeDetails(productSKUs: string[]): {
  products: Record<string, ConfigProduct>
  fees: Record<string, ConfigFeeDefinition>
} {
  const products: Record<string, ConfigProduct> = {}
  const fees: Record<string, ConfigFeeDefinition> = {}

  for (const productSKU of productSKUs) {
    /*
     * Validate the product SKU
     */
    const product = getClientSideProduct(productSKU)

    // If product not available, don't add it to the list.
    if (product === undefined) {
      continue
    }

    /*
     * Calculate fees
     */
    let addProductToObject = true
    product.feeTotals = {}

    for (const feeName of product.fees ?? []) {
      const fee = getProperty('fees')[feeName]

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

export default function handler(
  request: Request<unknown, unknown, { productSKUs: string }>,
  response: Response
): void {
  const productSKUs = request.body.productSKUs.split(',')

  const returnObject = getProductAndFeeDetails(productSKUs)

  response.json(returnObject)
}
