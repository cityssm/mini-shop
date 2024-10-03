type HTMLInputSelectElement = HTMLInputElement | HTMLSelectElement
;(() => {
  const formElement = document.querySelector(
    '#form--product'
  ) as HTMLFormElement

  const concatenateTicketNumber = (ticketNumberElementNames: string[]) => {
    let ticketNumber = ''

    for (const ticketNumberElementName of ticketNumberElementNames) {
      ticketNumber +=
        ' ' +
        (
          formElement.querySelector(
            `[name='${ticketNumberElementName}']`
          ) as HTMLInputSelectElement
        ).value
    }

    return ticketNumber.trim()
  }

  const initializeTicketNumber = (
    targetElement: HTMLInputElement,
    ticketNumberElementNames: string[]
  ) => {
    const updateTicketNumber = () => {
      targetElement.value = concatenateTicketNumber(ticketNumberElementNames)
    }

    for (const ticketNumberElementName of ticketNumberElementNames) {
      const ticketNumberElement = formElement.querySelector(
        `[name='${ticketNumberElementName}']`
      ) as HTMLInputSelectElement

      if (ticketNumberElement.tagName === 'INPUT') {
        ticketNumberElement.addEventListener('keyup', updateTicketNumber)
      } else {
        ticketNumberElement.addEventListener('change', updateTicketNumber)
      }
    }

    updateTicketNumber()
  }

  // Tag Number

  const tagNumberElement = formElement.querySelector(
    "input[name='tagNumber']"
  ) as HTMLInputElement

  if (tagNumberElement) {
    initializeTicketNumber(tagNumberElement, [
      'tagNumber-prefix',
      'tagNumber-suffix'
    ])
  }

  // Offence Number

  const offenceNumberElement = formElement.querySelector(
    "input[name='offenceNumber']"
  ) as HTMLInputElement

  if (offenceNumberElement) {
    initializeTicketNumber(offenceNumberElement, [
      'offenceNumber-prefix',
      'offenceNumber-suffix'
    ])
  }

  // File Number

  const fileNumberElement = formElement.querySelector(
    "input[name='fileNumber']"
  ) as HTMLInputElement

  if (fileNumberElement) {
    initializeTicketNumber(fileNumberElement, [
      'fileNumber-a',
      'fileNumber-b',
      'fileNumber-c',
      'fileNumber-d',
      'fileNumber-e'
    ])
  }

  /*
   * Offence Date
   */

  const offenceDateElement = formElement.querySelector(
    "input[name='offenceDate']"
  ) as HTMLInputElement

  const offenceYearElement = formElement.querySelector(
    "select[name='offenceDate-year']"
  ) as HTMLSelectElement
  const offenceMonthElement = formElement.querySelector(
    "select[name='offenceDate-month']"
  ) as HTMLSelectElement
  const offenceDayElement = formElement.querySelector(
    "select[name='offenceDate-day']"
  ) as HTMLSelectElement

  const buildOffenceDate = () => {
    offenceDateElement.value =
      offenceYearElement.value +
      '/' +
      offenceMonthElement.value +
      '/' +
      offenceDayElement.value
  }

  offenceYearElement.addEventListener('change', buildOffenceDate)
  offenceMonthElement.addEventListener('change', buildOffenceDate)
  offenceDayElement.addEventListener('change', buildOffenceDate)

  buildOffenceDate()
})()
