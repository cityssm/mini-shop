export const validate = (req) => {
    const orderNumber = req.body.orderNumber;
    if (!orderNumber || orderNumber === "") {
        return {
            isValid: false,
            errorCode: "missingOrderNumber"
        };
    }
    const orderSecret = req.body.orderSecret;
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
