exports.cart = (function () {
    var sessionStorageKey = "miniShopCart";
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
        var formObj = formToObject(productFormEle);
        cart.push(formObj);
        toStorageFn();
        renderCartButtonFn();
        return (cart.length - 1);
    };
    var removeFn = function (cartIndex) {
    };
    return {
        add: addFn,
        remove: removeFn
    };
})();
