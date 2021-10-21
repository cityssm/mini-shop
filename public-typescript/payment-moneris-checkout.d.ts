declare const monerisCheckout: any;
declare type CallbackNames = "page_loaded" | "cancel_transaction" | "error_event" | "payment_receipt" | "payment_complete";
interface MonerisCheckoutObject {
    setMode: (environment: "qa" | "prod") => void;
    setCallback: (callbackName: CallbackNames, callbackFunction: () => void) => void;
    setCheckoutDiv: (divID: string) => void;
    startCheckout: (ticket: string) => void;
}
