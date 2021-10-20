"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
window.exports.cart = (function () {
    var SESSION_STORAGE_KEY = "miniShopCart";
    var CART_MAX_SIZE = 255;
    var cart = sessionStorage.getItem(SESSION_STORAGE_KEY)
        ? JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY))
        : [];
    if (!cart) {
        cart = [];
    }
    var toStorageFunction = function () {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(cart));
    };
    var renderCartButtonFunction = function () {
        var cartCountTagElement = document.querySelector("#tag--cartCount");
        if (cart.length === 0) {
            cartCountTagElement.classList.add("is-hidden");
        }
        else {
            cartCountTagElement.textContent = cart.length.toString();
            cartCountTagElement.classList.remove("is-hidden");
        }
    };
    renderCartButtonFunction();
    var addFunction = function (productFormElement) {
        if (cart.length >= CART_MAX_SIZE) {
            return false;
        }
        var formObject = formToObject(productFormElement);
        cart.push(formObject);
        toStorageFunction();
        renderCartButtonFunction();
        return true;
    };
    var removeFunction = function (cartIndex) {
        cart.splice(cartIndex, 1);
        toStorageFunction();
        renderCartButtonFunction();
    };
    var clearFunction = function () {
        cart = [];
        toStorageFunction();
        renderCartButtonFunction();
    };
    var cartGlobal = {
        add: addFunction,
        remove: removeFunction,
        clear: clearFunction,
        get: function () {
            return cart;
        },
        refresh: toStorageFunction
    };
    return cartGlobal;
})();
