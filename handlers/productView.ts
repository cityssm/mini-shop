import { recordAbuse } from '@cityssm/express-abuse-points'
import type { Request, Response } from 'express'

import * as configFunctions from '../helpers/configFunctions.js'

export default function handler(request: Request, response: Response): void {
  const productSKU = request.params.productSKU
  const product = configFunctions.getProperty('products')[productSKU]

  if (product === undefined) {
    recordAbuse(request)
    response.status(404)
    response.render('product-notFound')
    return
  }

  response.render('product-view', {
    pageTitle: product.productName,
    productSKU,
    product
  })
}
