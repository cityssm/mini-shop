"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
(() => {
    const cartGlobal = window.exports.cart;
    let isSubmitting = false;
    const productFormElement = document.querySelector('#form--product');
    productFormElement.addEventListener('submit', (formEvent) => {
        formEvent.preventDefault();
        if (isSubmitting) {
            return;
        }
        isSubmitting = true;
        const success = cartGlobal.add(productFormElement);
        if (success) {
            productFormElement.reset();
            document.querySelector('#modal--success')?.classList.add('is-active');
            document.querySelector('html')?.classList.add('is-clipped');
            document.querySelector('#successButton--checkout').focus();
        }
        else {
            isSubmitting = false;
            cityssm.alertModal('The Cart is Full', 'You cannot add anymore items to your cart.', 'OK', 'warning');
        }
    });
})();
