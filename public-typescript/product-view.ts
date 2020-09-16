(() => {

  let isSubmitting = false;

  const productFormEle = document.getElementById("form--product") as HTMLFormElement;

  productFormEle.addEventListener("submit", (formEvent) => {
    formEvent.preventDefault();

    if (isSubmitting) {
      return;
    }

    isSubmitting = true;

    exports.cart.add(productFormEle);

    productFormEle.reset();

    document.getElementById("modal--success").classList.add("is-active");
    document.getElementsByTagName("html")[0].classList.add("is-clipped");
  });
})();
