export function validate(request) {
    const orderNumber = request.body.orderNumber;
    if ((orderNumber ?? '') === '') {
        return {
            isValid: false,
            errorCode: 'missingOrderNumber'
        };
    }
    const orderSecret = request.body.orderSecret;
    if ((orderSecret ?? '') === '') {
        return {
            isValid: false,
            errorCode: 'missingOrderSecret'
        };
    }
    return {
        isValid: true,
        orderNumber: orderNumber,
        orderSecret: orderSecret,
        paymentID: orderNumber
    };
}
