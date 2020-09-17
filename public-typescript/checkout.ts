import type * as configTypes from "../types/configTypes";
import type * as recordTypes from "../types/recordTypes";


interface ProductDetails {
  products?: {
    [productSKU: string]: configTypes.Config_Product;
  };
  fees?: {
    [feeName: string]: configTypes.Config_Fee;
  };
}


(() => {

  let productDetails: ProductDetails = {};


  const cartContainerEle = document.getElementById("card--cart");


  const removeCartItemFn = (clickEvent: Event) => {

    clickEvent.preventDefault();

    const cartIndex = parseInt((clickEvent.currentTarget as HTMLButtonElement).getAttribute("data-cart-index"));

    exports.cart.remove(cartIndex);

    renderCheckoutFn();
  };


  const forEachCartItemFn = (cartItem: recordTypes.CartItem, cartIndex: number) => {

    const product: configTypes.Config_Product = productDetails.products[cartItem.productSKU];

    if (!product) {
      exports.cart.clear();
      location.reload();
    }

    const productCardContentEle = document.createElement("li");
    productCardContentEle.className = "card-content";

    productCardContentEle.innerHTML =
      "<div class=\"columns\">" +
      "<div class=\"column is-narrow\">" +
      "<button class=\"button is-inverted is-danger has-tooltip-arrow has-tooltip-right\" data-cart-index=\"" + cartIndex.toString() + "\" data-tooltip=\"Remove from Cart\" type=\"button\">" +
      "<i class=\"fas fa-times\" aria-hidden=\"true\"></i>" +
      "<span class=\"sr-only\">Remove from Cart</span>" +
      "</button>" +
      "</div>" +
      ("<div class=\"column\">" +
        "<strong class=\"container--productName\"></strong><br />" +
        "<div class=\"is-size-7 container--formFields\"></div>" +
        "</div>") +
      "<div class=\"column is-narrow column--price has-text-weight-bold\"></div>" +
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

  };


  const renderCheckoutFn = () => {

    cartContainerEle.innerHTML = "";

    const cartItems: recordTypes.CartItem[] = exports.cart.get();

    if (cartItems.length === 0) {

      cartContainerEle.classList.add("is-hidden");

      cartContainerEle.insertAdjacentHTML("beforebegin",
        "<div class=\"message is-info\">" +
        "<p class=\"message-body\">The cart is empty.</p>" +
        "</div>");

      return;
    }

    cartItems.forEach(forEachCartItemFn);

    cartContainerEle.classList.remove("is-hidden");
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


  initFn_loadProductDetails();


  // Ensure values in sessionStorage stay available
  window.setTimeout(() => {
    exports.cart.refresh();
  }, 5 * 60 * 1000);
})();
