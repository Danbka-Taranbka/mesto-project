import { configuration, initialCards } from './utils.js';

import { enableValidation } from './validate.js';

import { popupCardForm, createNewElement, addButton, popupCard, prependNewElement} from './card.js';

import { openPopup, closePopup } from './modal.js';

import '../pages/index.css';

const popupCardPlaceName = popupCardForm.querySelector('.popup__item_place-name');
const popupCardImage = popupCardForm.querySelector('.popup__item_image');

addButton.addEventListener('click', function () {
  openPopup(popupCard);
});

popupCardForm.addEventListener('submit', function (evt) {
    /*Отмена стандартного поведения с целью отключения перезагрузки страницы.*/
  evt.preventDefault();
  const submitButton = popupCard.querySelector('.popup__submit-button');
  prependNewElement(popupCardImage.value, popupCardPlaceName.value);
  /*Обнуление заполняемых значений формы.*/
  evt.target.reset();
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add('popup__submit-button_inactive');
  closePopup(popupCard);
});

/*Добавление основных карточек*/
initialCards.forEach(function (item) {
  prependNewElement(item.link, item.name);
});

/*Кнопка редактирования профиля (имя и профессия).*/
const profileEditButton = document.querySelector('.profile__edit-button');

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

/*Переменные, содержащие ключевое слово popupProfile 
используются для работы с данными формы.*/
const popupProfile = document.querySelector('#popup-profile');
const popupProfileForm = popupProfile.querySelector('.popup__content .popup__form');
const popupProfileName = popupProfileForm.querySelector('.popup__item_name');
const popupProfileProfession = popupProfileForm.querySelector('.popup__item_profession');

/*Открытие и закрытие popup, отвечающего за редактирования профиля.
Закрытие без сохранения изменений.*/
profileEditButton.addEventListener('click', function () {
  openPopup(popupProfile);
  popupProfileName.value = profileName.textContent;
  popupProfileProfession.value = profileProfession.textContent;
});


/*Реализация функции редактирования профиля*/
function saveProfileChanges(evt) {
  evt.preventDefault();/*Отмена стандартного поведения с целью отключения перезагрузки страницы.*/
  profileName.textContent = popupProfileName.value;
  profileProfession.textContent = popupProfileProfession.value;
  closePopup(popupProfile);
}

popupProfileForm.addEventListener('submit', saveProfileChanges);
/*Реализация функции редактирования профиля*/

enableValidation(configuration);