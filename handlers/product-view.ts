import { recordAbuse } from '@cityssm/express-abuse-points'
import type { RequestHandler } from 'express'

import * as configFunctions from '../helpers/configFunctions.js'


export const handler: RequestHandler = (request, response) => {
  const productSKU = request.params.productSKU
  const product = configFunctions.getProperty('products')[productSKU]

  if (!product) {
    recordAbuse(request)
    response.status(404)
    response.render('product-notFound'); return;
  }

  response.render('product-view', {
    pageTitle: product.productName,
    productSKU,
    product
  });
}
