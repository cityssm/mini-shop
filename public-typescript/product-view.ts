/* eslint-disable unicorn/filename-case */

import type * as globalTypes from "../types/globalTypes";
import type * as cityssmTypes from "@cityssm/bulma-webapp-js/src/types";


declare const cityssm: cityssmTypes.cityssmGlobal;


(() => {

  const cartGlobal = window.exports.cart as globalTypes.CartGlobal;

  let isSubmitting = false;

  const productFormElement = document.querySelector("#form--product") as HTMLFormElement;

  productFormElement.addEventListener("submit", (formEvent) => {
    formEvent.preventDefault();

    if (isSubmitting) {
      return;
    }

    isSubmitting = true;

    const success = cartGlobal.add(productFormElement);

    if (success) {

      productFormElement.reset();

      document.querySelector("#modal--success").classList.add("is-active");
      document.querySelector("html").classList.add("is-clipped");

      (document.querySelector("#successButton--checkout") as HTMLButtonElement).focus();

    } else {

      isSubmitting = false;

      cityssm.alertModal("The Cart is Full",
        "You cannot add anymore items to your cart.",
        "OK",
        "warning");
    }
  });
})();
