;
(() => {
    const urlPrefix = document
        .querySelector('main')
        ?.getAttribute('data-url-prefix');
    const formElement = document.querySelector('#form--product');
    const tagNumberIsValidElement = formElement.querySelector("[name='tagNumber-isValid']");
    const tagNumberIsValidIconElement = formElement.querySelector('.tagNumber-isValidIcon');
    const tagNumberIsInvalidMessageElement = formElement.querySelector('.tagNumber-isInvalidMessage');
    const tagNumberPrefixElement = formElement.querySelector("[name='tagNumber-prefix']");
    const tagNumberSuffixElement = formElement.querySelector("[name='tagNumber-suffix']");
    const checkedTagNumbers = new Map();
    const clearTagNumberValidity = () => {
        tagNumberIsValidElement.checked = false;
        tagNumberIsValidIconElement.innerHTML = '';
        tagNumberIsInvalidMessageElement.classList.add('is-hidden');
    };
    const setTagNumberAsValid = () => {
        tagNumberIsValidElement.checked = true;
        tagNumberIsValidIconElement.innerHTML =
            '<i class="fas fa-check has-text-success" aria-hidden="true"></i>';
        tagNumberIsInvalidMessageElement.classList.add('is-hidden');
    };
    const setTagNumberAsInvalid = () => {
        tagNumberIsValidElement.checked = false;
        tagNumberIsValidIconElement.innerHTML =
            '<i class="fas fa-times has-text-danger" aria-hidden="true"></i>';
        tagNumberIsInvalidMessageElement.classList.remove('is-hidden');
    };
    const checkTagNumber = () => {
        const tagNumber = tagNumberPrefixElement.value + ' ' + tagNumberSuffixElement.value;
        if (tagNumber.length !== 8) {
            clearTagNumberValidity();
        }
        else if (checkedTagNumbers.has(tagNumber)) {
            if (checkedTagNumbers.get(tagNumber)) {
                setTagNumberAsValid();
            }
            else {
                setTagNumberAsInvalid();
            }
        }
        else {
            clearTagNumberValidity();
            fetch(urlPrefix + '/products/ssm-ticket_parking/doIsTagNumberEligible', {
                method: 'POST',
                body: new URLSearchParams({
                    tagNumber
                })
            })
                .then(async (response) => {
                return await response.json();
            })
                .then((responseJSON) => {
                checkedTagNumbers.set(responseJSON.tagNumber, responseJSON.isEligible);
                checkTagNumber();
                return;
            })
                .catch(() => {
            });
        }
    };
    tagNumberPrefixElement.addEventListener('change', checkTagNumber);
    tagNumberSuffixElement.addEventListener('keyup', checkTagNumber);
})();
