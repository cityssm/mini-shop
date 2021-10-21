(function () {
    var checkoutDivID = "monerisCheckout";
    var checkoutElement = document.querySelector("#" + checkoutDivID);
    var checkoutEnvironment = checkoutElement.dataset.environment;
    var checkoutTicket = checkoutElement.dataset.ticket;
    var checkout = new monerisCheckout();
    var pageLoadedCallback = function () {
    };
    var cancelTransactionCallback = function () {
    };
    var errorEventCallback = function () {
    };
    var paymentReceiptCallback = function () {
    };
    var paymentCompleteCallback = function () {
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
