/* */

import type * as recordTypes from "@cityssm/mini-shop-db/types";
import type * as globalTypes from "../types/globalTypes";

declare const formToObject: (formElement: HTMLFormElement) => Record<string, unknown>;


window.exports.cart = (() => {

  const SESSION_STORAGE_KEY = "miniShopCart";
  const CART_MAX_SIZE = 255;

  let shippingForm: recordTypes.ShippingForm = sessionStorage.getItem(SESSION_STORAGE_KEY)
    ? JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY))
    : undefined;

  if (!shippingForm || !Object.prototype.hasOwnProperty.call(shippingForm, "fullName")) {
    shippingForm = {
      fullName: "",
      address: "",
      address2: "",
      city: "",
      province: "",
      country: "",
      postalCode: "",
      phoneNumberDay: "",
      phoneNumberEvening: "",
      emailAddress: "",
      cartItems: []
    };
  }

  const toStorageFunction = () => {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(shippingForm));
  };

  const renderCartButtonFunction = () => {

    const cartCountTagElement = document.querySelector("#tag--cartCount");

    if (shippingForm.cartItems.length === 0) {
      cartCountTagElement.classList.add("is-hidden");

    } else {
      cartCountTagElement.textContent = shippingForm.cartItems.length.toString();
      cartCountTagElement.classList.remove("is-hidden");
    }
  };

  renderCartButtonFunction();

  const addFunction =
    (productFormElement: HTMLFormElement) => {

      if (shippingForm.cartItems.length >= CART_MAX_SIZE) {
        return false;
      }

      const formObject = formToObject(productFormElement) as recordTypes.CartItem;

      shippingForm.cartItems.push(formObject);
      toStorageFunction();
      renderCartButtonFunction();

      return true;
    };

  const removeFunction = (cartIndex: number) => {
    shippingForm.cartItems.splice(cartIndex, 1);
    toStorageFunction();
    renderCartButtonFunction();
  };


  const clearFunction = () => {
    shippingForm = {
      fullName: "",
      address: "",
      address2: "",
      city: "",
      province: "",
      country: "",
      postalCode: "",
      phoneNumberDay: "",
      phoneNumberEvening: "",
      emailAddress: "",
      cartItems: []
    };
    toStorageFunction();
    renderCartButtonFunction();
  };


  const cacheContactFunction = () => {
    try {

      shippingForm.fullName = (document.querySelector("#shipping_fullName") as HTMLInputElement).value;
      shippingForm.address = (document.querySelector("#shipping_address") as HTMLInputElement).value;
      shippingForm.address2 = (document.querySelector("#shipping_address2") as HTMLInputElement).value;
      shippingForm.city = (document.querySelector("#shipping_city") as HTMLInputElement).value;
      shippingForm.province = (document.querySelector("#shipping_province") as HTMLInputElement).value;
      shippingForm.country = (document.querySelector("#shipping_country") as HTMLInputElement).value;
      shippingForm.postalCode = (document.querySelector("#shipping_postalCode") as HTMLInputElement).value;
      shippingForm.phoneNumberDay = (document.querySelector("#shipping_phoneNumberDay") as HTMLInputElement).value;
      shippingForm.phoneNumberEvening = (document.querySelector("#shipping_phoneNumberEvening") as HTMLInputElement).value;
      shippingForm.emailAddress = (document.querySelector("#shipping_emailAddress") as HTMLInputElement).value;
      toStorageFunction();
    } catch {
      // ignore
    }
  };


  const cartGlobal: globalTypes.CartGlobal = {
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
