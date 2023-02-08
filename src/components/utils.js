const configuration = {
  formElement: '.popup__form',
  inputElement: '.popup__item',
  button: '.popup__submit-button',
  inactiveButton: 'popup__submit-button_inactive',
  inputError: 'popup__item_type_error',
  errorClass: 'popup__item-error_active'
};

const serverConfig = {
  baseUrl: `https://nomoreparties.co/v1/plus-cohort-19`,
  headers: {
    authorization: 'b6693749-9ba6-476d-9834-fe4f27e2ee16',
    'Content-Type': 'application/json',
  },
};

export { configuration, serverConfig };

