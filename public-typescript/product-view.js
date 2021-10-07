(() => {
    let isSubmitting = false;
    const productFormEle = document.getElementById("form--product");
    productFormEle.addEventListener("submit", (formEvent) => {
        formEvent.preventDefault();
        if (isSubmitting) {
            return;
        }
        isSubmitting = true;
        const success = exports.cart.add(productFormEle);
        if (success) {
            productFormEle.reset();
            document.getElementById("modal--success").classList.add("is-active");
            document.getElementsByTagName("html")[0].classList.add("is-clipped");
            document.getElementById("successButton--checkout").focus();
        }
        else {
            isSubmitting = false;
            cityssm.alertModal("The Cart is Full", "You cannot add anymore items to your cart.", "OK", "warning");
        }
    });
})();
export {};
