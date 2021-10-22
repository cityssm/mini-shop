export type StoreValidatorErrorMessage =
  "noHandler" | "noResult" |
  "missingAPIKey" | "unresponsiveAPI" | "invalidAPIResponse" |
  "missingOrderNumber" | "invalidOrderNumber" |
  "missingOrderSecret" |
  "paymentDeclined";

export type StoreValidatorReturn = {
  isValid: true;
  orderNumber: string;
  orderSecret: string;
  paymentID: string;
  paymentData?: { [dataName: string]: string };
} | {
  isValid: false;
  errorCode: StoreValidatorErrorMessage;
};
