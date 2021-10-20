import { getOrderNumberBySecret } from "@cityssm/mini-shop-db";
export const validate = async (request) => {
    const monerisResponse = request.body;
    const resultCode = monerisResponse.result;
    if (!resultCode) {
        return {
            isValid: false,
            errorCode: "noResult"
        };
    }
    if (resultCode !== "1") {
        return {
            isValid: false,
            errorCode: "paymentDeclined"
        };
    }
    const orderNumberForm = monerisResponse.response_order_id;
    if (!orderNumberForm || orderNumberForm === "") {
        return {
            isValid: false,
            errorCode: "missingOrderNumber"
        };
    }
    const orderSecret = monerisResponse.rvarSecret;
    if (!orderSecret || orderSecret === "") {
        return {
            isValid: false,
            errorCode: "missingOrderSecret"
        };
    }
    const orderNumberDB = await getOrderNumberBySecret(orderSecret);
    if (!orderNumberDB || !orderNumberForm.includes(orderNumberDB)) {
        return {
            isValid: false,
            errorCode: "invalidOrderNumber"
        };
    }
    return {
        isValid: true,
        orderNumber: orderNumberDB,
        orderSecret,
        paymentID: monerisResponse.bank_transaction_id,
        paymentData: {
            response_code: monerisResponse.response_code,
            bank_approval_code: monerisResponse.bank_approval_code,
            cardholder: monerisResponse.cardholder,
            card: monerisResponse.card,
            f4l4: monerisResponse.f4l4,
            charge_total: request.body.charge_total
        }
    };
};
