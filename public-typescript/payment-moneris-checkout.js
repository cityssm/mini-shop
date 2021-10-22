(function () {
    var urlPrefix = document.querySelector("main").dataset.urlPrefix;
    var checkoutDivID = "monerisCheckout";
    var checkoutElement = document.querySelector("#" + checkoutDivID);
    var checkoutEnvironment = checkoutElement.dataset.environment;
    var checkoutTicket = checkoutElement.dataset.ticket;
    var checkout = new monerisCheckout();
    var pageLoadedCallback = function (callbackResponse) {
        console.log(callbackResponse);
    };
    var cancelTransactionCallback = function () {
        checkout.closeCheckout();
        window.location.href = urlPrefix + "/checkout";
    };
    var errorEventCallback = function (callbackResponse) {
        console.log(callbackResponse);
    };
    var paymentReceiptCallback = function (callbackResponse) {
        console.log(callbackResponse);
    };
    var paymentCompleteCallback = function () {
        document.querySelector("#form--fromPayment").submit();
    };
    checkout.setCallback("page_loaded", pageLoadedCallback);
    checkout.setCallback("cancel_transaction", cancelTransactionCallback);
    checkout.setCallback("error_event", errorEventCallback);
    checkout.setCallback("payment_receipt", paymentReceiptCallback);
    checkout.setCallback("payment_complete", paymentCompleteCallback);
    checkout.setMode(checkoutEnvironment);
    checkout.setCheckoutDiv(checkoutDivID);
    window.setTimeout(function () {
        checkout.startCheckout(checkoutTicket);
    }, 1500);
})();
