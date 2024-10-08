import { getOrder as miniShopDB_getOrder } from '@cityssm/mini-shop-db'
import type { Request, Response } from 'express'
import type { LanguageCode } from 'iso-639-1'

import { getProperty } from '../helpers/configFunctions.js'
import { preferredLanguageCookieKey } from '../helpers/translationHelpers.js'

export default async function handler(
  request: Request<
    unknown,
    unknown,
    { orderNumber: string; orderSecret: string }
  >,
  response: Response
): Promise<void> {
  const orderNumber = request.body.orderNumber
  const orderSecret = request.body.orderSecret

  const order = await miniShopDB_getOrder(orderNumber, orderSecret, false)

  if (!order) {
    response.render('toPayment-expired')
    return
  }

  const storeType = getProperty('store.storeType')

  const preferredLanguage = (request.cookies[preferredLanguageCookieKey] ??
    'en') as LanguageCode

  const toPaymentObject: Record<string, unknown> = {
    order
  }

  if (storeType === 'moneris-checkout') {
    const monerisCheckout = await import(
      '../helpers/stores/moneris-checkout.js'
    )
    const ticket = await monerisCheckout.preloadRequest(
      order,
      preferredLanguage
    )

    if (ticket) {
      toPaymentObject.ticket = ticket
    } else {
      response.redirect(getProperty('reverseProxy.urlPrefix') + '/order/error')
      return
    }
  }

  response.render('toPayment', toPaymentObject)
}
