"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
(() => {
    let productDetails = {};
    const cartContainerEle = document.getElementById("card--cart");
    const cartTotalContainerEle = document.getElementById("container--cartTotal");
    const shippingFormEle = document.getElementById("form--shipping");
    let cartTotals = {
        itemTotal: 0,
        feeTotals: {}
    };
    const removeCartItemFn = (clickEvent) => {
        clickEvent.preventDefault();
        const cartIndex = parseInt(clickEvent.currentTarget.getAttribute("data-cart-index"));
        const cartItem = exports.cart.get()[cartIndex];
        const product = productDetails.products[cartItem.productSKU];
        cityssm.confirmModal("Remove \"" + product.productName + "\"?", "Are you sure you want to remove this item from your cart?", "Yes, Remove It", "warning", () => {
            exports.cart.remove(cartIndex);
            renderCheckoutFn();
        });
    };
    const forEachFn_renderCartItems_calculateTotals = (cartItem, cartIndex) => {
        const product = productDetails.products[cartItem.productSKU];
        if (!product) {
            exports.cart.clear();
            location.reload();
        }
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
                "<div class=\"column is-narrow column--quantity has-text-right\"></div>" +
                "<div class=\"column is-narrow column--price has-text-weight-bold has-text-right\"></div>" +
                "</div>";
        productCardContentEle.getElementsByTagName("button")[0].addEventListener("click", removeCartItemFn);
        productCardContentEle.getElementsByClassName("container--productName")[0]
            .innerText = product.productName;
        if (product.formFieldsToSave && product.formFieldsToSave.length > 0) {
            const formFieldsEle = productCardContentEle.getElementsByClassName("container--formFields")[0];
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
        const quantityColumnEle = productCardContentEle.getElementsByClassName("column--quantity")[0];
        quantityColumnEle.innerText =
            cartItem.quantity +
                " × $" + product.price.toFixed(2);
        const itemTotal = product.price * parseInt(cartItem.quantity);
        const priceColumnEle = productCardContentEle.getElementsByClassName("column--price")[0];
        priceColumnEle.innerText = "$" + itemTotal.toFixed(2);
        cartContainerEle.appendChild(productCardContentEle);
        cartTotals.itemTotal += itemTotal;
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
        const cartItems = exports.cart.get();
        if (cartItems.length === 0) {
            cartContainerEle.classList.add("is-hidden");
            shippingFormEle.classList.add("is-hidden");
            cartContainerEle.insertAdjacentHTML("beforebegin", "<div class=\"message is-info\">" +
                ("<div class=\"message-body has-text-centered\">" +
                    "<p class=\"has-text-weight-bold\">The cart is empty.</p>" +
                    "<p><a href=\"/products\">View Available Products</a></p>" +
                    "</div>") +
                "</div>");
        }
        else {
            cartItems.forEach(forEachFn_renderCartItems_calculateTotals);
            cartContainerEle.classList.remove("is-hidden");
            shippingFormEle.classList.remove("is-hidden");
        }
        let cartTotal = cartTotals.itemTotal;
        if (Object.keys(cartTotals.feeTotals).length > 0) {
            cartTotalContainerEle.insertAdjacentHTML("beforeend", "<div class=\"has-text-weight-bold\">Subtotal: $" + cartTotals.itemTotal.toFixed(2) + "</div>");
            for (const feeName of Object.keys(cartTotals.feeTotals)) {
                cartTotalContainerEle.insertAdjacentHTML("beforeend", "<div>" + productDetails.fees[feeName].feeName + ": $" + cartTotals.feeTotals[feeName].toFixed(2) + "</div>");
                cartTotal += cartTotals.feeTotals[feeName];
            }
        }
        cartTotalContainerEle.insertAdjacentHTML("beforeend", "<div class=\"is-size-4 has-text-weight-bold\">Total: $" + cartTotal.toFixed(2) + "</div>");
    };
    const initFn_getDistinctProductSKUs = () => {
        const productSKUs = new Set();
        const cart = exports.cart.get();
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
            .then((response) => __awaiter(void 0, void 0, void 0, function* () {
            return yield response.json();
        }))
            .then((responseProductDetails) => {
            productDetails = responseProductDetails;
            renderCheckoutFn();
        })
            .catch(() => {
        });
    };
    shippingFormEle.addEventListener("submit", (formEvent) => {
        formEvent.preventDefault();
        const formObj = formToObject(shippingFormEle);
        formObj.cartItems = exports.cart.get();
        fetch("/checkout/doCreateOrder", {
            method: "POST",
            body: JSON.stringify(formObj),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => __awaiter(void 0, void 0, void 0, function* () {
            return yield response.json();
        }))
            .then((responseOrderNumbers) => {
            document.getElementById("toPayment_orderNumber").value = responseOrderNumbers.orderNumber;
            document.getElementById("toPayment_orderSecret").value = responseOrderNumbers.orderSecret;
            document.getElementById("form--toPayment").submit();
        })
            .catch(() => {
        });
    });
    initFn_loadProductDetails();
    document.getElementById("button--clearCart").addEventListener("click", () => {
        cityssm.confirmModal("Clear Cart?", "Are you sure you want to remove all items from your cart?", "Yes, Clear the Cart", "warning", () => {
            exports.cart.clear();
            renderCheckoutFn();
        });
    });
    window.setTimeout(() => {
        exports.cart.refresh();
    }, 5 * 60 * 1000);
})();
