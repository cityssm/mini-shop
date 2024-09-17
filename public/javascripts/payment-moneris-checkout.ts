declare const monerisCheckout;


type CallbackNames = "page_loaded" | "cancel_transaction" | "error_event" | "payment_receipt" | "payment_complete" | "page_closed" | "payment_submitted";

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


(() => {

  const urlPrefix = document.querySelector("main").dataset.urlPrefix;
  // const callbackResponseCode_success = "001";

  const checkoutDivID = "monerisCheckout";

  const checkoutElement = document.querySelector("#" + checkoutDivID) as HTMLElement;

  const checkoutEnvironment = checkoutElement.dataset.environment as "qa" | "prod";
  const checkoutTicket = checkoutElement.dataset.ticket;

  const checkout = new monerisCheckout() as MonerisCheckoutObject;

  const pageLoadedCallback = (callbackResponse: MonerisCheckoutCallbackResponse) => {
    console.log(callbackResponse);
  };

  const cancelTransactionCallback = () => {
    checkout.closeCheckout();
    window.location.href = urlPrefix + "/checkout";
  };

  const errorEventCallback = (callbackResponse: MonerisCheckoutCallbackResponse) => {
    console.log(callbackResponse);
  };

  const paymentReceiptCallback = (callbackResponse: MonerisCheckoutCallbackResponse) => {
    console.log(callbackResponse);
  };

  const paymentCompleteCallback = () => {
    (document.querySelector("#form--fromPayment") as HTMLFormElement).submit();
  };

  checkout.setCallback("page_loaded", pageLoadedCallback);
  checkout.setCallback("cancel_transaction", cancelTransactionCallback);
  checkout.setCallback("error_event", errorEventCallback);
  checkout.setCallback("payment_receipt", paymentReceiptCallback);
  checkout.setCallback("payment_complete", paymentCompleteCallback);

  checkout.setMode(checkoutEnvironment);
  checkout.setCheckoutDiv(checkoutDivID);

  window.setTimeout(() => {
    checkout.startCheckout(checkoutTicket);
  }, 1500);
})();
