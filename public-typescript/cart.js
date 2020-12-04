exports.cart = (function () {
    var SESSION_STORAGE_KEY = "miniShopCart";
    var CART_MAX_SIZE = 255;
    var cart = sessionStorage.getItem(SESSION_STORAGE_KEY)
        ? JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY))
        : [];
    if (!cart) {
        cart = [];
    }
    var toStorageFn = function () {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(cart));
    };
    var renderCartButtonFn = function () {
        var cartCountTagEle = document.getElementById("tag--cartCount");
        if (cart.length === 0) {
            cartCountTagEle.classList.add("is-hidden");
        }
        else {
            cartCountTagEle.innerText = cart.length.toString();
            cartCountTagEle.classList.remove("is-hidden");
        }
    };
    renderCartButtonFn();
    var addFn = function (productFormEle) {
        if (cart.length >= CART_MAX_SIZE) {
            return false;
        }
        var formObj = formToObject(productFormEle);
        cart.push(formObj);
        toStorageFn();
        renderCartButtonFn();
        return true;
    };
    var removeFn = function (cartIndex) {
        cart.splice(cartIndex, 1);
        toStorageFn();
        renderCartButtonFn();
    };
    var clearFn = function () {
        cart = [];
        toStorageFn();
        renderCartButtonFn();
    };
    return {
        add: addFn,
        remove: removeFn,
        clear: clearFn,
        get: function () {
            return cart;
        },
        refresh: toStorageFn
    };
})();
