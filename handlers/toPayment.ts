import { getOrder as miniShopDB_getOrder } from '@cityssm/mini-shop-db'
import type { RequestHandler } from 'express'
import type { LanguageCode } from 'iso-639-1'

import * as configFunctions from '../helpers/configFunctions.js'
import { preferredLanguageCookieKey } from '../helpers/translationHelpers.js'

export const handler: RequestHandler = async (request, response) => {
  const orderNumber: string = request.body.orderNumber
  const orderSecret: string = request.body.orderSecret

  const order = await miniShopDB_getOrder(orderNumber, orderSecret, false)

  if (!order) {
    response.render('toPayment-expired')
    return
  }

  const storeType = configFunctions.getProperty('store.storeType')

  const preferredLanguage = (request.cookies[preferredLanguageCookieKey] ?? 'en') as LanguageCode

  const toPaymentObject: Record<string, unknown> = {
    order
  }

  if (storeType === 'moneris-checkout') {
    const monerisCheckout = await import(
      '../helpers/stores/moneris-checkout.js'
    )
    const ticket = await monerisCheckout.preloadRequest(order, preferredLanguage)

    if (ticket) {
      toPaymentObject.ticket = ticket
    } else {
      response.redirect(
        configFunctions.getProperty('reverseProxy.urlPrefix') + '/order/error'
      )
      return
    }
  }

  response.render('toPayment', toPaymentObject)
}
