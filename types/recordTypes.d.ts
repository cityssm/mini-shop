export interface MonerisResponse {
    response_order_id: string;
    result: string;
    card: string;
    cardholder: string;
    charge_total: string;
    bank_transaction_id: string;
    rvar_sGUID: string;
}
export interface ShippingForm {
    fullName: string;
    address: string;
    address2: string;
    city: string;
    province: string;
    country: string;
    postalCode: string;
    phoneNumberDay: string;
    phoneNumberEvening: string;
    emailAddress: string;
    cartItems: CartItem[];
}
export interface CartItem {
    productSKU: string;
    quantity: string;
    [formFieldName: string]: string;
}
export interface Order {
    orderID: number;
    orderNumber: string;
    orderSecret: string;
    orderTime: Date;
    shippingName: string;
    shippingAddress1: string;
    shippingAddress2?: string;
    shippingCity: string;
    shippingProvince: string;
    shippingCountry: string;
    shippingPostalCode: string;
    shippingPhoneNumberDay: string;
    shippingPhoneNumberEvening?: string;
    shippingEmailAddress: string;
    paymentID?: string;
    paymentTime?: Date;
    items?: Array<{
        itemIndex: number;
        productSKU: string;
        unitPrice: number;
        quantity: number;
        itemTotal: number;
    }>;
    fees?: Array<{
        feeName: string;
        feeTotal: number;
    }>;
    paymentData?: Array<{
        dataName: string;
        dataValue: string;
    }>;
}
