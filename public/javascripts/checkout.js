"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
(() => {
    const urlPrefix = document.querySelector('main').dataset
        .urlPrefix;
    const cartGlobal = window.exports.cart;
    let productDetails = {};
    const cartContainerElement = document.querySelector('#card--cart');
    const cartTotalContainerElement = document.querySelector('#container--cartTotal');
    const shippingFormElement = document.querySelector('#form--shipping');
    let cartTotals = {
        itemTotal: 0,
        feeTotals: {}
    };
    let cartItems = [];
    const removeCartItemFunction = (clickEvent) => {
        clickEvent.preventDefault();
        const cartIndex = Number.parseInt(clickEvent.currentTarget.dataset.cartIndex, 10);
        const cartItem = cartItems[cartIndex];
        const product = productDetails.products[cartItem.productSKU];
        bulmaJS.confirm({
            title: MiniShop_getStringByLanguage(product.productName),
            message: MiniShop_translations.removeFromCartConfirm,
            contextualColorName: 'warning',
            okButton: {
                text: MiniShop_translations.removeFromCartOk,
                callbackFunction() {
                    cartGlobal.remove(cartIndex);
                    renderCheckoutFunction();
                }
            },
            cancelButton: {
                text: MiniShop_translations.cancel
            }
        });
    };
    const forEachFunction_renderCartItems_calculateTotals = (cartItem, cartIndex) => {
        const product = productDetails.products[cartItem.productSKU];
        if (!product) {
            cartGlobal.clear();
            location.reload();
        }
        const productCardContentElement = document.createElement('li');
        productCardContentElement.className = 'card-content';
        productCardContentElement.innerHTML = `<div class="columns">
        <div class="column is-narrow has-text-right">
          <button class="button is-inverted is-danger has-tooltip-arrow has-tooltip-right has-tooltip-hidden-mobile"
            data-cart-index="${cartIndex.toString()}"
            data-tooltip="${MiniShop_translations.removeFromCart}"
            type="button" aria-label="${MiniShop_translations.removeFromCart}">
            <i class="fas fa-times" aria-hidden="true"></i>
            <span class="is-hidden-tablet ml-2">${MiniShop_translations.removeFromCart}</span>
          </button>
        </div>
        <div class="column">
          <strong class="container--productName"></strong><br />
          <div class="is-size-7 container--formFields"></div>
        </div>
        <div class="column is-narrow column--quantity has-text-right"></div>
        <div class="column is-narrow column--price has-text-weight-bold has-text-right"></div>
        </div>`;
        productCardContentElement
            .querySelector('button')
            ?.addEventListener('click', removeCartItemFunction);
        productCardContentElement.querySelector('.container--productName').textContent = MiniShop_getStringByLanguage(product.productName);
        if (product.formFieldsToSave && product.formFieldsToSave.length > 0) {
            const formFieldsElement = productCardContentElement.querySelector('.container--formFields');
            for (const formFieldToSave of product.formFieldsToSave) {
                if (cartItem[formFieldToSave.formFieldName]) {
                    formFieldsElement.insertAdjacentHTML('beforeend', `<strong>${MiniShop_getStringByLanguage(formFieldToSave.fieldName)}:</strong> `);
                    const spanElement = document.createElement('span');
                    spanElement.textContent = cartItem[formFieldToSave.formFieldName];
                    formFieldsElement.append(spanElement);
                    formFieldsElement.insertAdjacentHTML('beforeend', '<br />');
                }
            }
        }
        const quantityColumnElement = productCardContentElement.querySelector('.column--quantity');
        const unitPrice = typeof product.price === 'number'
            ? product.price
            : Number.parseFloat(cartItem.unitPrice);
        quantityColumnElement.textContent =
            cartItem.quantity + ' × $' + unitPrice.toFixed(2);
        const itemTotal = unitPrice * Number.parseInt(cartItem.quantity, 10);
        const priceColumnElement = productCardContentElement.querySelector('.column--price');
        priceColumnElement.textContent = '$' + itemTotal.toFixed(2);
        cartContainerElement.append(productCardContentElement);
        cartTotals.itemTotal += itemTotal;
        if (product.feeTotals && Object.keys(product.feeTotals).length > 0) {
            for (const feeName of Object.keys(product.feeTotals)) {
                cartTotals.feeTotals[feeName] =
                    (cartTotals.feeTotals[feeName] || 0) + product.feeTotals[feeName];
            }
        }
    };
    const renderCheckoutFunction = () => {
        cityssm.clearElement(cartContainerElement);
        cityssm.clearElement(cartTotalContainerElement);
        cartTotals = {
            itemTotal: 0,
            feeTotals: {}
        };
        cartItems = cartGlobal.get().cartItems;
        if (cartItems.length === 0) {
            cartContainerElement.classList.add('is-hidden');
            shippingFormElement.classList.add('is-hidden');
            document.querySelector('#button--clearCart')?.classList.add('is-hidden');
            cartContainerElement.insertAdjacentHTML('beforebegin', `<div class="message is-info">
          <div class="message-body has-text-centered">
            <p class="has-text-weight-bold">${MiniShop_translations.cartIsEmpty}</p>
            <p><a href="${cityssm.escapeHTML(urlPrefix)}/products">${MiniShop_translations.returnToProducts}</a></p>
          </div>
          </div>`);
        }
        else {
            cartItems.forEach(forEachFunction_renderCartItems_calculateTotals);
            cartContainerElement.classList.remove('is-hidden');
            shippingFormElement.classList.remove('is-hidden');
        }
        let cartTotal = cartTotals.itemTotal;
        if (Object.keys(cartTotals.feeTotals).length > 0) {
            cartTotalContainerElement.insertAdjacentHTML('beforeend', '<div class="has-text-weight-bold">Subtotal: $' +
                cartTotals.itemTotal.toFixed(2) +
                '</div>');
            for (const feeName of Object.keys(cartTotals.feeTotals)) {
                cartTotalContainerElement.insertAdjacentHTML('beforeend', '<div>' +
                    productDetails.fees[feeName].feeName +
                    ': $' +
                    cartTotals.feeTotals[feeName].toFixed(2) +
                    '</div>');
                cartTotal += cartTotals.feeTotals[feeName];
            }
        }
        cartTotalContainerElement.insertAdjacentHTML('beforeend', '<div class="is-size-4 has-text-weight-bold">Total: $' +
            cartTotal.toFixed(2) +
            '</div>');
        cartTotalContainerElement.insertAdjacentHTML('beforeend', '<div class="is-size-7 has-text-weight-bold">' +
            cityssm.escapeHTML(cartTotalContainerElement.dataset.currency) +
            '</div>');
    };
    const initFunction_getDistinctProductSKUs = () => {
        const productSKUs = new Set();
        const cart = cartGlobal.get().cartItems;
        for (const cartProduct of cart) {
            productSKUs.add(cartProduct.productSKU);
        }
        return [...productSKUs];
    };
    const initFunction_loadProductDetails = () => {
        const productSKUs = initFunction_getDistinctProductSKUs().join(',');
        if (productSKUs === '') {
            renderCheckoutFunction();
            return;
        }
        fetch(`${urlPrefix}/checkout/doGetProductDetails`, {
            method: 'POST',
            body: new URLSearchParams({
                productSKUs
            })
        })
            .then(async (response) => {
            return await response.json();
        })
            .then((responseProductDetails) => {
            productDetails = responseProductDetails;
            renderCheckoutFunction();
        })
            .catch(() => {
        });
    };
    let formIsSubmitting = false;
    shippingFormElement.addEventListener('submit', (formEvent) => {
        formEvent.preventDefault();
        if (formIsSubmitting) {
            return;
        }
        formIsSubmitting = true;
        const formObject = formToObject(shippingFormElement);
        formObject.cartItems = cartGlobal.get().cartItems;
        fetch(urlPrefix + '/checkout/doCreateOrder', {
            method: 'POST',
            body: JSON.stringify(formObject),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async (response) => {
            return await response.json();
        })
            .then((responseOrderNumbers) => {
            formIsSubmitting = false;
            if (responseOrderNumbers.success) {
                ;
                document.querySelector('#toPayment_orderNumber').value = responseOrderNumbers.orderNumber ?? '';
                document.querySelector('#toPayment_orderSecret').value = responseOrderNumbers.orderSecret ?? '';
                cartGlobal.cacheContact();
                document.querySelector('#form--toPayment').submit();
            }
            else {
                const errorMessage = responseOrderNumbers.message
                    ? responseOrderNumbers.message
                    : 'An error occurred while trying to create your order. Please try again.';
                cityssm.alertModal('Order Error', errorMessage, 'OK', 'danger');
            }
        })
            .catch(() => {
            cityssm.alertModal('Order Error', 'An error occurred while trying to create your order. Please try again.', 'OK', 'danger');
            formIsSubmitting = false;
        });
    });
    initFunction_loadProductDetails();
    if (cartGlobal.get().fullName !== '') {
        const shippingForm = cartGlobal.get();
        document.querySelector('#shipping_fullName').value =
            shippingForm.fullName;
        document.querySelector('#shipping_address').value =
            shippingForm.address;
        document.querySelector('#shipping_address2').value =
            shippingForm.address2;
        document.querySelector('#shipping_city').value =
            shippingForm.city;
        document.querySelector('#shipping_province').value =
            shippingForm.province;
        document.querySelector('#shipping_country').value =
            shippingForm.country;
        document.querySelector('#shipping_postalCode').value = shippingForm.postalCode;
        document.querySelector('#shipping_phoneNumberDay').value = shippingForm.phoneNumberDay;
        document.querySelector('#shipping_phoneNumberEvening').value = shippingForm.phoneNumberEvening;
        document.querySelector('#shipping_emailAddress').value = shippingForm.emailAddress;
    }
    document
        .querySelector('#button--clearCart')
        ?.addEventListener('click', () => {
        bulmaJS.confirm({
            title: MiniShop_translations.clearCart,
            message: MiniShop_translations.clearCartConfirm,
            contextualColorName: 'warning',
            okButton: {
                text: MiniShop_translations.clearCartOk,
                callbackFunction() {
                    cartGlobal.clear();
                    renderCheckoutFunction();
                }
            },
            cancelButton: {
                text: MiniShop_translations.cancel
            }
        });
    });
    window.setTimeout(() => {
        cartGlobal.refresh();
    }, 5 * 60 * 1000);
})();
