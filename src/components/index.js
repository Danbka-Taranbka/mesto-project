import * as util from './util.js';

import { formValidation } from './validation.js';

import * as cards from './cards.js';

import * as modal from './modal.js';

import '../pages/index.css';

formValidation({
  formElement: '.popup__form',
  inputElement: '.popup__item',
  button: '.popup__submit-button',
  inactiveButtonClass: '.popup__submit-button_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active'
}); 