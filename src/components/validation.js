/*ВАЛИДАЦИЯ*/
const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-item-error`);
  inputElement.classList.add('popup__item_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__item-error_active');
};

const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-item-error`);
  inputElement.classList.remove('popup__item_type_error');
  errorElement.classList.remove('popup__item-error_active');
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
    button.classList.add('popup__submit-button_inactive');
  } else {
    button.removeAttribute('disabled', false);
    button.classList.remove('popup__submit-button_inactive');
  }
}

const inputEventListeners = (formElement) => {
  const inputArr = Array.from(formElement.querySelectorAll('.popup__item'));
  const button = formElement.querySelector('.popup__submit-button');
  
  buttonState(inputArr, button);

  inputArr.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      
      buttonState(inputArr, button);
    });
  });
};

export function formValidation () {
  const formArr = Array.from(document.querySelectorAll('.popup__form'));
  formArr.forEach((formElement) => {
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
  const fieldsetArr = Array.from(formElement.querySelectorAll('.popup__fieldset'));
  
  fieldsetArr.forEach((fieldSet) => {
    inputEventListeners(fieldSet);
  });
});
};




function invalidInput (inputArr) {
  return inputArr.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

/*ВАЛИДАЦИЯ*/