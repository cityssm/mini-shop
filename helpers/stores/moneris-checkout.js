import fetch from "node-fetch";
import * as configFunctions from "../../helpers/configFunctions.js";
import Debug from "debug";
const debug = Debug("mini-shop:stores:moneris-checkout");
const checkoutConfig = configFunctions.getProperty("store");
const requestURL = checkoutConfig.storeConfig.environment === "qa"
    ? "https://gatewayt.moneris.com/chkt/request/request.php"
    : "https://gateway.moneris.com/chkt/request/request.php;";
export const preloadRequest = async (order) => {
    const contact_details = {
        first_name: order.shippingName,
        last_name: "",
        email: order.shippingEmailAddress,
        phone: order.shippingPhoneNumberDay
    };
    if (order.shippingName.length > 30) {
        contact_details.first_name = "";
        let populateFirstName = true;
        const orderNameSplit = order.shippingName.split(" ");
        for (const orderNamePiece of orderNameSplit) {
            if (populateFirstName) {
                if ((contact_details.first_name + " " + orderNamePiece).length <= 30) {
                    contact_details.first_name = (contact_details.first_name + " " + orderNamePiece).trim();
                    continue;
                }
                else if (contact_details.first_name === "") {
                    contact_details.first_name = orderNamePiece.slice(0, 30);
                    populateFirstName = false;
                    continue;
                }
                else {
                    populateFirstName = false;
                }
            }
            else {
                if ((contact_details.last_name + " " + orderNamePiece).length <= 30) {
                    contact_details.last_name = (contact_details.last_name + " " + orderNamePiece).trim();
                    continue;
                }
                else if (contact_details.last_name === "") {
                    contact_details.last_name = orderNamePiece.slice(0, 30);
                }
                break;
            }
        }
    }
    const shippingBilling_details = {
        address_1: (order.shippingAddress1 || "").slice(0, 50),
        address_2: (order.shippingAddress2 || "").slice(0, 50),
        city: (order.shippingCity || "").slice(0, 50),
        province: (order.shippingProvince || "").slice(0, 2),
        country: (order.shippingCountry || "").slice(0, 2),
        postal_code: (order.shippingPostalCode || "").slice(0, 20)
    };
    const cartItems = [];
    let cartSubtotal = 0;
    for (const orderItem of order.items) {
        const product = configFunctions.getClientSideProduct(orderItem.productSKU);
        const cartItem = {
            url: "",
            description: product.productName.slice(0, 200),
            product_code: orderItem.productSKU.slice(0, 50),
            unit_cost: orderItem.unitPrice.toFixed(2),
            quantity: orderItem.quantity.toString()
        };
        cartSubtotal += orderItem.unitPrice * orderItem.quantity;
        cartItems.push(cartItem);
    }
    for (const orderFee of order.fees) {
        const fee = configFunctions.getProperty("fees")[orderFee.feeName];
        const cartItem = {
            url: "",
            description: fee.feeName.slice(0, 200),
            product_code: orderFee.feeName.slice(0, 50),
            unit_cost: orderFee.feeTotal.toFixed(2),
            quantity: "1"
        };
        cartSubtotal += orderFee.feeTotal;
        cartItems.push(cartItem);
    }
    const preloadJSON = {
        store_id: checkoutConfig.storeConfig.store_id,
        api_token: checkoutConfig.storeConfig.api_token,
        checkout_id: checkoutConfig.storeConfig.checkout_id,
        environment: checkoutConfig.storeConfig.environment,
        action: "preload",
        order_no: order.orderNumber,
        contact_details,
        shipping_details: shippingBilling_details,
        billing_details: shippingBilling_details,
        txn_total: cartSubtotal.toFixed(2),
        cart: {
            items: cartItems,
            subtotal: cartSubtotal.toFixed(2),
            tax: {
                amount: "0.00",
                description: "",
                rate: "0.00"
            }
        }
    };
    const response = await fetch(requestURL, {
        method: "post",
        body: JSON.stringify(preloadJSON),
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
        debug("Response returned a non-OK response.");
        return false;
    }
    const responseData = (await response.json());
    if (responseData.response.success === "true") {
        return responseData.response.ticket;
    }
    debug(responseData.response.error);
    return false;
};
