"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
(function () {
    var cartGlobal = window.exports.cart;
    var isSubmitting = false;
    var productFormElement = document.querySelector("#form--product");
    productFormElement.addEventListener("submit", function (formEvent) {
        formEvent.preventDefault();
        if (isSubmitting) {
            return;
        }
        isSubmitting = true;
        var success = cartGlobal.add(productFormElement);
        if (success) {
            productFormElement.reset();
            document.querySelector("#modal--success").classList.add("is-active");
            document.querySelector("html").classList.add("is-clipped");
            document.querySelector("#successButton--checkout").focus();
        }
        else {
            isSubmitting = false;
            cityssm.alertModal("The Cart is Full", "You cannot add anymore items to your cart.", "OK", "warning");
        }
    });
})();
