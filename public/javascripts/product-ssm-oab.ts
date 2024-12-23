;(() => {
  const formElement = document.querySelector(
    '#form--product'
  ) as HTMLFormElement

  /*
   * Applicant Type
   */

  const applicantTypeRadioElements = formElement.querySelectorAll(
    'input[name="applicantType"]'
  ) as NodeListOf<HTMLInputElement>

  const ownerContainerElement = formElement.querySelector(
    'div[id^="container_"][id$="_applicantType-owner"]'
  ) as HTMLElement

  const tenantContainerElement = formElement.querySelector(
    'div[id^="container_"][id$="_applicantType-tenant"]'
  ) as HTMLElement

  function resetApplicantType(): void {
    ownerContainerElement.classList.add('is-hidden')
    tenantContainerElement.classList.add('is-hidden')
    ;(formElement.querySelector('input[name="understandGuidelines"]') as HTMLInputElement).checked = false
    ;(formElement.querySelector('button[type="submit"]') as HTMLButtonElement).disabled = true
  }

  function toggleApplicantType(): void {
    const applicantType = (
      formElement.querySelector(
        '[name="applicantType"]:checked'
      ) as HTMLInputElement
    ).value

    resetApplicantType()

    if (applicantType === 'owner') {
      ownerContainerElement.classList.remove('is-hidden')
      ;(formElement.querySelector('button[type="submit"]') as HTMLButtonElement).disabled = false
    } else if (applicantType === 'tenant') {
      tenantContainerElement.classList.remove('is-hidden')
    }
  }

  resetApplicantType()

  for (const radioElement of applicantTypeRadioElements) {
    radioElement.checked = false
    radioElement.addEventListener('change', toggleApplicantType)
  }

  /*
   * Unit Price
   */

  const permitTypeRadioElements = formElement.querySelectorAll(
    'input[name="permitType"]'
  ) as NodeListOf<HTMLInputElement>

  function setUnitPrice(): void {
    for (const radioElement of permitTypeRadioElements) {
      if (radioElement.checked) {
        ;(
          formElement.querySelector('[name="unitPrice"]') as HTMLInputElement
        ).value = radioElement.dataset.unitPrice ?? ''
      }
    }
  }

  setUnitPrice()

  for (const radioElement of permitTypeRadioElements) {
    radioElement.addEventListener('change', setUnitPrice)
  }
})()
