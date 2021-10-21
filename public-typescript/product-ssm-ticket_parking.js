(function () {
    var formElement = document.querySelector("#form--product");
    var tagNumberElement = formElement.querySelector("input[name='tagNumber']");
    var tagNumberPrefixElement = formElement.querySelector("select[name='tagNumber-prefix']");
    var tagNumberSuffixElement = formElement.querySelector("input[name='tagNumber-suffix']");
    var buildTagNumber = function () {
        tagNumberElement.value = tagNumberPrefixElement.value + tagNumberSuffixElement.value;
    };
    tagNumberPrefixElement.addEventListener("change", buildTagNumber);
    tagNumberSuffixElement.addEventListener("keyup", buildTagNumber);
    buildTagNumber();
    var offenceDateElement = formElement.querySelector("input[name='offenceDate']");
    var offenceYearElement = formElement.querySelector("select[name='offenceDate-year']");
    var offenceMonthElement = formElement.querySelector("select[name='offenceDate-month']");
    var offenceDayElement = formElement.querySelector("select[name='offenceDate-day']");
    var buildOffenceDate = function () {
        offenceDateElement.value = offenceYearElement.value + "/" + offenceMonthElement.value + "/" + offenceDayElement.value;
    };
    offenceYearElement.addEventListener("change", buildOffenceDate);
    offenceMonthElement.addEventListener("change", buildOffenceDate);
    offenceDayElement.addEventListener("change", buildOffenceDate);
    buildOffenceDate();
})();
