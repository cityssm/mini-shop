export interface TransactionRecord {

  transactionGUID: string;
  transactionDate: number;
  transactionTime: number;
  ipAddress: string;

  civicNumber: string;
  streetName: string;

  permitType: "new" | "renew_4yr" | "renew_1yr";
  expiryDate: number;

  ownerName: string;
  phoneNumber: string;
  emailAddress: string;

  transactionAmount: number;

  paymentCardHolder?: string;
  paymentChargeTotal?: number;
  paymentBankTransactionID?: string;

  securityGUID: string;

  recordCreate_timeMillis: number;
  recordUpdate_timeMillis: number;
  recordLock_timeMillis: number;
  recordDelete_timeMillis?: number;
}


export interface MonerisResponse {
  response_order_id: string;
  result: string;
  card: string;
  cardholder: string;
  charge_total: string;
  bank_transaction_id: string;
  rvar_sGUID: string;
}


export interface CartItem {
  productSKU: string;
  [formFieldName: string]: string;
}
