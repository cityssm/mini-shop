import type { LanguageCode } from 'iso-639-1'
import type * as sqlTypes from 'mssql'

type BulmaColors =
  | 'white'
  | 'black'
  | 'light'
  | 'dark'
  | 'primary'
  | 'link'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'

// eslint-disable-next-line no-secrets/no-secrets
export type ProductHandlers = 'ssm-ticket_parking/doIsTagNumberEligible'

export type StringWithTranslations = Partial<Record<LanguageCode, string>>

export interface Config {
  application?: {
    httpPort?: number
    https?: ConfigHTTPSConfig
    applicationName?: string | StringWithTranslations
  }

  reverseProxy?: {
    disableCompression: boolean
    disableEtag: boolean
    blockViaXForwardedFor: boolean
    urlPrefix: string
  }

  mssqlConfig?: sqlTypes.config

  languages?: LanguageCode[]

  orderNumberFunction?: () => string

  site?: {
    header?: {
      backgroundColorClass?: BulmaColors
      logoImagePath?: string
    }
    footer?: {
      isVisible?: boolean
      backgroundColorClass?: BulmaColors
      textColorClass?: BulmaColors
      footerEjs?: string
    }
  }

  views?: {
    products?: ConfigViewDefinition
    checkout?: ConfigViewDefinition
    checkout_shipping?: ConfigViewDefinition
    toPayment?: ConfigViewDefinition
    order?: ConfigViewDefinition
  }

  productCategories?: Array<{
    categoryName: string | StringWithTranslations
    categoryEjs?: string
    productSKUs: string[]
  }>

  products?: Record<string, ConfigProduct>

  productHandlers?: ProductHandlers[]

  fees?: Record<string, ConfigFeeDefinition>

  currency?: {
    code: string
    currencyName: string | StringWithTranslations
  }

  store?: StoreConfigs

  settings?: {
    checkout_includeCaptcha?: boolean
  }
}

interface StoreConfig {
  storeType: StoreTypes
  storeConfig?: Record<string, unknown>
}

export type StoreTypes = 'moneris-checkout' | 'testing-free'

export type StoreConfigs = StoreConfigMonerisCheckout | StoreConfigTestingFree

export interface StoreConfigMonerisCheckout extends StoreConfig {
  storeType: 'moneris-checkout'
  storeConfig: {
    store_id: string
    api_token: string
    checkout_id: string
    environment: 'qa' | 'prod'
  }
}

interface StoreConfigTestingFree extends StoreConfig {
  storeType: 'testing-free'
}

export interface ConfigHTTPSConfig {
  port: number
  keyPath: string
  certPath: string
  passphrase?: string
}

export interface ConfigViewDefinition {
  title?: string | StringWithTranslations
  headerEjs?: string
  footerEjs?: string
}

export interface ConfigProduct {
  productName?: string | StringWithTranslations
  description?: string | StringWithTranslations
  data?: Record<string, unknown>
  image?: {
    path: string
    dimensionClass:
      | 'square'
      | '1by1'
      | '5by4'
      | '4by3'
      | '3by2'
      | '5by3'
      | '16by9'
      | '2by1'
      | '3by1'
  }
  price: number | 'form'
  formFieldsToSave?: Array<{
    fieldName?: string | StringWithTranslations
    // formFieldName maxlength = 30
    formFieldName: string
  }>
  identifierFormFieldName?: string
  fees?: string[]
  productEjs?: string
  feeTotals?: Record<string, number>
  hasDownload?: boolean
}

export interface ConfigFeeDefinition {
  feeName?: string | StringWithTranslations
  feeCalculation: (product: ConfigProduct) => number
}
