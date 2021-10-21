(() => {
  const formElement = document.querySelector("#form--product");

  // Tag Number

  const tagNumberElement = formElement.querySelector("input[name='tagNumber']") as HTMLInputElement;

  const tagNumberPrefixElement = formElement.querySelector("select[name='tagNumber-prefix']") as HTMLSelectElement;
  const tagNumberSuffixElement = formElement.querySelector("input[name='tagNumber-suffix']") as HTMLInputElement;

  const buildTagNumber = () => {
    tagNumberElement.value = tagNumberPrefixElement.value + tagNumberSuffixElement.value;
  };

  tagNumberPrefixElement.addEventListener("change", buildTagNumber);
  tagNumberSuffixElement.addEventListener("keyup", buildTagNumber);

  buildTagNumber();

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
