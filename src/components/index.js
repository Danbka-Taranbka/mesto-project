import { configuration } from './utils.js';

import { enableValidation } from './validate.js';

import { popupCardForm, addButton, popupCard, prependNewElement} from './card.js';

import { openPopup, closePopup } from './modal.js';

import { getProfileInfo, editProfileInfo, getCards, addCard, changeAvatar, getAvatar, getPromise } from './api.js';

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
  addCard(popupCardPlaceName.value, popupCardImage.value)
    .then((res) => {
      prependNewElement(res.link, res.name,  res._id, res.owner._id);
    })
    .then(closePopup(popupCard))
    .catch((err) => {
      console.log(err);
    });
  /*Обнуление заполняемых значений формы.*/
  evt.target.reset();
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add('popup__submit-button_inactive');

});

/*Кнопка редактирования профиля (имя и профессия).*/
const profileEditButton = document.querySelector('.profile__edit-button');

export const profileName = document.querySelector('.profile__name');
export const profileProfession = document.querySelector('.profile__profession');

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
  editProfileInfo(popupProfileName.value, popupProfileProfession.value)
    .then(  closePopup(popupProfile))
    .catch((err) => {
      console.log(err);
    });
}

popupProfileForm.addEventListener('submit', saveProfileChanges);
/*Реализация функции редактирования профиля*/



getPromise()
  .then(getProfileInfo()
  .then((data) => {
    profileName.textContent = data.name;
    profileProfession.textContent = data.about;
  })
  .catch((err) => {
    console.log(err);
  }))
  .then(() => {
    getCards()
      .then((data) => {
        data.forEach((element) => {
          prependNewElement(element.link, element.name, element._id, element.owner._id);
          })
        })
  }).catch((err) => {
  console.log(err);
});





getAvatar()
  .then((data) => {
    avatarImage.setAttribute('src', data.avatar);
  })
  .catch((err) => {
    console.log(err);
  });

const popupAvatar = document.querySelector('#popup-avatar')
const popupAvatarLink = document.querySelector('.popup__item_avatar');
export const avatarImage = document.querySelector('.profile__avatar');
const avatarForm = popupAvatar.querySelector('.popup__form');

avatarImage.addEventListener('click', function () {
  openPopup(popupAvatar);
});

avatarForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  changeAvatar(popupAvatarLink.value)
    .then((data) => {
      avatarImage.setAttribute('src', data.avatar);
    })
    .then(closePopup(popupAvatar))
    .catch((err) => {
      console.log(err);
    });
})

enableValidation(configuration);