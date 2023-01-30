function enableValidation (restConfig) {
  const formList = Array.from(document.querySelectorAll(restConfig.formElement));
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-item-error`);
    inputElement.classList.add(restConfig.inputError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(restConfig.errorClass);
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-item-error`);
    inputElement.classList.remove(restConfig.inputError);
    errorElement.classList.remove(restConfig.errorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorText);
    } else {
        inputElement.setCustomValidity('');
    }
    
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      button.setAttribute('disabled', true);
      buttonElement.classList.add(restConfig.inactiveButton);
    } else {
      button.setAttribute('disabled', false);
      buttonElement.classList.remove(restConfig.inactiveButton);
    }
  }
  
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(restConfig.inputElement));
    const buttonElement = formElement.querySelector(restConfig.button);
  
    // чтобы проверить состояние кнопки в самом начале
    toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        // чтобы проверять его при изменении любого из полей
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  formList.forEach((formElement) => {

    setEventListeners(formElement);

  });
};





export {enableValidation}