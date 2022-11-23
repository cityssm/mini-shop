(function () {
    var formElement = document.querySelector("#form--product");
    var documentTypeElement = formElement.querySelector("[name='documentType']");
    var taxYearElement = formElement.querySelector("[name='taxYear']");
    var currentYearElement = taxYearElement.options[0];
    var toggleCurrentYearVisibility = function () {
        if (documentTypeElement.value.toLowerCase().includes("reprint")) {
            currentYearElement.style.display = "";
        }
        else {
            if (taxYearElement.selectedIndex === 0) {
                taxYearElement.selectedIndex = 1;
            }
            currentYearElement.style.display = "none";
        }
    };
    documentTypeElement.addEventListener("change", toggleCurrentYearVisibility);
    toggleCurrentYearVisibility();
})();
