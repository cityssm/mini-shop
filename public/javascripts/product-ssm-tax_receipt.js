"use strict";
;
(() => {
    const formElement = document.querySelector('#form--product');
    const documentTypeElement = formElement.querySelector("[name='documentType']");
    const taxYearElement = formElement.querySelector("[name='taxYear']");
    const currentYearElement = taxYearElement.options[0];
    const toggleCurrentYearVisibility = () => {
        if (documentTypeElement.value.toLowerCase().includes('reprint')) {
            currentYearElement.style.display = '';
            currentYearElement.disabled = false;
        }
        else {
            if (taxYearElement.selectedIndex === 0) {
                taxYearElement.selectedIndex = 1;
            }
            currentYearElement.style.display = 'none';
            currentYearElement.disabled = true;
        }
    };
    documentTypeElement.addEventListener('change', toggleCurrentYearVisibility);
    toggleCurrentYearVisibility();
})();
