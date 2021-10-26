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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
(function () {
    var urlPrefix = document.querySelector("main").getAttribute("data-url-prefix");
    var cartGlobal = window.exports.cart;
    var productDetails = {};
    var cartContainerElement = document.querySelector("#card--cart");
    var cartTotalContainerElement = document.querySelector("#container--cartTotal");
    var shippingFormElement = document.querySelector("#form--shipping");
    var cartTotals = {
        itemTotal: 0,
        feeTotals: {}
    };
    var cartItems = [];
    var removeCartItemFunction = function (clickEvent) {
        clickEvent.preventDefault();
        var cartIndex = Number.parseInt(clickEvent.currentTarget.getAttribute("data-cart-index"), 10);
        var cartItem = cartItems[cartIndex];
        var product = productDetails.products[cartItem.productSKU];
        cityssm.confirmModal("Remove \"" + product.productName + "\"?", "Are you sure you want to remove this item from your cart?", "Yes, Remove It", "warning", function () {
            cartGlobal.remove(cartIndex);
            renderCheckoutFunction();
        });
    };
    var forEachFunction_renderCartItems_calculateTotals = function (cartItem, cartIndex) {
        var product = productDetails.products[cartItem.productSKU];
        if (!product) {
            cartGlobal.clear();
            location.reload();
        }
        var productCardContentElement = document.createElement("li");
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
        productCardContentElement.querySelector(".container--productName")
            .textContent = product.productName;
        if (product.formFieldsToSave && product.formFieldsToSave.length > 0) {
            var formFieldsElement = productCardContentElement.querySelector(".container--formFields");
            for (var _i = 0, _a = product.formFieldsToSave; _i < _a.length; _i++) {
                var formFieldToSave = _a[_i];
                if (cartItem[formFieldToSave.formFieldName]) {
                    formFieldsElement.insertAdjacentHTML("beforeend", "<strong>" + formFieldToSave.fieldName + ":</strong> ");
                    var spanElement = document.createElement("span");
                    spanElement.textContent = cartItem[formFieldToSave.formFieldName];
                    formFieldsElement.append(spanElement);
                    formFieldsElement.insertAdjacentHTML("beforeend", "<br />");
                }
            }
        }
        var quantityColumnElement = productCardContentElement.querySelector(".column--quantity");
        var unitPrice = (typeof (product.price) === "number" ? product.price : Number.parseFloat(cartItem.unitPrice));
        quantityColumnElement.textContent =
            cartItem.quantity +
                " × $" + unitPrice.toFixed(2);
        var itemTotal = unitPrice * Number.parseInt(cartItem.quantity, 10);
        var priceColumnElement = productCardContentElement.querySelector(".column--price");
        priceColumnElement.textContent = "$" + itemTotal.toFixed(2);
        cartContainerElement.append(productCardContentElement);
        cartTotals.itemTotal += itemTotal;
        if (product.feeTotals && Object.keys(product.feeTotals).length > 0) {
            for (var _b = 0, _c = Object.keys(product.feeTotals); _b < _c.length; _b++) {
                var feeName = _c[_b];
                cartTotals.feeTotals[feeName] =
                    (cartTotals.feeTotals[feeName] || 0) + product.feeTotals[feeName];
            }
        }
    };
    var renderCheckoutFunction = function () {
        cityssm.clearElement(cartContainerElement);
        cityssm.clearElement(cartTotalContainerElement);
        cartTotals = {
            itemTotal: 0,
            feeTotals: {}
        };
        cartItems = cartGlobal.get().cartItems;
        if (cartItems.length === 0) {
            cartContainerElement.classList.add("is-hidden");
            shippingFormElement.classList.add("is-hidden");
            document.querySelector("#button--clearCart").classList.add("is-hidden");
            cartContainerElement.insertAdjacentHTML("beforebegin", "<div class=\"message is-info\">" +
                ("<div class=\"message-body has-text-centered\">" +
                    "<p class=\"has-text-weight-bold\">The cart is empty.</p>" +
                    "<p><a href=\"" + cityssm.escapeHTML(urlPrefix) + "/products\">View Available Products</a></p>" +
                    "</div>") +
                "</div>");
        }
        else {
            cartItems.forEach(forEachFunction_renderCartItems_calculateTotals);
            cartContainerElement.classList.remove("is-hidden");
            shippingFormElement.classList.remove("is-hidden");
        }
        var cartTotal = cartTotals.itemTotal;
        if (Object.keys(cartTotals.feeTotals).length > 0) {
            cartTotalContainerElement.insertAdjacentHTML("beforeend", "<div class=\"has-text-weight-bold\">Subtotal: $" + cartTotals.itemTotal.toFixed(2) + "</div>");
            for (var _i = 0, _a = Object.keys(cartTotals.feeTotals); _i < _a.length; _i++) {
                var feeName = _a[_i];
                cartTotalContainerElement.insertAdjacentHTML("beforeend", "<div>" + productDetails.fees[feeName].feeName + ": $" + cartTotals.feeTotals[feeName].toFixed(2) + "</div>");
                cartTotal += cartTotals.feeTotals[feeName];
            }
        }
        cartTotalContainerElement.insertAdjacentHTML("beforeend", "<div class=\"is-size-4 has-text-weight-bold\">Total: $" + cartTotal.toFixed(2) + "</div>");
        cartTotalContainerElement.insertAdjacentHTML("beforeend", "<div class=\"is-size-7 has-text-weight-bold\">Prices in " + cityssm.escapeHTML(cartTotalContainerElement.getAttribute("data-currency")) + "</div>");
    };
    var initFunction_getDistinctProductSKUs = function () {
        var productSKUs = new Set();
        var cart = cartGlobal.get().cartItems;
        for (var _i = 0, cart_1 = cart; _i < cart_1.length; _i++) {
            var cartProduct = cart_1[_i];
            productSKUs.add(cartProduct.productSKU);
        }
        return Array.from(productSKUs);
    };
    var initFunction_loadProductDetails = function () {
        var productSKUs = initFunction_getDistinctProductSKUs().join(",");
        if (productSKUs === "") {
            renderCheckoutFunction();
            return;
        }
        fetch(urlPrefix + "/checkout/doGetProductDetails", {
            method: "POST",
            body: new URLSearchParams({
                productSKUs: productSKUs
            })
        })
            .then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, response.json()];
                    case 1: return [2, _a.sent()];
                }
            });
        }); })
            .then(function (responseProductDetails) {
            productDetails = responseProductDetails;
            renderCheckoutFunction();
            return;
        })
            .catch(function () {
        });
    };
    var formIsSubmitting = false;
    shippingFormElement.addEventListener("submit", function (formEvent) {
        formEvent.preventDefault();
        if (formIsSubmitting) {
            return;
        }
        formIsSubmitting = true;
        var formObject = formToObject(shippingFormElement);
        formObject.cartItems = cartGlobal.get().cartItems;
        fetch(urlPrefix + "/checkout/doCreateOrder", {
            method: "POST",
            body: JSON.stringify(formObject),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, response.json()];
                    case 1: return [2, _a.sent()];
                }
            });
        }); })
            .then(function (responseOrderNumbers) {
            formIsSubmitting = false;
            if (responseOrderNumbers.success) {
                document.querySelector("#toPayment_orderNumber").value = responseOrderNumbers.orderNumber;
                document.querySelector("#toPayment_orderSecret").value = responseOrderNumbers.orderSecret;
                cartGlobal.cacheContact();
                document.querySelector("#form--toPayment").submit();
            }
            else {
                cityssm.alertModal("Order Error", "An error occurred while trying to create your order. Please try again.", "OK", "danger");
            }
            return;
        })
            .catch(function () {
            cityssm.alertModal("Order Error", "An error occurred while trying to create your order. Please try again.", "OK", "danger");
            formIsSubmitting = false;
        });
    });
    initFunction_loadProductDetails();
    if (cartGlobal.get().fullName !== "") {
        var shippingForm = cartGlobal.get();
        document.querySelector("#shipping_fullName").value = shippingForm.fullName;
        document.querySelector("#shipping_address").value = shippingForm.address;
        document.querySelector("#shipping_address2").value = shippingForm.address2;
        document.querySelector("#shipping_city").value = shippingForm.city;
        document.querySelector("#shipping_province").value = shippingForm.province;
        document.querySelector("#shipping_country").value = shippingForm.country;
        document.querySelector("#shipping_postalCode").value = shippingForm.postalCode;
        document.querySelector("#shipping_phoneNumberDay").value = shippingForm.phoneNumberDay;
        document.querySelector("#shipping_phoneNumberEvening").value = shippingForm.phoneNumberEvening;
        document.querySelector("#shipping_emailAddress").value = shippingForm.emailAddress;
    }
    document.querySelector("#button--clearCart").addEventListener("click", function () {
        cityssm.confirmModal("Clear Cart?", "Are you sure you want to remove all items from your cart?", "Yes, Clear the Cart", "warning", function () {
            cartGlobal.clear();
            renderCheckoutFunction();
        });
    });
    window.setTimeout(function () {
        cartGlobal.refresh();
    }, 5 * 60 * 1000);
})();
