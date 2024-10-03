import { getOrderNumberBySecret } from '@cityssm/mini-shop-db';
import Debug from 'debug';
import fetch from 'node-fetch';
import * as configFunctions from '../../helpers/configFunctions.js';
import { getStringByLanguage } from '../translationHelpers.js';
const debug = Debug('mini-shop:stores:moneris-checkout');
const checkoutConfig = configFunctions.getProperty('store');
const requestURL = checkoutConfig.storeConfig?.environment === 'qa'
    ? 'https://gatewayt.moneris.com/chkt/request/request.php'
    : 'https://gateway.moneris.com/chkt/request/request.php';
export async function preloadRequest(order, preferredLanguage) {
    if (checkoutConfig.storeType !== 'moneris-checkout') {
        debug(`Invalid storeType: ${checkoutConfig.storeType}`);
        return false;
    }
    const contact_details = {
        first_name: order.shippingName,
        last_name: '',
        email: order.shippingEmailAddress,
        phone: order.shippingPhoneNumberDay
    };
    if (order.shippingName.length > 30) {
        contact_details.first_name = '';
        let populateFirstName = true;
        const orderNameSplit = order.shippingName.split(' ');
        for (const orderNamePiece of orderNameSplit) {
            if (populateFirstName) {
                if ((contact_details.first_name + ' ' + orderNamePiece).length <= 30) {
                    contact_details.first_name = (contact_details.first_name +
                        ' ' +
                        orderNamePiece).trim();
                    continue;
                }
                else if (contact_details.first_name === '') {
                    contact_details.first_name = orderNamePiece.slice(0, 30);
                    populateFirstName = false;
                    continue;
                }
                else {
                    populateFirstName = false;
                }
            }
            else {
                if ((contact_details.last_name + ' ' + orderNamePiece).length <= 30) {
                    contact_details.last_name = (contact_details.last_name +
                        ' ' +
                        orderNamePiece).trim();
                    continue;
                }
                else if (contact_details.last_name === '') {
                    contact_details.last_name = orderNamePiece.slice(0, 30);
                }
                break;
            }
        }
    }
    const shippingBilling_details = {
        address_1: (order.shippingAddress1 ?? '').slice(0, 50),
        address_2: (order.shippingAddress2 ?? '').slice(0, 50),
        city: (order.shippingCity ?? '').slice(0, 50),
        province: (order.shippingProvince ?? '').slice(0, 2),
        country: (order.shippingCountry ?? '').slice(0, 2),
        postal_code: (order.shippingPostalCode ?? '').slice(0, 20)
    };
    const cartItems = [];
    let cartSubtotal = 0;
    for (const orderItem of order.items ?? []) {
        const product = configFunctions.getProperty('products')[orderItem.productSKU];
        let description = getStringByLanguage(product.productName, preferredLanguage);
        if (product.identifierFormFieldName) {
            const identifierFormField = orderItem.fields?.find((itemField) => {
                return itemField.formFieldName === product.identifierFormFieldName;
            });
            if (identifierFormField) {
                description = identifierFormField.fieldValue + ' // ' + description;
            }
        }
        const cartItem = {
            url: '',
            description: description?.slice(0, 200) ?? '',
            product_code: orderItem.productSKU.slice(0, 50),
            unit_cost: orderItem.unitPrice.toFixed(2),
            quantity: orderItem.quantity.toString()
        };
        cartSubtotal += orderItem.unitPrice * orderItem.quantity;
        cartItems.push(cartItem);
    }
    for (const orderFee of order.fees ?? []) {
        const fee = configFunctions.getProperty('fees')[orderFee.feeName];
        const cartItem = {
            url: '',
            description: getStringByLanguage(fee.feeName, preferredLanguage)?.slice(0, 200) ??
                '',
            product_code: orderFee.feeName.slice(0, 50),
            unit_cost: orderFee.feeTotal.toFixed(2),
            quantity: '1'
        };
        cartSubtotal += orderFee.feeTotal;
        cartItems.push(cartItem);
    }
    const preloadJSON = {
        store_id: checkoutConfig.storeConfig.store_id,
        api_token: checkoutConfig.storeConfig.api_token,
        checkout_id: checkoutConfig.storeConfig.checkout_id,
        environment: checkoutConfig.storeConfig.environment,
        action: 'preload',
        order_no: order.orderNumber,
        language: (['en', 'fr'].includes(preferredLanguage)
            ? preferredLanguage
            : 'en'),
        contact_details,
        shipping_details: shippingBilling_details,
        billing_details: shippingBilling_details,
        txn_total: cartSubtotal.toFixed(2),
        cart: {
            items: cartItems,
            subtotal: cartSubtotal.toFixed(2)
        }
    };
    const response = await fetch(requestURL, {
        method: 'post',
        body: JSON.stringify(preloadJSON),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        debug('Response returned a non-OK response.');
        return false;
    }
    const responseData = (await response.json());
    if (responseData.response.success === 'true') {
        return responseData.response.ticket;
    }
    debug(responseData.response.error);
    return false;
}
export async function validate(request) {
    if (checkoutConfig.storeType !== 'moneris-checkout') {
        debug(`Invalid storeType: ${checkoutConfig.storeType}`);
        return {
            isValid: false,
            errorCode: 'invalidStoreType'
        };
    }
    const ticket = request.body.ticket;
    if (!ticket) {
        return {
            isValid: false,
            errorCode: 'missingAPIKey'
        };
    }
    const orderNumber = request.body.orderNumber;
    if (!orderNumber) {
        return {
            isValid: false,
            errorCode: 'missingOrderNumber'
        };
    }
    const orderSecret = request.body.orderSecret;
    if (!orderSecret) {
        return {
            isValid: false,
            errorCode: 'missingOrderSecret'
        };
    }
    const requestJSON = {
        store_id: checkoutConfig.storeConfig.store_id,
        api_token: checkoutConfig.storeConfig.api_token,
        checkout_id: checkoutConfig.storeConfig.checkout_id,
        environment: checkoutConfig.storeConfig.environment,
        action: 'receipt',
        ticket
    };
    const response = await fetch(requestURL, {
        method: 'post',
        body: JSON.stringify(requestJSON),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        return {
            isValid: false,
            errorCode: 'unresponsiveAPI'
        };
    }
    const responseData = (await response.json());
    debug(responseData);
    if (!responseData) {
        return {
            isValid: false,
            errorCode: 'invalidAPIResponse'
        };
    }
    if (responseData.response.success !== 'true') {
        return {
            isValid: false,
            errorCode: 'paymentError'
        };
    }
    if (responseData.response.receipt.result !== 'a') {
        return {
            isValid: false,
            errorCode: 'paymentDeclined'
        };
    }
    if (responseData.response.request.order_no !== orderNumber) {
        return {
            isValid: false,
            errorCode: 'invalidOrderNumber'
        };
    }
    const orderNumberDB = await getOrderNumberBySecret(orderSecret);
    if (orderNumberDB !== orderNumber) {
        return {
            isValid: false,
            errorCode: 'invalidOrderNumber'
        };
    }
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
    };
}
