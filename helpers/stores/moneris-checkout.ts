import { getOrderNumberBySecret } from '@cityssm/mini-shop-db'
import type { Order } from '@cityssm/mini-shop-db/types.js'
import Debug from 'debug'
import type { Request } from 'express'
import type { LanguageCode } from 'iso-639-1'
import fetch from 'node-fetch'

import * as configFunctions from '../../helpers/configFunctions.js'
import type {
  MonerisCheckoutPreloadRequest,
  MonerisCheckoutPreloadResponse,
  MonerisCheckoutReceiptRequest,
  MonerisCheckoutReceiptResponse
} from '../../types/storeTypes.js'
import { getStringByLanguage } from '../translationHelpers.js'

import type { StoreValidatorReturn } from './types.js'

const debug = Debug('mini-shop:stores:moneris-checkout')

const checkoutConfig = configFunctions.getProperty(
  'store'
)

const requestURL =
  checkoutConfig.storeConfig?.environment === 'qa'
    ? 'https://gatewayt.moneris.com/chkt/request/request.php'
    : 'https://gateway.moneris.com/chkt/request/request.php'

export async function preloadRequest(
  order: Order,
  preferredLanguage: LanguageCode
): Promise<false | string> {
  if (checkoutConfig.storeType !== 'moneris-checkout') {
    debug(`Invalid storeType: ${checkoutConfig.storeType}`)
    return false
  }

  /*
   * contact_details
   */
  const contact_details = {
    first_name: order.shippingName,
    last_name: '',
    email: order.shippingEmailAddress,
    phone: order.shippingPhoneNumberDay
  }

  if (order.shippingName.length > 30) {
    contact_details.first_name = ''
    let populateFirstName = true

    const orderNameSplit = order.shippingName.split(' ')

    for (const orderNamePiece of orderNameSplit) {
      if (populateFirstName) {
        if ((contact_details.first_name + ' ' + orderNamePiece).length <= 30) {
          contact_details.first_name = (
            contact_details.first_name +
            ' ' +
            orderNamePiece
          ).trim()
          continue
        } else if (contact_details.first_name === '') {
          contact_details.first_name = orderNamePiece.slice(0, 30)
          populateFirstName = false
          continue
        } else {
          populateFirstName = false
        }
      } else {
        if ((contact_details.last_name + ' ' + orderNamePiece).length <= 30) {
          contact_details.last_name = (
            contact_details.last_name +
            ' ' +
            orderNamePiece
          ).trim()
          continue
        } else if (contact_details.last_name === '') {
          contact_details.last_name = orderNamePiece.slice(0, 30)
        }

        break
      }
    }
  }

  /*
   * shipping_details, billing_details
   */
  const shippingBilling_details = {
    address_1: (order.shippingAddress1 ?? '').slice(0, 50),
    address_2: (order.shippingAddress2 ?? '').slice(0, 50),
    city: (order.shippingCity ?? '').slice(0, 50),
    province: (order.shippingProvince ?? '').slice(0, 2),
    country: (order.shippingCountry ?? '').slice(0, 2),
    postal_code: (order.shippingPostalCode ?? '').slice(0, 20)
  }

  /*
   * cart
   */
  const cartItems: Array<{
    url: string
    description: string
    product_code: string
    unit_cost: string
    quantity: string
  }> = []

  let cartSubtotal = 0

  for (const orderItem of order.items ?? []) {
    const product =
      configFunctions.getProperty('products')[orderItem.productSKU]

    let description = getStringByLanguage(
      product.productName,
      preferredLanguage
    )

    if (product.identifierFormFieldName) {
      const identifierFormField = orderItem.fields?.find((itemField) => {
        return itemField.formFieldName === product.identifierFormFieldName
      })

      if (identifierFormField) {
        description = identifierFormField.fieldValue + ' // ' + description
      }
    }

    const cartItem = {
      url: '',
      description: description?.slice(0, 200) ?? '',
      product_code: orderItem.productSKU.slice(0, 50),
      unit_cost: orderItem.unitPrice.toFixed(2),
      quantity: orderItem.quantity.toString()
    }

    cartSubtotal += orderItem.unitPrice * orderItem.quantity

    cartItems.push(cartItem)
  }

  for (const orderFee of order.fees ?? []) {
    const fee = configFunctions.getProperty('fees')[orderFee.feeName]

    const cartItem = {
      url: '',
      description:
        getStringByLanguage(fee.feeName, preferredLanguage)?.slice(0, 200) ??
        '',
      product_code: orderFee.feeName.slice(0, 50),
      unit_cost: orderFee.feeTotal.toFixed(2),
      quantity: '1'
    }

    cartSubtotal += orderFee.feeTotal

    cartItems.push(cartItem)
  }

  /*
   * Build full JSON
   */
  const preloadJSON: MonerisCheckoutPreloadRequest = {
    store_id: checkoutConfig.storeConfig.store_id,
    api_token: checkoutConfig.storeConfig.api_token,
    checkout_id: checkoutConfig.storeConfig.checkout_id,
    environment: checkoutConfig.storeConfig.environment,
    action: 'preload',
    order_no: order.orderNumber,

    language: (['en', 'fr'].includes(preferredLanguage)
      ? preferredLanguage
      : 'en') as 'en' | 'fr',

    contact_details,
    shipping_details: shippingBilling_details,
    billing_details: shippingBilling_details,
    txn_total: cartSubtotal.toFixed(2),
    cart: {
      items: cartItems,
      subtotal: cartSubtotal.toFixed(2)
    }
  }

  const response = await fetch(requestURL, {
    method: 'post',
    body: JSON.stringify(preloadJSON),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    debug('Response returned a non-OK response.')
    return false
  }

  const responseData = (await response.json()) as MonerisCheckoutPreloadResponse

  if (responseData.response.success === 'true') {
    return responseData.response.ticket
  }

  debug(responseData.response.error)
  return false
}

export async function validate(
  request: Request
): Promise<StoreValidatorReturn> {
  if (checkoutConfig.storeType !== 'moneris-checkout') {
    debug(`Invalid storeType: ${checkoutConfig.storeType}`)
    return {
      isValid: false,
      errorCode: 'invalidStoreType'
    }
  }

  const ticket = request.body.ticket as string

  // ticket is missing, fail
  if (!ticket) {
    return {
      isValid: false,
      errorCode: 'missingAPIKey'
    }
  }

  const orderNumber = request.body.orderNumber as string

  // order number is missing, fail
  if (!orderNumber) {
    return {
      isValid: false,
      errorCode: 'missingOrderNumber'
    }
  }

  const orderSecret = request.body.orderSecret as string

  // order secret is missing, fail
  if (!orderSecret) {
    return {
      isValid: false,
      errorCode: 'missingOrderSecret'
    }
  }

  const requestJSON: MonerisCheckoutReceiptRequest = {
    store_id: checkoutConfig.storeConfig.store_id,
    api_token: checkoutConfig.storeConfig.api_token,
    checkout_id: checkoutConfig.storeConfig.checkout_id,
    environment: checkoutConfig.storeConfig.environment,
    action: 'receipt',
    ticket
  }

  const response = await fetch(requestURL, {
    method: 'post',
    body: JSON.stringify(requestJSON),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // api response error, fail
  if (!response.ok) {
    return {
      isValid: false,
      errorCode: 'unresponsiveAPI'
    }
  }

  const responseData = (await response.json()) as MonerisCheckoutReceiptResponse

  debug(responseData)

  // response data invalid, fail
  if (!responseData) {
    return {
      isValid: false,
      errorCode: 'invalidAPIResponse'
    }
  }

  // transaction not successful
  // error processing, could be approved or declined
  if (responseData.response.success !== 'true') {
    return {
      isValid: false,
      errorCode: 'paymentError'
    }
  }

  // transaction not approved (i.e. declined)
  if (responseData.response.receipt.result !== 'a') {
    return {
      isValid: false,
      errorCode: 'paymentDeclined'
    }
  }

  // response order number mismatch, fail
  if (responseData.response.request.order_no !== orderNumber) {
    return {
      isValid: false,
      errorCode: 'invalidOrderNumber'
    }
  }

  const orderNumberDB = await getOrderNumberBySecret(orderSecret)

  // database order number mismatch, fail
  if (orderNumberDB !== orderNumber) {
    return {
      isValid: false,
      errorCode: 'invalidOrderNumber'
    }
  }

  // success
  return {
    isValid: true,
    orderNumber: orderNumberDB,
    orderSecret,
    paymentID: responseData.response.receipt.cc.reference_no,
    paymentData: {
      response_code: responseData.response.receipt.cc.response_code,
      approval_code: responseData.response.receipt.cc.approval_code,
      card_type: responseData.response.receipt.cc.card_type,
      first6last4: responseData.response.receipt.cc.first6last4,
      amount: responseData.response.receipt.cc.amount
    }
  }
}
