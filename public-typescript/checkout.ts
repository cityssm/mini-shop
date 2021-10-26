import type * as configTypes from "../types/configTypes";
import type * as recordTypes from "@cityssm/mini-shop-db/types";
import type * as globalTypes from "../types/globalTypes";
import type * as cityssmTypes from "@cityssm/bulma-webapp-js/src/types";


declare const cityssm: cityssmTypes.cityssmGlobal;
declare const formToObject: (formElement: HTMLFormElement) => unknown;


interface ProductDetails {
  products?: {
    [productSKU: string]: configTypes.Config_Product;
  };
  fees?: {
    [feeName: string]: configTypes.Config_FeeDefinition;
  };
}


interface CartTotals {
  itemTotal: number;
  feeTotals: {
    [feeName: string]: number;
  };
}


(() => {

  const urlPrefix = document.querySelector("main").getAttribute("data-url-prefix");

  const cartGlobal = window.exports.cart as globalTypes.CartGlobal;

  let productDetails: ProductDetails = {};

  const cartContainerElement = document.querySelector("#card--cart") as HTMLElement;
  const cartTotalContainerElement = document.querySelector("#container--cartTotal") as HTMLElement;
  const shippingFormElement = document.querySelector("#form--shipping") as HTMLFormElement;

  let cartTotals: CartTotals = {
    itemTotal: 0,
    feeTotals: {}
  };

  let cartItems: recordTypes.CartItem[] = [];


  const removeCartItemFunction = (clickEvent: Event) => {

    clickEvent.preventDefault();

    const cartIndex = Number.parseInt((clickEvent.currentTarget as HTMLButtonElement).getAttribute("data-cart-index"), 10);

    const cartItem = cartItems[cartIndex];
    const product = productDetails.products[cartItem.productSKU];

    cityssm.confirmModal("Remove \"" + product.productName + "\"?",
      "Are you sure you want to remove this item from your cart?",
      "Yes, Remove It",
      "warning",
      () => {
        cartGlobal.remove(cartIndex);
        renderCheckoutFunction();
      });
  };


  const forEachFunction_renderCartItems_calculateTotals =
    (cartItem: recordTypes.CartItem, cartIndex: number) => {

      const product: configTypes.Config_Product = productDetails.products[cartItem.productSKU];

      if (!product) {
        cartGlobal.clear();
        location.reload();
      }

      /*
       * Cart Item
       */

      const productCardContentElement = document.createElement("li");
      productCardContentElement.className = "card-content";

      productCardContentElement.innerHTML =
        "<div class=\"columns\">" +
        ("<div class=\"column is-narrow has-text-right\">" +
          "<button class=\"button is-inverted is-danger has-tooltip-arrow has-tooltip-right has-tooltip-hidden-mobile\"" +
          " data-cart-index=\"" + cartIndex.toString() + "\" data-tooltip=\"Remove from Cart\" type=\"button\" aria-label=\"Remove from Cart\">" +
          "<i class=\"fas fa-times\" aria-hidden=\"true\"></i>" +
          "<span class=\"is-hidden-tablet ml-2\">Remove from Cart</span>" +
          "</button>" +
          "</div>") +
        ("<div class=\"column\">" +
          "<strong class=\"container--productName\"></strong><br />" +
          "<div class=\"is-size-7 container--formFields\"></div>" +
          "</div>") +
        "<div class=\"column is-narrow column--quantity has-text-right\"></div>" +
        "<div class=\"column is-narrow column--price has-text-weight-bold has-text-right\"></div>" +
        "</div>";

      productCardContentElement.querySelector("button").addEventListener("click", removeCartItemFunction);

      (productCardContentElement.querySelector(".container--productName") as HTMLElement)
        .textContent = product.productName;

      if (product.formFieldsToSave && product.formFieldsToSave.length > 0) {

        const formFieldsElement = productCardContentElement.querySelector(".container--formFields") as HTMLElement;

        for (const formFieldToSave of product.formFieldsToSave) {

          if (cartItem[formFieldToSave.formFieldName]) {

            formFieldsElement.insertAdjacentHTML("beforeend", "<strong>" + formFieldToSave.fieldName + ":</strong> ");

            const spanElement = document.createElement("span");
            spanElement.textContent = cartItem[formFieldToSave.formFieldName];

            formFieldsElement.append(spanElement);

            formFieldsElement.insertAdjacentHTML("beforeend", "<br />");
          }
        }
      }

      const quantityColumnElement = productCardContentElement.querySelector(".column--quantity") as HTMLDivElement;

      const unitPrice = (typeof (product.price) === "number" ? product.price : Number.parseFloat(cartItem.unitPrice));

      quantityColumnElement.textContent =
        cartItem.quantity +
        " × $" + unitPrice.toFixed(2);

      const itemTotal = unitPrice * Number.parseInt(cartItem.quantity, 10);

      const priceColumnElement = productCardContentElement.querySelector(".column--price") as HTMLDivElement;

      priceColumnElement.textContent = "$" + itemTotal.toFixed(2);

      cartContainerElement.append(productCardContentElement);

      /*
       * Cart Totals
       */

      cartTotals.itemTotal += itemTotal;

      if (product.feeTotals && Object.keys(product.feeTotals).length > 0) {

        for (const feeName of Object.keys(product.feeTotals)) {
          cartTotals.feeTotals[feeName] =
            (cartTotals.feeTotals[feeName] || 0) + product.feeTotals[feeName];
        }
      }
    };


  const renderCheckoutFunction = () => {

    // Reset cart

    cityssm.clearElement(cartContainerElement);
    cityssm.clearElement(cartTotalContainerElement);

    cartTotals = {
      itemTotal: 0,
      feeTotals: {}
    };

    cartItems = cartGlobal.get().cartItems;

    // Render items

    if (cartItems.length === 0) {

      cartContainerElement.classList.add("is-hidden");
      shippingFormElement.classList.add("is-hidden");
      document.querySelector("#button--clearCart").classList.add("is-hidden");

      cartContainerElement.insertAdjacentHTML("beforebegin",
        "<div class=\"message is-info\">" +
        ("<div class=\"message-body has-text-centered\">" +
          "<p class=\"has-text-weight-bold\">The cart is empty.</p>" +
          "<p><a href=\"" + cityssm.escapeHTML(urlPrefix) + "/products\">View Available Products</a></p>" +
          "</div>") +
        "</div>");

    } else {

      cartItems.forEach(forEachFunction_renderCartItems_calculateTotals);
      cartContainerElement.classList.remove("is-hidden");
      shippingFormElement.classList.remove("is-hidden");
    }

    // Render total

    let cartTotal = cartTotals.itemTotal;

    if (Object.keys(cartTotals.feeTotals).length > 0) {

      cartTotalContainerElement.insertAdjacentHTML("beforeend",
        "<div class=\"has-text-weight-bold\">Subtotal: $" + cartTotals.itemTotal.toFixed(2) + "</div>");

      for (const feeName of Object.keys(cartTotals.feeTotals)) {

        cartTotalContainerElement.insertAdjacentHTML("beforeend",
          "<div>" + productDetails.fees[feeName].feeName + ": $" + cartTotals.feeTotals[feeName].toFixed(2) + "</div>");
        cartTotal += cartTotals.feeTotals[feeName];
      }
    }

    cartTotalContainerElement.insertAdjacentHTML("beforeend",
      "<div class=\"is-size-4 has-text-weight-bold\">Total: $" + cartTotal.toFixed(2) + "</div>");

    cartTotalContainerElement.insertAdjacentHTML("beforeend",
      "<div class=\"is-size-7 has-text-weight-bold\">Prices in " + cityssm.escapeHTML(cartTotalContainerElement.getAttribute("data-currency")) + "</div>");
  };


  const initFunction_getDistinctProductSKUs = () => {

    const productSKUs: Set<string> = new Set();

    const cart: Array<{ productSKU: string;[formFieldName: string]: string }> = cartGlobal.get().cartItems;

    for (const cartProduct of cart) {
      productSKUs.add(cartProduct.productSKU);
    }

    return Array.from(productSKUs);
  };


  const initFunction_loadProductDetails = () => {

    const productSKUs = initFunction_getDistinctProductSKUs().join(",");

    if (productSKUs === "") {
      renderCheckoutFunction();
      return;
    }

    fetch(urlPrefix + "/checkout/doGetProductDetails", {
      method: "POST",
      body: new URLSearchParams({
        productSKUs
      })
    })
      .then(async (response) => {
        return await response.json();
      })
      .then((responseProductDetails: ProductDetails) => {
        productDetails = responseProductDetails;
        renderCheckoutFunction();
        return;
      })
      .catch(() => {
        // ignore
      });
  };


  let formIsSubmitting = false;


  shippingFormElement.addEventListener("submit", (formEvent) => {
    formEvent.preventDefault();

    if (formIsSubmitting) {
      return;
    }

    formIsSubmitting = true;

    const formObject = formToObject(shippingFormElement) as recordTypes.ShippingForm;

    formObject.cartItems = cartGlobal.get().cartItems;

    fetch(urlPrefix + "/checkout/doCreateOrder", {
      method: "POST",
      body: JSON.stringify(formObject),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(async (response) => {
        return await response.json();
      })
      .then((responseOrderNumbers: { success: boolean; orderNumber?: string; orderSecret?: string }) => {

        formIsSubmitting = false;

        if (responseOrderNumbers.success) {
          (document.querySelector("#toPayment_orderNumber") as HTMLInputElement).value = responseOrderNumbers.orderNumber;
          (document.querySelector("#toPayment_orderSecret") as HTMLInputElement).value = responseOrderNumbers.orderSecret;

          cartGlobal.cacheContact();

          (document.querySelector("#form--toPayment") as HTMLFormElement).submit();

        } else {

          cityssm.alertModal("Order Error",
            "An error occurred while trying to create your order. Please try again.",
            "OK",
            "danger");

        }

        return;
      })
      .catch(() => {
        cityssm.alertModal("Order Error",
          "An error occurred while trying to create your order. Please try again.",
          "OK",
          "danger");

        formIsSubmitting = false;
      });
  });


  // Initialize page
  initFunction_loadProductDetails();

  if (cartGlobal.get().fullName !== "") {

    const shippingForm = cartGlobal.get();

    (document.querySelector("#shipping_fullName") as HTMLInputElement).value = shippingForm.fullName;
    (document.querySelector("#shipping_address") as HTMLInputElement).value = shippingForm.address;
    (document.querySelector("#shipping_address2") as HTMLInputElement).value = shippingForm.address2;
    (document.querySelector("#shipping_city") as HTMLInputElement).value = shippingForm.city;
    (document.querySelector("#shipping_province") as HTMLInputElement).value = shippingForm.province;
    (document.querySelector("#shipping_country") as HTMLInputElement).value = shippingForm.country;
    (document.querySelector("#shipping_postalCode") as HTMLInputElement).value = shippingForm.postalCode;
    (document.querySelector("#shipping_phoneNumberDay") as HTMLInputElement).value = shippingForm.phoneNumberDay;
    (document.querySelector("#shipping_phoneNumberEvening") as HTMLInputElement).value = shippingForm.phoneNumberEvening;
    (document.querySelector("#shipping_emailAddress") as HTMLInputElement).value = shippingForm.emailAddress;
  }


  document.querySelector("#button--clearCart").addEventListener("click", () => {

    cityssm.confirmModal("Clear Cart?",
      "Are you sure you want to remove all items from your cart?",
      "Yes, Clear the Cart",
      "warning",
      () => {
        cartGlobal.clear();
        renderCheckoutFunction();
      });
  });


  // Ensure values in sessionStorage stay available
  window.setTimeout(() => {
    cartGlobal.refresh();
  }, 5 * 60 * 1000);
})();
