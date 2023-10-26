(function () {
    var formElement = document.querySelector("#form--product");
    var formFields = [
        formElement.querySelector('[name="propertyAddress"]'),
        formElement.querySelector('[name="legalDescription"]'),
        formElement.querySelector('[name="rollNumber"]'),
        formElement.querySelector('[name="propertyOwner"]'),
    ];
    var minimumCompletedFields = 2;
    function toggleRequired() {
        var completedFields = 0;
        for (var _i = 0, formFields_2 = formFields; _i < formFields_2.length; _i++) {
            var formField = formFields_2[_i];
            if (formField.value.trim() !== "") {
                completedFields += 1;
            }
        }
        for (var _a = 0, formFields_3 = formFields; _a < formFields_3.length; _a++) {
            var formField = formFields_3[_a];
            formField.required =
                completedFields >= minimumCompletedFields ? false : true;
        }
    }
    for (var _i = 0, formFields_1 = formFields; _i < formFields_1.length; _i++) {
        var formField = formFields_1[_i];
        formField.addEventListener("keyup", toggleRequired);
    }
    toggleRequired();
})();
