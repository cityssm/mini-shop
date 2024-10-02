import { Configurator } from '@cityssm/configurator'
import debug from 'debug'
import iso639, { type LanguageCode } from 'iso-639-1'
import type * as sqlTypes from 'mssql'
import { v4 as uuidv4 } from 'uuid'

import type * as configTypes from '../types/configTypes.js'

import { getStringByLanguage } from './translationHelpers.js'

const debugConfig = debug('mini-shop:configFunctions')

const defaultValues = {
  'application.applicationName': 'Mini Shop' as
    | string
    | configTypes.StringWithTranslations,
  'application.httpPort': 7777,

  'reverseProxy.disableCompression': false,
  'reverseProxy.disableEtag': false,
  'reverseProxy.blockViaXForwardedFor': false,
  'reverseProxy.urlPrefix': '',

  mssqlConfig: undefined as unknown as sqlTypes.config,

  languages: [] as LanguageCode[],

  orderNumberFunction: () => {
    return 'RCT-' + uuidv4().toUpperCase()
  },

  'site.header.backgroundColorClass': 'info',

  'site.footer.isVisible': true,
  'site.footer.backgroundColorClass': 'dark',
  'site.footer.textColorClass': 'light',
  'site.footer.footerEjs': 'site_thanks.ejs',

  'views.products.title': 'Products',

  'views.checkout.title': {
    en: 'Checkout',
    fr: 'Paiement'
  },

  'views.checkout_shipping.title': 'Shipping Details',

  'views.order.title': {
    en: 'Order Summary',
    fr: 'Récapitulation'
  },
  'views.order.headerEjs': 'order_print.ejs',

  'views.toPayment.headerEjs': 'toPayment_redirecting.ejs',

  fees: {} as unknown as Record<string, configTypes.ConfigFeeDefinition>,
  products: {} as unknown as Record<string, configTypes.ConfigProduct>,
  productHandlers: [] as configTypes.ProductHandlers[],

  store: undefined as unknown as configTypes.StoreConfigs,
  'store.storeType': undefined as unknown as configTypes.StoreTypes,

  'currency.code': 'CAD',
  'currency.currencyName': {
    en: 'Canadian Dollars',
    fr: 'Dollars canadiens'
  },

  'settings.checkout_includeCaptcha': true
}

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

const configurator = new Configurator(
  defaultValues,
  config as unknown as Record<string, unknown>
)

/*
 * SET UP FALLBACK VALUES
 */

const configOverrides: Record<string, unknown> = {}

export function getProperty<K extends keyof typeof defaultValues>(
  propertyName: K,
  fallbackValue?: (typeof defaultValues)[K]
): (typeof defaultValues)[K] {
  if (Object.hasOwn(configOverrides, propertyName)) {
    return configOverrides[propertyName] as (typeof defaultValues)[K]
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return configurator.getConfigProperty(
    propertyName,
    fallbackValue
  ) as (typeof defaultValues)[K]
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

export function getPropertyByLanguage<K extends keyof typeof defaultValues>(
  propertyName: K,
  preferredLanguage: LanguageCode = 'en'
): string | undefined {
  const languageStringProperty = getProperty(propertyName) as
    | string
    | configTypes.StringWithTranslations
    | undefined

  return getStringByLanguage(languageStringProperty, preferredLanguage)
}

export function getLanguages(): string[][] {
  const configLanguages = getProperty('languages')

  const languages: string[][] = []

  for (const configLanguage of configLanguages) {
    languages.push([
      configLanguage,
      iso639.getNativeName(configLanguage) ?? configLanguage
    ])
  }

  return languages
}
