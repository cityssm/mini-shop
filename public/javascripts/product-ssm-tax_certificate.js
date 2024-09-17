(() => {
    const formElement = document.querySelector("#form--product");
    const formFields = [
        formElement.querySelector('[name="propertyAddress"]'),
        formElement.querySelector('[name="legalDescription"]'),
        formElement.querySelector('[name="rollNumber"]'),
        formElement.querySelector('[name="propertyOwner"]'),
    ];
    const minimumCompletedFields = 2;
    function toggleRequired() {
        let completedFields = 0;
        for (const formField of formFields) {
            if (formField.value.trim() !== "") {
                completedFields += 1;
            }
        }
        for (const formField of formFields) {
            formField.required =
                completedFields >= minimumCompletedFields ? false : true;
        }
    }
    for (const formField of formFields) {
        formField.addEventListener("keyup", toggleRequired);
    }
    toggleRequired();
})();
