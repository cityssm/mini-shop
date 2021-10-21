/* */

import type * as recordTypes from "@cityssm/mini-shop-db/types";
import type * as globalTypes from "../types/globalTypes";

declare const formToObject: (formElement: HTMLFormElement) => Record<string, unknown>;


window.exports.cart = (() => {

  const SESSION_STORAGE_KEY = "miniShopCart";
  const CART_MAX_SIZE = 255;

  let cart: recordTypes.CartItem[] = sessionStorage.getItem(SESSION_STORAGE_KEY)
    ? JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY))
    : [];

  if (!cart) {
    cart = [];
  }

  const toStorageFunction = () => {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(cart));
  };

  const renderCartButtonFunction = () => {

    const cartCountTagElement = document.querySelector("#tag--cartCount");

    if (cart.length === 0) {
      cartCountTagElement.classList.add("is-hidden");

    } else {
      cartCountTagElement.textContent = cart.length.toString();
      cartCountTagElement.classList.remove("is-hidden");
    }
  };

  renderCartButtonFunction();

  const addFunction =
    (productFormElement: HTMLFormElement) => {

      if (cart.length >= CART_MAX_SIZE) {
        return false;
      }

      const formObject = formToObject(productFormElement) as recordTypes.CartItem;

      cart.push(formObject);
      toStorageFunction();
      renderCartButtonFunction();

      return true;
    };

  const removeFunction = (cartIndex: number) => {
    cart.splice(cartIndex, 1);
    toStorageFunction();
    renderCartButtonFunction();
  };


  const clearFunction = () => {
    cart = [];
    toStorageFunction();
    renderCartButtonFunction();
  };


  const cartGlobal: globalTypes.CartGlobal = {
    add: addFunction,
    remove: removeFunction,
    clear: clearFunction,
    get: () => {
      return cart;
    },
    refresh: toStorageFunction
  };

  return cartGlobal;
})();
