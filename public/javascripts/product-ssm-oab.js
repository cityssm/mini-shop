;
(() => {
    const formElement = document.querySelector('#form--product');
    const radioElements = formElement.querySelectorAll('input[name="permitType"]');
    function setUnitPrice() {
        for (const radioElement of radioElements) {
            if (radioElement.checked) {
                ;
                formElement.querySelector('[name="unitPrice"]').value = radioElement.dataset.unitPrice ?? '';
            }
        }
    }
    setUnitPrice();
    for (const radioElement of radioElements) {
        radioElement.addEventListener('change', setUnitPrice);
    }
})();
