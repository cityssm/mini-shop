;(() => {
  const formElement = document.querySelector(
    '#form--product'
  ) as HTMLFormElement

  const radioElements = formElement.querySelectorAll(
    'input[name="permitType"]'
  ) as NodeListOf<HTMLInputElement>

  function setUnitPrice(): void {
    for (const radioElement of radioElements) {
      if (radioElement.checked) {
        ;(
          formElement.querySelector('[name="unitPrice"]') as HTMLInputElement
        ).value = radioElement.dataset.unitPrice ?? ''
      }
    }
  }

  setUnitPrice()

  for (const radioElement of radioElements) {
    radioElement.addEventListener('change', setUnitPrice)
  }
})()
