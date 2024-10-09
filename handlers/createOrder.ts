import { createOrder as miniShopDB_createOrder } from '@cityssm/mini-shop-db'
import type { ShippingForm } from '@cityssm/mini-shop-db/types'
import type { Request, Response } from 'express'

import { captchaIsMatch, purgeCaptcha } from '../helpers/captchaFunctions.js'
import * as configFunctions from '../helpers/configFunctions.js'

export default async function handler(
  request: Request,
  response: Response
): Promise<void> {
  if (configFunctions.getProperty('settings.checkout_includeCaptcha')) {
    const captchaKey = request.body.captchaKey as string
    const captchaText = request.body.captchaText as string

    if (!captchaIsMatch(captchaKey, captchaText)) {
      response.json({
        success: false,
        message: 'Image text does not match.'
      })

      return
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

  response.json(orderIDs)
}
