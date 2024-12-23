;
(() => {
    const formElement = document.querySelector('#form--product');
    const applicantTypeRadioElements = formElement.querySelectorAll('input[name="applicantType"]');
    const ownerContainerElement = formElement.querySelector('div[id^="container_"][id$="_applicantType-owner"]');
    const tenantContainerElement = formElement.querySelector('div[id^="container_"][id$="_applicantType-tenant"]');
    function resetApplicantType() {
        ownerContainerElement.classList.add('is-hidden');
        tenantContainerElement.classList.add('is-hidden');
        formElement.querySelector('input[name="understandGuidelines"]').checked = false;
        formElement.querySelector('button[type="submit"]').disabled = true;
    }
    function toggleApplicantType() {
        const applicantType = formElement.querySelector('[name="applicantType"]:checked').value;
        resetApplicantType();
        if (applicantType === 'owner') {
            ownerContainerElement.classList.remove('is-hidden');
            formElement.querySelector('button[type="submit"]').disabled = false;
        }
        else if (applicantType === 'tenant') {
            tenantContainerElement.classList.remove('is-hidden');
        }
    }
    resetApplicantType();
    for (const radioElement of applicantTypeRadioElements) {
        radioElement.checked = false;
        radioElement.addEventListener('change', toggleApplicantType);
    }
    const permitTypeRadioElements = formElement.querySelectorAll('input[name="permitType"]');
    function setUnitPrice() {
        for (const radioElement of permitTypeRadioElements) {
            if (radioElement.checked) {
                ;
                formElement.querySelector('[name="unitPrice"]').value = radioElement.dataset.unitPrice ?? '';
            }
        }
    }
    setUnitPrice();
    for (const radioElement of permitTypeRadioElements) {
        radioElement.addEventListener('change', setUnitPrice);
    }
})();
