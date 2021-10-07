export const validate = (request) => {
    const orderNumber = request.body.orderNumber;
    if (!orderNumber || orderNumber === "") {
        return {
            isValid: false,
            errorCode: "missingOrderNumber"
        };
    }
    const orderSecret = request.body.orderSecret;
    if (!orderSecret || orderSecret === "") {
        return {
            isValid: false,
            errorCode: "missingOrderSecret"
        };
    }
    return {
        isValid: true,
        orderNumber,
        orderSecret,
        paymentID: orderNumber
    };
};
