interface MonerisCheckout_Address {
    address_1: string;
    address_2: string;
    city: string;
    province: string;
    country: string;
    postal_code: string;
}
interface MonerisCheckout_Contact {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}
interface MonerisCheckout_Cart {
    items: {
        url: string;
        description: string;
        product_code: string;
        unit_cost: string;
        quantity: string;
    }[];
    subtotal: string;
    tax: {
        amount: string;
        description: string;
        rate: string;
    };
}
interface MonerisCheckout_Recur {
    number_of_recurs: string;
    recur_period: string;
    recur_amount: string;
    recur_unit: "day" | "week" | "month" | "eom";
    start_date: string;
    bill_now: "true" | "false";
}
interface MonerisCheckout_Request {
    store_id: string;
    api_token: string;
    checkout_id: string;
    action: "preload" | "receipt";
    environment: "qa" | "prod";
}
export interface MonerisCheckout_PreloadRequest extends MonerisCheckout_Request {
    action: "preload";
    txn_total: string;
    order_no?: string;
    cust_id?: string;
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
            };
        };
    };
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
        receipt: {};
    };
}
export {};
