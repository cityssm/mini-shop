(() => {
  const formElement = document.querySelector("#form--product");

  // Offence Number

  const offenceNumberElement = formElement.querySelector("input[name='offenceNumber']") as HTMLInputElement;

  const offenceNumberSuffixElement = formElement.querySelector("input[name='offenceNumber-suffix']") as HTMLInputElement;

  const buildOffenceNumber = () => {
    offenceNumberElement.value = "0160 " + offenceNumberSuffixElement.value;
  };

  offenceNumberSuffixElement.addEventListener("keyup", buildOffenceNumber);

  buildOffenceNumber();

  // Offence Date

  const offenceDateElement = formElement.querySelector("input[name='offenceDate']") as HTMLInputElement;

  const offenceYearElement = formElement.querySelector("select[name='offenceDate-year']") as HTMLSelectElement;
  const offenceMonthElement = formElement.querySelector("select[name='offenceDate-month']") as HTMLSelectElement;
  const offenceDayElement = formElement.querySelector("select[name='offenceDate-day']") as HTMLSelectElement;

  const buildOffenceDate = () => {
    offenceDateElement.value = offenceYearElement.value + "/" + offenceMonthElement.value + "/" + offenceDayElement.value;
  };

  offenceYearElement.addEventListener("change", buildOffenceDate);
  offenceMonthElement.addEventListener("change", buildOffenceDate);
  offenceDayElement.addEventListener("change", buildOffenceDate);

  buildOffenceDate();
})();
