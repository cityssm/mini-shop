exports.cart = (function () {
    var sessionStorageKey = "miniShopCart";
    var cartMaxSize = 255;
    var cart = JSON.parse(sessionStorage.getItem(sessionStorageKey) || "[]");
    if (!cart) {
        cart = [];
    }
    var toStorageFn = function () {
        sessionStorage.setItem(sessionStorageKey, JSON.stringify(cart));
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
        if (cart.length >= cartMaxSize) {
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
//# sourceMappingURL=cart.js.map