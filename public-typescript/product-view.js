(function () {
    var isSubmitting = false;
    var productFormEle = document.getElementById("form--product");
    productFormEle.addEventListener("submit", function (formEvent) {
        formEvent.preventDefault();
        if (isSubmitting) {
            return;
        }
        isSubmitting = true;
        exports.cart.add(productFormEle);
        productFormEle.reset();
        document.getElementById("modal--success").classList.add("is-active");
        document.getElementsByTagName("html")[0].classList.add("is-clipped");
        document.getElementById("successButton--checkout").focus();
    });
})();
//# sourceMappingURL=product-view.js.map