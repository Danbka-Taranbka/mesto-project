const showInputError = (formElement, inputElement, errorMessage, restConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-item-error`);
  inputElement.classList.add(restConfig.inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(restConfig.errorClass);
};

const hideInputError = (formElement, inputElement, restConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-item-error`);
  inputElement.classList.remove(restConfig.inputError);
  errorElement.classList.remove(restConfig.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, restConfig) => {
  if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorText);
  } else {
      inputElement.setCustomValidity('');
  }
  
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, restConfig);
  } else {
    hideInputError(formElement, inputElement, restConfig);
  }
};

  const toggleButtonState = (inputList, buttonElement, restConfig) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(restConfig.inactiveButton);
    } else {
      buttonElement.removeAttribute('disabled', true);
      buttonElement.classList.remove(restConfig.inactiveButton);
    }
  }

  const setEventListeners = (formElement, restConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(restConfig.inputElement));
    const buttonElement = formElement.querySelector(restConfig.button);
  
    // чтобы проверить состояние кнопки в самом начале
    toggleButtonState(inputList, buttonElement, restConfig);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, restConfig);
        // чтобы проверять его при изменении любого из полей
        toggleButtonState(inputList, buttonElement, restConfig);
      });
    });
  };
  

  function enableValidation (restConfig) {
  const formList = Array.from(document.querySelectorAll(restConfig.formElement));  

  formList.forEach((formElement) => {
    setEventListeners(formElement, restConfig);

  });
};

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

export {enableValidation}