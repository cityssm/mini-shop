interface MonerisCheckout_Address {

  /**
   * 50-character alphanumeric
   */
  address_1: string;

  /**
   * 50-character alphanumeric
   */
  address_2: string;

  /**
   * 50-character alphanumeric
   */
  city: string;

  /**
   * 2-character alphanumeric
   */
  province: string;

  /**
   * 2-character alphanumeric
   */
  country: string;

  /**
   * 20-character alphanumeric
   */
  postal_code: string;
}

interface MonerisCheckout_Contact {

  /**
   * 30-character alphanumeric
   */
  first_name: string;

  /**
   * 30-character alphanumeric
   */
  last_name: string;

  /**
   * 255-character alphanumeric
   */
  email: string;

  /**
   * 30-character alphanumeric
   */
  phone: string;
}

interface MonerisCheckout_Cart {
  items: {
    /**
     * URL that corresponds to the image Moneris Checkout shopping cart item.
     */
    url: string;

    /**
     * 200-character alphanumeric
     */
    description: string;

    /**
     * SKU
     * 50-character alphanumeric
     */
    product_code: string;

    unit_cost: string;

    /**
     * 6-digit max
     */
    quantity: string;

  }[];

  /**
  * Total dollar amount of the shopping cart, before taxes.
  * 10-character decimal
  */
  subtotal: string;

  tax: {
    amount: string;
    description: string;

    /**
    * Percentage tax rate charged.
    * Between 0 and 100.
    * Up to 3 decimal places.
    */
    rate: string;
  }
}

interface MonerisCheckout_Recur {

  /**
   * The number of times that the transaction must recur
   * Between 1 and 999
   */
  number_of_recurs: string;

  /**
   * Number of recur unit intervals that must pass between recurring billings.
   * Between 1 and 999
   */
  recur_period: string;

  recur_amount: string;
  recur_unit: "day" | "week" | "month" | "eom";

  /**
   * Date of the first future recurring billing transaction.
   * YYYY/MM/DD
   */
  start_date: string;

  bill_now: "true" | "false";
}

interface MonerisCheckout_Request {
  store_id: string;
  api_token: string;
  checkout_id: string;
  /** Request Type */
  action: "preload" | "receipt";
  environment: "qa" | "prod";
}

export interface MonerisCheckout_PreloadRequest extends MonerisCheckout_Request {

  action: "preload";

  /**
   * Transaction Amount
   * The total dollar amount of the transaction.
   * 10-character decimal
   */
  txn_total: string;

  /**
   * Order Number
   * 50-character alphanumeric
   */
  order_no?: string;

  /**
   * Customer ID
   * 50-character alphanumeric
   */
  cust_id?: string;

  /**
   * Appears on the credit card statement appended to the merchant's business name.
   * 22-character alphanumeric
   * Starts with "/"
   */
  dynamic_descriptor?: string;

  language?: "en" | "fr";

  recur?: MonerisCheckout_Recur;
  cart?: MonerisCheckout_Cart;
  contact_details?: MonerisCheckout_Contact;
  shipping_details?: MonerisCheckout_Address;
  billing_details?: MonerisCheckout_Address;
}

export interface MonerisCheckout_PreloadResponse {
  response: {
    success: "true" | "false";
    ticket?: string;
    error?: {
      [preloadField: string]: {
        data: string;
      }
    };
  }
}

export interface MonerisCheckout_ReceiptRequest extends MonerisCheckout_Request {
  action: "receipt";
  ticket: string;
}

export interface MonerisCheckout_ReceiptResponse {
  response: {
    success: "true" | "false";
    request: {
      txn_total: string;
      cc_total: string;
      ticket: string;
      cust_id: string;
      dynamic_descriptor: string;
      order_no: string;

      /**
       * The e-commerce indicator or crypt type that was used to process the transaction.
       * Possible values are:
       * 5 - Authenticated e-commerce transaction (3-D Secure)
       * 6 - Non-authenticated e-commerce transaction (3-D Secure)
       * 7 - SSL-enabled merchant
       */
      eci: "5" | "6" | "7";

      cust_info: MonerisCheckout_Contact;
      shipping: MonerisCheckout_Address;
      billing: MonerisCheckout_Address;
      recur: MonerisCheckout_Recur;
      cart: MonerisCheckout_Cart;
      cc: {
        first6last4: string;
        expiry: string;
        cardholder: string;
      };
    };
    receipt: {

    };
  }
}
