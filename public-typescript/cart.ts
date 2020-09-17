declare const formToObject: (formEle: HTMLFormElement) => {};


exports.cart = (() => {

  const sessionStorageKey = "miniShopCart";

  let cart: Array<{}> = JSON.parse(sessionStorage.getItem(sessionStorageKey) || "[]");

  if (!cart) {
    cart = [];
  }

  const toStorageFn = () => {
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(cart));
  };

  const renderCartButtonFn = () => {

    const cartCountTagEle = document.getElementById("tag--cartCount");

    if (cart.length === 0) {
      cartCountTagEle.classList.add("is-hidden");

    } else {
      cartCountTagEle.innerText = cart.length.toString();
      cartCountTagEle.classList.remove("is-hidden");
    }
  };

  renderCartButtonFn();

  const addFn =
    (productFormEle: HTMLFormElement) => {

      const formObj = formToObject(productFormEle);

      cart.push(formObj);
      toStorageFn();
      renderCartButtonFn();

      return (cart.length - 1);
    };

  const removeFn = (cartIndex: number) => {
      cart.splice(cartIndex, 1);
      toStorageFn();
      renderCartButtonFn();
    };


  const clearFn = () => {
    cart = [];
    toStorageFn();
    renderCartButtonFn();
  };


  return {
    add: addFn,
    remove: removeFn,
    clear: clearFn,
    get: () => {
      return cart;
    },
    refresh: toStorageFn
  };
})();
