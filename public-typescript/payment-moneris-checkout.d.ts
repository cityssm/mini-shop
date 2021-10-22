declare const monerisCheckout: any;
declare type CallbackNames = "page_loaded" | "cancel_transaction" | "error_event" | "payment_receipt" | "payment_complete" | "page_closed" | "payment_submitted";
interface MonerisCheckoutCallbackResponse {
    handler: CallbackNames;
    ticket: string;
    response_code: string;
}
interface MonerisCheckoutObject {
    setMode: (environment: "qa" | "prod") => void;
    setCallback: (callbackName: CallbackNames, callbackFunction: (callbackResponse: MonerisCheckoutCallbackResponse) => void) => void;
    setCheckoutDiv: (divID: string) => void;
    startCheckout: (ticket: string) => void;
    closeCheckout: () => void;
}
