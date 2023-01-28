import { restConfig } from "./util";

/*ВАЛИДАЦИЯ*/
const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-item-error`);
  inputElement.classList.add(restConfig.inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(restConfig.errorClass);
};

const hideError = (formElement, inputElement) => {
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
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
};

const buttonState = (inputArr, button) => {
  if (invalidInput(inputArr)) {
    button.setAttribute('disabled', true);
    button.classList.add(restConfig.inactiveButton);
  } else {
    button.removeAttribute('disabled', false);
    button.classList.remove(restConfig.inactiveButton);
  }
}

const inputEventListeners = (formElement) => {
  const inputArr = Array.from(formElement.querySelectorAll(restConfig.inputElement));
  const button = formElement.querySelector(restConfig.button);
  
  buttonState(inputArr, button);

  inputArr.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      
      buttonState(inputArr, button);
    });
  });
};

function formValidation (restConfig) {
  const formArr = Array.from(document.querySelectorAll(restConfig.formElement));
  
  formArr.forEach((form) => {
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
  
  formArr.forEach((form) => {
    inputEventListeners(form);
  });
});
};




function invalidInput (inputArr) {
  return inputArr.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

export { formValidation, invalidInput}
/*ВАЛИДАЦИЯ*/