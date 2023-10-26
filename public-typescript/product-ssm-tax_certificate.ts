(() => {
  const formElement = document.querySelector("#form--product");

  const formFields: HTMLInputElement[] = [
    formElement.querySelector('[name="propertyAddress"]') as HTMLInputElement,
    formElement.querySelector('[name="legalDescription"]') as HTMLInputElement,
    formElement.querySelector('[name="rollNumber"]') as HTMLInputElement,
    formElement.querySelector('[name="propertyOwner"]') as HTMLInputElement,
  ];

  const minimumCompletedFields = 2;

  function toggleRequired(): void {
    let completedFields = 0;

    for (const formField of formFields) {
      if (formField.value.trim() !== "") {
        completedFields += 1;
      }
    }

    for (const formField of formFields) {
      formField.required =
        completedFields >= minimumCompletedFields ? false : true;
    }
  }

  for (const formField of formFields) {
    formField.addEventListener("keyup", toggleRequired);
  }

  toggleRequired();
})();
