import type * as configTypes from "../types/configTypes";
import type * as recordTypes from "../types/recordTypes";
import type * as cityssmTypes from "@cityssm/bulma-webapp-js/src/types";


declare const cityssm: cityssmTypes.cityssmGlobal;
declare const formToObject: (formEle: HTMLFormElement) => {};


interface ProductDetails {
  products?: {
    [productSKU: string]: configTypes.Config_Product;
  };
  fees?: {
    [feeName: string]: configTypes.Config_Fee;
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

  let productDetails: ProductDetails = {};

  const cartContainerEle = document.getElementById("card--cart");
  const cartTotalContainerEle = document.getElementById("container--cartTotal");
  const shippingFormEle = document.getElementById("form--shipping") as HTMLFormElement;

  let cartTotals: CartTotals = {
    itemTotal: 0,
    feeTotals: {}
  };

  let cartItems: recordTypes.CartItem[] = [];


  const removeCartItemFn = (clickEvent: Event) => {

    clickEvent.preventDefault();

    const cartIndex = parseInt((clickEvent.currentTarget as HTMLButtonElement).getAttribute("data-cart-index"), 10);

    const cartItem = cartItems[cartIndex];
    const product = productDetails.products[cartItem.productSKU];

    cityssm.confirmModal("Remove \"" + product.productName + "\"?",
      "Are you sure you want to remove this item from your cart?",
      "Yes, Remove It",
      "warning",
      () => {
        exports.cart.remove(cartIndex);
        renderCheckoutFn();
      });
  };


  const forEachFn_renderCartItems_calculateTotals =
    (cartItem: recordTypes.CartItem, cartIndex: number) => {

      const product: configTypes.Config_Product = productDetails.products[cartItem.productSKU];

      if (!product) {
        exports.cart.clear();
        location.reload();
      }

      /*
       * Cart Item
       */

      const productCardContentEle = document.createElement("li");
      productCardContentEle.className = "card-content";

      productCardContentEle.innerHTML =
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

      productCardContentEle.getElementsByTagName("button")[0].addEventListener("click", removeCartItemFn);

      (productCardContentEle.getElementsByClassName("container--productName")[0] as HTMLElement)
        .innerText = product.productName;

      if (product.formFieldsToSave && product.formFieldsToSave.length > 0) {

        const formFieldsEle = productCardContentEle.getElementsByClassName("container--formFields")[0] as HTMLElement;

        for (const formFieldToSave of product.formFieldsToSave) {

          if (cartItem[formFieldToSave.formFieldName]) {

            formFieldsEle.insertAdjacentHTML("beforeend", "<strong>" + formFieldToSave.fieldName + ":</strong> ");

            const spanEle = document.createElement("span");
            spanEle.innerText = cartItem[formFieldToSave.formFieldName];

            formFieldsEle.appendChild(spanEle);

            formFieldsEle.insertAdjacentHTML("beforeend", "<br />");
          }
        }
      }

      const quantityColumnEle = productCardContentEle.getElementsByClassName("column--quantity")[0] as HTMLDivElement;

      quantityColumnEle.innerText =
        cartItem.quantity +
        " × $" + product.price.toFixed(2);

      const itemTotal = product.price * parseInt(cartItem.quantity, 10);

      const priceColumnEle = productCardContentEle.getElementsByClassName("column--price")[0] as HTMLDivElement;

      priceColumnEle.innerText = "$" + itemTotal.toFixed(2);

      cartContainerEle.appendChild(productCardContentEle);

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


  const renderCheckoutFn = () => {

    // Reset cart

    cityssm.clearElement(cartContainerEle);
    cityssm.clearElement(cartTotalContainerEle);

    cartTotals = {
      itemTotal: 0,
      feeTotals: {}
    };

    cartItems = exports.cart.get();

    // Render items

    if (cartItems.length === 0) {

      cartContainerEle.classList.add("is-hidden");
      shippingFormEle.classList.add("is-hidden");
      document.getElementById("button--clearCart").classList.add("is-hidden");

      cartContainerEle.insertAdjacentHTML("beforebegin",
        "<div class=\"message is-info\">" +
        ("<div class=\"message-body has-text-centered\">" +
          "<p class=\"has-text-weight-bold\">The cart is empty.</p>" +
          "<p><a href=\"" + cityssm.escapeHTML(urlPrefix) + "/products\">View Available Products</a></p>" +
          "</div>") +
        "</div>");

    } else {

      cartItems.forEach(forEachFn_renderCartItems_calculateTotals);
      cartContainerEle.classList.remove("is-hidden");
      shippingFormEle.classList.remove("is-hidden");
    }

    // Render total

    let cartTotal = cartTotals.itemTotal;

    if (Object.keys(cartTotals.feeTotals).length > 0) {

      cartTotalContainerEle.insertAdjacentHTML("beforeend",
        "<div class=\"has-text-weight-bold\">Subtotal: $" + cartTotals.itemTotal.toFixed(2) + "</div>");

      for (const feeName of Object.keys(cartTotals.feeTotals)) {

        cartTotalContainerEle.insertAdjacentHTML("beforeend",
          "<div>" + productDetails.fees[feeName].feeName + ": $" + cartTotals.feeTotals[feeName].toFixed(2) + "</div>");
        cartTotal += cartTotals.feeTotals[feeName];
      }
    }

    cartTotalContainerEle.insertAdjacentHTML("beforeend",
      "<div class=\"is-size-4 has-text-weight-bold\">Total: $" + cartTotal.toFixed(2) + "</div>");

    cartTotalContainerEle.insertAdjacentHTML("beforeend",
      "<div class=\"is-size-7 has-text-weight-bold\">Prices in " + cityssm.escapeHTML(cartTotalContainerEle.getAttribute("data-currency")) + "</div>");
  };


  const initFn_getDistinctProductSKUs = () => {

    const productSKUs: Set<string> = new Set();

    const cart: Array<{ productSKU: string;[formFieldName: string]: string }> = exports.cart.get();

    for (const cartProduct of cart) {
      productSKUs.add(cartProduct.productSKU);
    }

    return Array.from(productSKUs);
  };


  const initFn_loadProductDetails = () => {

    const productSKUs = initFn_getDistinctProductSKUs().join(",");

    if (productSKUs === "") {
      renderCheckoutFn();
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
        renderCheckoutFn();
      })
      .catch(() => {

      });
  };


  let formIsSubmitting = false;


  shippingFormEle.addEventListener("submit", (formEvent) => {
    formEvent.preventDefault();

    if (formIsSubmitting) {
      return;
    }

    formIsSubmitting = true;

    const formObj = formToObject(shippingFormEle) as recordTypes.ShippingForm;

    formObj.cartItems = exports.cart.get();

    fetch(urlPrefix + "/checkout/doCreateOrder", {
      method: "POST",
      body: JSON.stringify(formObj),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(async (response) => {
        return await response.json();
      })
      .then((responseOrderNumbers: { success: boolean; orderNumber?: string; orderSecret?: string }) => {

        if (responseOrderNumbers.success) {
          (document.getElementById("toPayment_orderNumber") as HTMLInputElement).value = responseOrderNumbers.orderNumber;
          (document.getElementById("toPayment_orderSecret") as HTMLInputElement).value = responseOrderNumbers.orderSecret;

          (document.getElementById("form--toPayment") as HTMLFormElement).submit();

        } else {

          cityssm.alertModal("Order Error",
            "An error occurred while trying to create your order. Please try again.",
            "OK",
            "danger");

          formIsSubmitting = false;
        }
      })
      .catch((_e) => {
        cityssm.alertModal("Order Error",
          "An error occurred while trying to create your order. Please try again.",
          "OK",
          "danger");

        formIsSubmitting = false;
      });
  });


  // Initialize page
  initFn_loadProductDetails();


  document.getElementById("button--clearCart").addEventListener("click", () => {

    cityssm.confirmModal("Clear Cart?",
      "Are you sure you want to remove all items from your cart?",
      "Yes, Clear the Cart",
      "warning",
      () => {
        exports.cart.clear();
        renderCheckoutFn();
      });
  });


  // Ensure values in sessionStorage stay available
  window.setTimeout(() => {
    exports.cart.refresh();
  }, 5 * 60 * 1000);
})();
