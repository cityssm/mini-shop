(function () {
    var formElement = document.querySelector("#form--product");
    var concatenateTicketNumber = function (ticketNumberElementNames) {
        var ticketNumber = "";
        for (var _i = 0, ticketNumberElementNames_1 = ticketNumberElementNames; _i < ticketNumberElementNames_1.length; _i++) {
            var ticketNumberElementName = ticketNumberElementNames_1[_i];
            ticketNumber += " " + formElement.querySelector("[name='" + ticketNumberElementName + "']").value;
        }
        return ticketNumber.trim();
    };
    var initializeTicketNumber = function (targetElement, ticketNumberElementNames) {
        var updateTicketNumber = function () {
            targetElement.value = concatenateTicketNumber(ticketNumberElementNames);
        };
        for (var _i = 0, ticketNumberElementNames_2 = ticketNumberElementNames; _i < ticketNumberElementNames_2.length; _i++) {
            var ticketNumberElementName = ticketNumberElementNames_2[_i];
            var ticketNumberElement = formElement.querySelector("[name='" + ticketNumberElementName + "']");
            if (ticketNumberElement.tagName === "INPUT") {
                ticketNumberElement.addEventListener("keyup", updateTicketNumber);
            }
            else {
                ticketNumberElement.addEventListener("change", updateTicketNumber);
            }
        }
        updateTicketNumber();
    };
    var tagNumberElement = formElement.querySelector("input[name='tagNumber']");
    if (tagNumberElement) {
        initializeTicketNumber(tagNumberElement, ["tagNumber-prefix", "tagNumber-suffix"]);
    }
    var offenceNumberElement = formElement.querySelector("input[name='offenceNumber']");
    if (offenceNumberElement) {
        initializeTicketNumber(offenceNumberElement, ["offenceNumber-prefix", "offenceNumber-suffix"]);
    }
    var fileNumberElement = formElement.querySelector("input[name='fileNumber']");
    if (fileNumberElement) {
        initializeTicketNumber(fileNumberElement, ["fileNumber-a", "fileNumber-b", "fileNumber-c", "fileNumber-d", "fileNumber-e"]);
    }
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
