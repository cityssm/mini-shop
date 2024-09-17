interface MonerisCheckoutAddress {
  /**
   * 50-character alphanumeric
   */
  address_1: string

  /**
   * 50-character alphanumeric
   */
  address_2: string

  /**
   * 50-character alphanumeric
   */
  city: string

  /**
   * 2-character alphanumeric
   */
  province: string

  /**
   * 2-character alphanumeric
   */
  country: string

  /**
   * 20-character alphanumeric
   */
  postal_code: string
}

interface MonerisCheckoutContact {
  /**
   * 30-character alphanumeric
   */
  first_name: string

  /**
   * 30-character alphanumeric
   */
  last_name: string

  /**
   * 255-character alphanumeric
   */
  email: string

  /**
   * 30-character alphanumeric
   */
  phone: string
}

interface MonerisCheckoutCart {
  items: Array<{
    /**
     * URL that corresponds to the image Moneris Checkout shopping cart item.
     */
    url: string

    /**
     * 200-character alphanumeric
     */
    description: string

    /**
     * SKU
     * 50-character alphanumeric
     */
    product_code: string

    unit_cost: string

    /**
     * 6-digit max
     */
    quantity: string
  }>

  /**
   * Total dollar amount of the shopping cart, before taxes.
   * 10-character decimal
   */
  subtotal: string

  tax?: {
    amount: string
    description: string

    /**
     * Percentage tax rate charged.
     * Between 0 and 100.
     * Up to 3 decimal places.
     */
    rate: string
  }
}

interface MonerisCheckoutRecur {
  /**
   * The number of times that the transaction must recur
   * Between 1 and 999
   */
  number_of_recurs: string

  /**
   * Number of recur unit intervals that must pass between recurring billings.
   * Between 1 and 999
   */
  recur_period: string

  recur_amount: string
  recur_unit: 'day' | 'week' | 'month' | 'eom'

  /**
   * Date of the first future recurring billing transaction.
   * YYYY/MM/DD
   */
  start_date: string

  bill_now: 'true' | 'false'
}

interface MonerisCheckoutFraudResult {
  decision_origin: 'Moneris' | 'Merchant'
  result: string
  condition: '0' | '1'
  status:
    | 'success'
    | 'failed'
    | 'disabled'
    | 'ineligible'
    | 'failed_optional'
    | 'failed_mandatory'
  code: string
  details: string
}

interface MonerisCheckoutRequest {
  store_id: string
  api_token: string
  checkout_id: string
  /** Request Type */
  action: 'preload' | 'receipt'
  environment: 'qa' | 'prod'
}

export interface MonerisCheckoutPreloadRequest extends MonerisCheckoutRequest {
  action: 'preload'

  /**
   * Transaction Amount
   * The total dollar amount of the transaction.
   * 10-character decimal
   */
  txn_total: string

  /**
   * Order Number
   * 50-character alphanumeric
   */
  order_no?: string

  /**
   * Customer ID
   * 50-character alphanumeric
   */
  cust_id?: string

  /**
   * Appears on the credit card statement appended to the merchant's business name.
   * 22-character alphanumeric
   * Starts with "/"
   */
  dynamic_descriptor?: string

  language?: 'en' | 'fr'

  recur?: MonerisCheckoutRecur
  cart?: MonerisCheckoutCart
  contact_details?: MonerisCheckoutContact
  shipping_details?: MonerisCheckoutAddress
  billing_details?: MonerisCheckoutAddress
}

export interface MonerisCheckoutPreloadResponse {
  response: {
    success: 'true' | 'false'
    ticket?: string
    error?: Record<
      string,
      {
        data: string
      }
    >
  }
}

export interface MonerisCheckoutReceiptRequest extends MonerisCheckoutRequest {
  action: 'receipt'
  ticket: string
}

export interface MonerisCheckoutReceiptResponse {
  response: {
    success: 'true' | 'false'
    request: {
      txn_total: string
      cc_total: string
      ticket: string
      cust_id: string
      dynamic_descriptor: string
      order_no: string

      /**
       * The e-commerce indicator or crypt type that was used to process the transaction.
       * Possible values are:
       * 5 - Authenticated e-commerce transaction (3-D Secure)
       * 6 - Non-authenticated e-commerce transaction (3-D Secure)
       * 7 - SSL-enabled merchant
       */
      eci: '5' | '6' | '7'

      cust_info: MonerisCheckoutContact
      shipping: MonerisCheckoutAddress
      billing: MonerisCheckoutAddress
      recur: MonerisCheckoutRecur
      cart: MonerisCheckoutCart
      cc: {
        first6last4: string
        expiry: string
        cardholder: string
      }
      wallet: {
        type: 'applepay' | 'googlepay'
      }
      paymentData: {
        apiVersion: string
        apiVersionMinor: string
      }
    }
    receipt: {
      /** "a" = approved, "d" = declined */
      result: 'a' | 'd'
      cc: {
        order_no: string
        cust_id: string
        transaction_no: string
        reference_no: string
        transaction_code: '00' | '01' | '06'
        transaction_type: string
        /** YYYY-MM-DD HH:MM:SS */
        transaction_date_time: string
        corporateCard: string
        amount: string
        response_code: string
        iso_response_code: string
        approval_code: string
        card_type: 'V' | 'M' | 'AX' | 'DC' | 'NO' | 'SE' | 'D' | 'C1'
        wallet_type: 'applepay' | 'googlepay'
        dynamic_descriptor: string
        invoice_number: string
        customer_code: string
        eci: '5' | '6' | '7'
        cvd_result_code: string
        avs_result_code: string
        first6last4: string
        /** MMYY */
        expiry_date: string
        recur_success: 'true' | 'false'
        issuer_id: string
        is_debit: string
        ecr_no: string
        batch_no: string
        sequence_no: string
        result: 'a' | 'd'
        tokenize: {
          success: 'true' | 'false'
          first4last4: string
          data_key: string
          status: '001' | '940' | '941' | '942' | '943' | '944' | '945'
          message: string
          mcp: {
            merchant_settlement_amount: string
            cardholder_currency_code: string
            mcp_rate: string
            decimal_precision: string
            cardholder_amount: string
            cardholder_currency_desc: string
          }
        }
        fraud: {
          cvd: MonerisCheckoutFraudResult
          avs: MonerisCheckoutFraudResult
          '3d_secure': MonerisCheckoutFraudResult
          kount: MonerisCheckoutFraudResult
        }
      }
    }
  }
}
