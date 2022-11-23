(() => {

    const formElement = document.querySelector("#form--product");

    const documentTypeElement = formElement.querySelector("[name='documentType']") as HTMLSelectElement;
    
    const taxYearElement = formElement.querySelector("[name='taxYear']") as HTMLSelectElement;
    const currentYearElement = taxYearElement.options[0];

    const toggleCurrentYearVisibility = () => {
        if (documentTypeElement.value.toLowerCase().includes("reprint")) {
            currentYearElement.style.display = "";
        } else {
            if (taxYearElement.selectedIndex === 0) {
                taxYearElement.selectedIndex = 1;
            }
            currentYearElement.style.display = "none";
        }
    }

    documentTypeElement.addEventListener("change", toggleCurrentYearVisibility);

    toggleCurrentYearVisibility();
})();