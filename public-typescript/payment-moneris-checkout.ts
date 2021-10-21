declare const monerisCheckout;

type CallbackNames = "page_loaded" | "cancel_transaction" | "error_event" | "payment_receipt" | "payment_complete";

interface MonerisCheckoutObject {
  setMode: (environment: "qa" | "prod") => void;
  setCallback: (callbackName: CallbackNames, callbackFunction: () => void) => void;
  setCheckoutDiv: (divID: string) => void;
  startCheckout: (ticket: string) => void;
}


(() => {

  const checkoutDivID = "monerisCheckout";

  const checkoutElement = document.querySelector("#" + checkoutDivID) as HTMLElement;

  const checkoutEnvironment = checkoutElement.dataset.environment as "qa" | "prod";
  const checkoutTicket = checkoutElement.dataset.ticket;

  const checkout = new monerisCheckout() as MonerisCheckoutObject;

  const pageLoadedCallback = () => {

  };

  const cancelTransactionCallback = () => {

  };

  const errorEventCallback = () => {

  };

  const paymentReceiptCallback = () => {

  };

  const paymentCompleteCallback = () => {

  };

  checkout.setCallback("page_loaded", pageLoadedCallback);
  checkout.setCallback("cancel_transaction", cancelTransactionCallback);
  checkout.setCallback("error_event", errorEventCallback);
  checkout.setCallback("payment_receipt", paymentReceiptCallback);
  checkout.setCallback("payment_complete", paymentCompleteCallback);

  checkout.setMode(checkoutEnvironment);
  checkout.setCheckoutDiv(checkoutDivID);

  checkout.startCheckout(checkoutTicket);
})();
