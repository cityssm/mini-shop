import type * as configTypes from "../types/configTypes";
import type * as recordTypes from "../types/recordTypes";
import type * as cityssmTypes from "@cityssm/bulma-webapp-js/src/types";


declare const cityssm: cityssmTypes.cityssmGlobal;


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

  let productDetails: ProductDetails = {};


  const cartContainerEle = document.getElementById("card--cart");
  const cartTotalContainerEle = document.getElementById("container--cartTotal");

  let cartTotals: CartTotals = {
    itemTotal: 0,
    feeTotals: {}
  };


  const removeCartItemFn = (clickEvent: Event) => {

    clickEvent.preventDefault();

    const cartIndex = parseInt((clickEvent.currentTarget as HTMLButtonElement).getAttribute("data-cart-index"));

    const cartItem = exports.cart.get()[cartIndex] as recordTypes.CartItem;
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
          " data-cart-index=\"" + cartIndex.toString() + "\" data-tooltip=\"Remove from Cart\" type=\"button\">" +
          "<i class=\"fas fa-times\" aria-hidden=\"true\"></i>" +
          "<span class=\"is-hidden-tablet ml-2\">Remove from Cart</span>" +
          "</button>" +
          "</div>") +
        ("<div class=\"column\">" +
          "<strong class=\"container--productName\"></strong><br />" +
          "<div class=\"is-size-7 container--formFields\"></div>" +
          "</div>") +
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

      const priceColumnEle = productCardContentEle.getElementsByClassName("column--price")[0] as HTMLDivElement;
      priceColumnEle.innerText = "$" + product.price.toFixed(2);

      cartContainerEle.appendChild(productCardContentEle);

      /*
       * Cart Totals
       */

      cartTotals.itemTotal += product.price;

      if (product.feeTotals && Object.keys(product.feeTotals).length > 0) {

        for (const feeName of Object.keys(product.feeTotals)) {
          cartTotals.feeTotals[feeName] =
            (cartTotals.feeTotals[feeName] || 0) + product.feeTotals[feeName];
        }
      }
    };


  const renderCheckoutFn = () => {

    cityssm.clearElement(cartContainerEle);
    cityssm.clearElement(cartTotalContainerEle);

    cartTotals = {
      itemTotal: 0,
      feeTotals: {}
    };

    const cartItems: recordTypes.CartItem[] = exports.cart.get();

    // Render items

    if (cartItems.length === 0) {

      cartContainerEle.classList.add("is-hidden");

      cartContainerEle.insertAdjacentHTML("beforebegin",
        "<div class=\"message is-info\">" +
        ("<div class=\"message-body has-text-centered\">" +
          "<p class=\"has-text-weight-bold\">The cart is empty.</p>" +
          "<p><a href=\"/products\">View Available Products</a></p>" +
          "</div>") +
        "</div>");

    } else {

      cartItems.forEach(forEachFn_renderCartItems_calculateTotals);
      cartContainerEle.classList.remove("is-hidden");
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

    fetch("/checkout/doGetProductDetails", {
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
