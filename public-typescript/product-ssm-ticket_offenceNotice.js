(function () {
    var formElement = document.querySelector("#form--product");
    var offenceNumberElement = formElement.querySelector("input[name='offenceNumber']");
    var offenceNumberSuffixElement = formElement.querySelector("input[name='offenceNumber-suffix']");
    var buildOffenceNumber = function () {
        offenceNumberElement.value = "0160 " + offenceNumberSuffixElement.value;
    };
    offenceNumberSuffixElement.addEventListener("keyup", buildOffenceNumber);
    buildOffenceNumber();
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
