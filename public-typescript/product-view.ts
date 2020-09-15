(() => {

  let isSubmitting = false;

  const productFormEle = document.getElementById("form--product");

  productFormEle.addEventListener("submit", (formEvent) => {
    formEvent.preventDefault();

    if (isSubmitting) {
      return;
    }

    isSubmitting = true;

    alert("add to cart");
  });
})();
