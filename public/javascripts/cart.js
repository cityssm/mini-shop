"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
window.exports.cart = (() => {
    const SESSION_STORAGE_KEY = 'miniShopCart';
    const CART_MAX_SIZE = 255;
    let shippingForm = sessionStorage.getItem(SESSION_STORAGE_KEY)
        ? JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY))
        : undefined;
    if (!shippingForm ||
        !Object.prototype.hasOwnProperty.call(shippingForm, 'fullName')) {
        shippingForm = {
            fullName: '',
            address: '',
            address2: '',
            city: '',
            province: '',
            country: '',
            postalCode: '',
            phoneNumberDay: '',
            phoneNumberEvening: '',
            emailAddress: '',
            cartItems: []
        };
    }
    const toStorageFunction = () => {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(shippingForm));
    };
    const renderCartButtonFunction = () => {
        const cartCountTagElement = document.querySelector('#tag--cartCount');
        if (shippingForm.cartItems.length === 0) {
            cartCountTagElement.classList.add('is-hidden');
        }
        else {
            cartCountTagElement.textContent = shippingForm.cartItems.length.toString();
            cartCountTagElement.classList.remove('is-hidden');
        }
    };
    renderCartButtonFunction();
    const addFunction = (productFormElement) => {
        if (shippingForm.cartItems.length >= CART_MAX_SIZE) {
            return false;
        }
        const formObject = formToObject(productFormElement);
        shippingForm.cartItems.push(formObject);
        toStorageFunction();
        renderCartButtonFunction();
        return true;
    };
    const removeFunction = (cartIndex) => {
        shippingForm.cartItems.splice(cartIndex, 1);
        toStorageFunction();
        renderCartButtonFunction();
    };
    const clearFunction = () => {
        shippingForm = {
            fullName: '',
            address: '',
            address2: '',
            city: '',
            province: '',
            country: '',
            postalCode: '',
            phoneNumberDay: '',
            phoneNumberEvening: '',
            emailAddress: '',
            cartItems: []
        };
        toStorageFunction();
        renderCartButtonFunction();
    };
    const cacheContactFunction = () => {
        try {
            shippingForm.fullName = document.querySelector('#shipping_fullName').value;
            shippingForm.address = document.querySelector('#shipping_address').value;
            shippingForm.address2 = document.querySelector('#shipping_address2').value;
            shippingForm.city = document.querySelector('#shipping_city').value;
            shippingForm.province = document.querySelector('#shipping_province').value;
            shippingForm.country = document.querySelector('#shipping_country').value;
            shippingForm.postalCode = document.querySelector('#shipping_postalCode').value;
            shippingForm.phoneNumberDay = document.querySelector('#shipping_phoneNumberDay').value;
            shippingForm.phoneNumberEvening = document.querySelector('#shipping_phoneNumberEvening').value;
            shippingForm.emailAddress = document.querySelector('#shipping_emailAddress').value;
            toStorageFunction();
        }
        catch {
        }
    };
    const cartGlobal = {
        add: addFunction,
        remove: removeFunction,
        clear: clearFunction,
        get: () => {
            return shippingForm;
        },
        refresh: toStorageFunction,
        cacheContact: cacheContactFunction
    };
    return cartGlobal;
})();
