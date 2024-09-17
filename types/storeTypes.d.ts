interface MonerisCheckoutAddress {
    address_1: string;
    address_2: string;
    city: string;
    province: string;
    country: string;
    postal_code: string;
}
interface MonerisCheckoutContact {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}
interface MonerisCheckoutCart {
    items: Array<{
        url: string;
        description: string;
        product_code: string;
        unit_cost: string;
        quantity: string;
    }>;
    subtotal: string;
    tax?: {
        amount: string;
        description: string;
        rate: string;
    };
}
interface MonerisCheckoutRecur {
    number_of_recurs: string;
    recur_period: string;
    recur_amount: string;
    recur_unit: 'day' | 'week' | 'month' | 'eom';
    start_date: string;
    bill_now: 'true' | 'false';
}
interface MonerisCheckoutFraudResult {
    decision_origin: 'Moneris' | 'Merchant';
    result: string;
    condition: '0' | '1';
    status: 'success' | 'failed' | 'disabled' | 'ineligible' | 'failed_optional' | 'failed_mandatory';
    code: string;
    details: string;
}
interface MonerisCheckoutRequest {
    store_id: string;
    api_token: string;
    checkout_id: string;
    action: 'preload' | 'receipt';
    environment: 'qa' | 'prod';
}
export interface MonerisCheckoutPreloadRequest extends MonerisCheckoutRequest {
    action: 'preload';
    txn_total: string;
    order_no?: string;
    cust_id?: string;
    dynamic_descriptor?: string;
    language?: 'en' | 'fr';
    recur?: MonerisCheckoutRecur;
    cart?: MonerisCheckoutCart;
    contact_details?: MonerisCheckoutContact;
    shipping_details?: MonerisCheckoutAddress;
    billing_details?: MonerisCheckoutAddress;
}
export interface MonerisCheckoutPreloadResponse {
    response: {
        success: 'true' | 'false';
        ticket?: string;
        error?: Record<string, {
            data: string;
        }>;
    };
}
export interface MonerisCheckoutReceiptRequest extends MonerisCheckoutRequest {
    action: 'receipt';
    ticket: string;
}
export interface MonerisCheckoutReceiptResponse {
    response: {
        success: 'true' | 'false';
        request: {
            txn_total: string;
            cc_total: string;
            ticket: string;
            cust_id: string;
            dynamic_descriptor: string;
            order_no: string;
            eci: '5' | '6' | '7';
            cust_info: MonerisCheckoutContact;
            shipping: MonerisCheckoutAddress;
            billing: MonerisCheckoutAddress;
            recur: MonerisCheckoutRecur;
            cart: MonerisCheckoutCart;
            cc: {
                first6last4: string;
                expiry: string;
                cardholder: string;
            };
            wallet: {
                type: 'applepay' | 'googlepay';
            };
            paymentData: {
                apiVersion: string;
                apiVersionMinor: string;
            };
        };
        receipt: {
            result: 'a' | 'd';
            cc: {
                order_no: string;
                cust_id: string;
                transaction_no: string;
                reference_no: string;
                transaction_code: '00' | '01' | '06';
                transaction_type: string;
                transaction_date_time: string;
                corporateCard: string;
                amount: string;
                response_code: string;
                iso_response_code: string;
                approval_code: string;
                card_type: 'V' | 'M' | 'AX' | 'DC' | 'NO' | 'SE' | 'D' | 'C1';
                wallet_type: 'applepay' | 'googlepay';
                dynamic_descriptor: string;
                invoice_number: string;
                customer_code: string;
                eci: '5' | '6' | '7';
                cvd_result_code: string;
                avs_result_code: string;
                first6last4: string;
                expiry_date: string;
                recur_success: 'true' | 'false';
                issuer_id: string;
                is_debit: string;
                ecr_no: string;
                batch_no: string;
                sequence_no: string;
                result: 'a' | 'd';
                tokenize: {
                    success: 'true' | 'false';
                    first4last4: string;
                    data_key: string;
                    status: '001' | '940' | '941' | '942' | '943' | '944' | '945';
                    message: string;
                    mcp: {
                        merchant_settlement_amount: string;
                        cardholder_currency_code: string;
                        mcp_rate: string;
                        decimal_precision: string;
                        cardholder_amount: string;
                        cardholder_currency_desc: string;
                    };
                };
                fraud: {
                    cvd: MonerisCheckoutFraudResult;
                    avs: MonerisCheckoutFraudResult;
                    '3d_secure': MonerisCheckoutFraudResult;
                    kount: MonerisCheckoutFraudResult;
                };
            };
        };
    };
}
export {};
