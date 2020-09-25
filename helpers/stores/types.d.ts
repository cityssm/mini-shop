export declare type StoreValidatorErrorMessage = "noHandler" | "missingOrderNumber" | "missingOrderSecret";
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
