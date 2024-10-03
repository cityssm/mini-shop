(() => {
    const formElement = document.querySelector('#form--product');
    const concatenateTicketNumber = (ticketNumberElementNames) => {
        let ticketNumber = '';
        for (const ticketNumberElementName of ticketNumberElementNames) {
            ticketNumber +=
                ' ' +
                    formElement.querySelector(`[name='${ticketNumberElementName}']`).value;
        }
        return ticketNumber.trim();
    };
    const initializeTicketNumber = (targetElement, ticketNumberElementNames) => {
        const updateTicketNumber = () => {
            targetElement.value = concatenateTicketNumber(ticketNumberElementNames);
        };
        for (const ticketNumberElementName of ticketNumberElementNames) {
            const ticketNumberElement = formElement.querySelector(`[name='${ticketNumberElementName}']`);
            if (ticketNumberElement.tagName === 'INPUT') {
                ticketNumberElement.addEventListener('keyup', updateTicketNumber);
            }
            else {
                ticketNumberElement.addEventListener('change', updateTicketNumber);
            }
        }
        updateTicketNumber();
    };
    const tagNumberElement = formElement.querySelector("input[name='tagNumber']");
    if (tagNumberElement) {
        initializeTicketNumber(tagNumberElement, [
            'tagNumber-prefix',
            'tagNumber-suffix'
        ]);
    }
    const offenceNumberElement = formElement.querySelector("input[name='offenceNumber']");
    if (offenceNumberElement) {
        initializeTicketNumber(offenceNumberElement, [
            'offenceNumber-prefix',
            'offenceNumber-suffix'
        ]);
    }
    const fileNumberElement = formElement.querySelector("input[name='fileNumber']");
    if (fileNumberElement) {
        initializeTicketNumber(fileNumberElement, [
            'fileNumber-a',
            'fileNumber-b',
            'fileNumber-c',
            'fileNumber-d',
            'fileNumber-e'
        ]);
    }
    const offenceDateElement = formElement.querySelector("input[name='offenceDate']");
    const offenceYearElement = formElement.querySelector("select[name='offenceDate-year']");
    const offenceMonthElement = formElement.querySelector("select[name='offenceDate-month']");
    const offenceDayElement = formElement.querySelector("select[name='offenceDate-day']");
    const buildOffenceDate = () => {
        offenceDateElement.value =
            offenceYearElement.value +
                '/' +
                offenceMonthElement.value +
                '/' +
                offenceDayElement.value;
    };
    offenceYearElement.addEventListener('change', buildOffenceDate);
    offenceMonthElement.addEventListener('change', buildOffenceDate);
    offenceDayElement.addEventListener('change', buildOffenceDate);
    buildOffenceDate();
})();
