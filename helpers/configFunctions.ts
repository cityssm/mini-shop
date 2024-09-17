import debug from 'debug'
import type * as sqlTypes from 'mssql'
import { v4 as uuidv4 } from 'uuid'

import type * as configTypes from '../types/configTypes'

const debugConfig = debug('mini-shop:configFunctions')

/*
 * LOAD CONFIGURATION
 */

let config: configTypes.Config = {}

try {
  // eslint-disable-next-line unicorn/no-await-expression-member
  config = (await import('../data/config.js')).config
} catch {
  // eslint-disable-next-line unicorn/no-await-expression-member
  config = (await import('../data/config-sample.js')).config
  debugConfig('No "data/config.js" found, using "data/config-sample.js".')
}

Object.freeze(config)

/*
 * SET UP FALLBACK VALUES
 */

const configOverrides: Record<string, unknown> = {}

const configFallbackValues = new Map<string, unknown>()

configFallbackValues.set('application.applicationName', 'Mini Shop')
configFallbackValues.set('application.httpPort', 7777)

configFallbackValues.set('reverseProxy.disableCompression', false)
configFallbackValues.set('reverseProxy.disableEtag', false)
configFallbackValues.set('reverseProxy.blockViaXForwardedFor', false)
configFallbackValues.set('reverseProxy.urlPrefix', '')

configFallbackValues.set('orderNumberFunction', () => {
  return 'RCT-' + uuidv4().toUpperCase()
})

configFallbackValues.set('site.header.backgroundColorClass', 'info')

configFallbackValues.set('site.footer.isVisible', true)
configFallbackValues.set('site.footer.backgroundColorClass', 'dark')
configFallbackValues.set('site.footer.textColorClass', 'light')
configFallbackValues.set('site.footer.footerEjs', 'site_thanks.ejs')

configFallbackValues.set('views.products.title', 'Products')
configFallbackValues.set('views.checkout.title', 'Checkout')
configFallbackValues.set('views.checkout_shipping.title', 'Shipping Details')

configFallbackValues.set('views.order.title', 'Order Summary')
configFallbackValues.set('views.order.headerEjs', 'order_print.ejs')

configFallbackValues.set(
  'views.toPayment.headerEjs',
  'toPayment_redirecting.ejs'
)

configFallbackValues.set('fees', {})
configFallbackValues.set('products', {})
configFallbackValues.set('productHandlers', [])

configFallbackValues.set('currency.code', 'CAD')
configFallbackValues.set('currency.currencyName', 'Canadian Dollars')

configFallbackValues.set('settings.checkout_includeCaptcha', true)

export function getProperty(propertyName: 'application.httpPort'): number
export function getProperty(
  propertyName: 'application.https'
): configTypes.ConfigHTTPSConfig

export function getProperty(
  propertyName: 'reverseProxy.disableCompression'
): boolean
export function getProperty(propertyName: 'reverseProxy.disableEtag'): boolean
export function getProperty(
  propertyName: 'reverseProxy.blockViaXForwardedFor'
): boolean
export function getProperty(propertyName: 'reverseProxy.urlPrefix'): ''

export function getProperty(propertyName: 'mssqlConfig'): sqlTypes.config

export function getProperty(propertyName: 'orderNumberFunction'): () => string

export function getProperty(
  propertyName: 'site.header.backgroundColorClass'
): () => string

export function getProperty(
  propertyName: 'site.footer.isVisible'
): () => boolean
export function getProperty(
  propertyName: 'site.footer.backgroundColorClass'
): () => string
export function getProperty(
  propertyName: 'site.footer.textColorClass'
): () => string
export function getProperty(propertyName: 'site.footer.footerEjs'): () => string

export function getProperty(propertyName: 'views.products.title'): () => string
export function getProperty(propertyName: 'views.checkout.title'): () => string
export function getProperty(
  propertyName: 'views.checkout_shipping.title'
): () => string

export function getProperty(
  propertyName: 'views.toPayment.headerEjs'
): () => string

export function getProperty(propertyName: 'views.order.title'): () => string
export function getProperty(propertyName: 'views.order.headerEjs'): () => string

export function getProperty(propertyName: 'currency.code'): () => string
export function getProperty(propertyName: 'currency.currencyName'): () => string

export function getProperty(propertyName: 'store'): configTypes.StoreConfigs
export function getProperty(
  propertyName: 'store.storeType'
): configTypes.StoreTypes

export function getProperty(
  propertyName: 'fees'
): Record<string, configTypes.ConfigFeeDefinition>
export function getProperty(
  propertyName: 'products'
): Record<string, configTypes.ConfigProduct>
export function getProperty(
  propertyName: 'productHandlers'
): configTypes.ProductHandlers[]

export function getProperty(
  propertyName: 'settings.checkout_includeCaptcha'
): boolean

export function getProperty(propertyName: string): unknown {
  if (Object.prototype.hasOwnProperty.call(configOverrides, propertyName)) {
    return configOverrides[propertyName]
  }

  const propertyNameSplit = propertyName.split('.')

  let currentObject = config

  for (const propertyNamePiece of propertyNameSplit) {
    if (
      Object.prototype.hasOwnProperty.call(currentObject, propertyNamePiece)
    ) {
      currentObject = currentObject[propertyNamePiece]
      continue
    }

    return configFallbackValues.get(propertyName)
  }

  return currentObject
}

/*
 * SET OVERRIDES
 */

export function overrideProperty(
  propertyName: 'reverseProxy.urlPrefix',
  propertyValue: string
): void

export function overrideProperty(
  propertyName: string,
  propertyValue: unknown
): void {
  configOverrides[propertyName] = propertyValue
}

/*
 * SPECIAL RETURNS
 */

const clientSideProducts: Record<string, configTypes.ConfigProduct> = {}

export function getClientSideProduct(
  productSKU: string
): configTypes.ConfigProduct {
  if (Object.keys(clientSideProducts).length === 0) {
    const serverSideProducts = getProperty('products')

    for (const serverProductSKU of Object.keys(serverSideProducts)) {
      const serverSideProduct = serverSideProducts[serverProductSKU]

      clientSideProducts[serverProductSKU] = {
        productName: serverSideProduct.productName,
        price: serverSideProduct.price,
        image: serverSideProduct.image,
        fees: serverSideProduct.fees || [],
        formFieldsToSave: serverSideProduct.formFieldsToSave
      }
    }
  }

  return clientSideProducts[productSKU]
}
