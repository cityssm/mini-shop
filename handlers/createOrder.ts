
import { createOrder as miniShopDB_createOrder } from '@cityssm/mini-shop-db'
import type { ShippingForm } from '@cityssm/mini-shop-db/types'
import type { RequestHandler } from 'express'

import { captchaIsMatch, purgeCaptcha } from '../helpers/captchaFunctions.js'
import * as configFunctions from '../helpers/configFunctions.js'

export const handler: RequestHandler = async (request, response) => {
  if (configFunctions.getProperty('settings.checkout_includeCaptcha')) {
    const captchaKey = request.body.captchaKey
    const captchaText = request.body.captchaText

    if (!captchaIsMatch(captchaKey, captchaText)) {
      return response.json({
        success: false,
        message: 'Image text does not match.'
      })
    }
  }

  const formData = request.body as ShippingForm

  const orderIDs = await miniShopDB_createOrder(formData)

  if (
    configFunctions.getProperty('settings.checkout_includeCaptcha') &&
    orderIDs.success
  ) {
    purgeCaptcha(request.body.captchaKey)
  }

  return response.json(orderIDs)
}
