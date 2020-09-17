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
    var productDetails = {};
    var cartContainerEle = document.getElementById("card--cart");
    var removeCartItemFn = function (clickEvent) {
        clickEvent.preventDefault();
        var cartIndex = parseInt(clickEvent.currentTarget.getAttribute("data-cart-index"));
        exports.cart.remove(cartIndex);
        renderCheckoutFn();
    };
    var forEachCartItemFn = function (cartItem, cartIndex) {
        var product = productDetails.products[cartItem.productSKU];
        if (!product) {
            exports.cart.clear();
            location.reload();
        }
        var productCardContentEle = document.createElement("li");
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
        productCardContentEle.getElementsByClassName("container--productName")[0]
            .innerText = product.productName;
        if (product.formFieldsToSave && product.formFieldsToSave.length > 0) {
            var formFieldsEle = productCardContentEle.getElementsByClassName("container--formFields")[0];
            for (var _i = 0, _a = product.formFieldsToSave; _i < _a.length; _i++) {
                var formFieldToSave = _a[_i];
                if (cartItem[formFieldToSave.formFieldName]) {
                    formFieldsEle.insertAdjacentHTML("beforeend", "<strong>" + formFieldToSave.fieldName + ":</strong> ");
                    var spanEle = document.createElement("span");
                    spanEle.innerText = cartItem[formFieldToSave.formFieldName];
                    formFieldsEle.appendChild(spanEle);
                    formFieldsEle.insertAdjacentHTML("beforeend", "<br />");
                }
            }
        }
        var priceColumnEle = productCardContentEle.getElementsByClassName("column--price")[0];
        priceColumnEle.innerText = "$" + product.price.toFixed(2);
        cartContainerEle.appendChild(productCardContentEle);
    };
    var renderCheckoutFn = function () {
        cartContainerEle.innerHTML = "";
        var cartItems = exports.cart.get();
        if (cartItems.length === 0) {
            cartContainerEle.classList.add("is-hidden");
            cartContainerEle.insertAdjacentHTML("beforebegin", "<div class=\"message is-info\">" +
                "<p class=\"message-body\">The cart is empty.</p>" +
                "</div>");
            return;
        }
        cartItems.forEach(forEachCartItemFn);
        cartContainerEle.classList.remove("is-hidden");
    };
    var initFn_getDistinctProductSKUs = function () {
        var productSKUs = new Set();
        var cart = exports.cart.get();
        for (var _i = 0, cart_1 = cart; _i < cart_1.length; _i++) {
            var cartProduct = cart_1[_i];
            productSKUs.add(cartProduct.productSKU);
        }
        return Array.from(productSKUs);
    };
    var initFn_loadProductDetails = function () {
        var productSKUs = initFn_getDistinctProductSKUs().join(",");
        if (productSKUs === "") {
            renderCheckoutFn();
            return;
        }
        fetch("/checkout/doGetProductDetails", {
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
            renderCheckoutFn();
        })
            .catch(function () {
        });
    };
    initFn_loadProductDetails();
    window.setTimeout(function () {
        exports.cart.refresh();
    }, 5 * 60 * 1000);
})();
