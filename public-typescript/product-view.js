(function () {
    var isSubmitting = false;
    var productFormEle = document.getElementById("form--product");
    productFormEle.addEventListener("submit", function (formEvent) {
        formEvent.preventDefault();
        if (isSubmitting) {
            return;
        }
        isSubmitting = true;
        alert("add to cart");
    });
})();
