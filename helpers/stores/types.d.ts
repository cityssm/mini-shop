export declare type StoreValidatorErrorMessage = "noHandler" | "noResult" | "missingAPIKey" | "unresponsiveAPI" | "invalidAPIResponse" | "missingOrderNumber" | "invalidOrderNumber" | "missingOrderSecret" | "paymentError" | "paymentDeclined";
export declare type StoreValidatorReturn = {
    isValid: true;
    orderNumber: string;
    orderSecret: string;
    paymentID: string;
    paymentData?: {
        [dataName: string]: string;
    };
} | {
    isValid: false;
    errorCode: StoreValidatorErrorMessage;
};
