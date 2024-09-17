(() => {
    const urlPrefix = document.querySelector("main").dataset.urlPrefix;
    const checkoutDivID = "monerisCheckout";
    const checkoutElement = document.querySelector("#" + checkoutDivID);
    const checkoutEnvironment = checkoutElement.dataset.environment;
    const checkoutTicket = checkoutElement.dataset.ticket;
    const checkout = new monerisCheckout();
    const pageLoadedCallback = (callbackResponse) => {
        console.log(callbackResponse);
    };
    const cancelTransactionCallback = () => {
        checkout.closeCheckout();
        window.location.href = urlPrefix + "/checkout";
    };
    const errorEventCallback = (callbackResponse) => {
        console.log(callbackResponse);
    };
    const paymentReceiptCallback = (callbackResponse) => {
        console.log(callbackResponse);
    };
    const paymentCompleteCallback = () => {
        document.querySelector("#form--fromPayment").submit();
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
