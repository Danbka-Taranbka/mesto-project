import { configuration } from './utils.js';

import { enableValidation } from './validate.js';

import { popupCardForm, addButton, popupCard, prependNewElement} from './card.js';

import { openPopup, closePopup } from './modal.js';

import { editProfileInfo, getCards, addCard, changeAvatar, getAvatar, getPromise } from './api.js';

import '../pages/index.css';

export let userId;

const popupCardPlaceName = popupCardForm.querySelector('.popup__item_place-name');
const popupCardImage = popupCardForm.querySelector('.popup__item_image');

addButton.addEventListener('click', function () {
  openPopup(popupCard);
});

popupCardForm.addEventListener('submit', function (evt) {
    /*Отмена стандартного поведения с целью отключения перезагрузки страницы.*/
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...';
  addCard(popupCardPlaceName.value, popupCardImage.value)
    .then((res) => {
      prependNewElement(res.link, res.name,  res._id, res.owner._id, res);
    })
    .then(closePopup(popupCard))
    .catch((err) => {
      console.log(err);
    }).finally(() => {
      evt.target.reset();
      evt.submitter.setAttribute('disabled', true);
      evt.submitter.classList.add('popup__submit-button_inactive');
      evt.submitter.textContent = 'Сохранить';
    })
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
  evt.submitter.textContent = 'Сохранение...';
  editProfileInfo(popupProfileName.value, popupProfileProfession.value)
    .then(() => {
      profileName.textContent = popupProfileName.value;
      profileProfession.textContent = popupProfileProfession.value;
    })
    .then(() => {
      closePopup(popupProfile);
    })
    .catch((err) => {
      console.log(err);
    }).finally(() => {
      evt.target.reset();
      evt.submitter.setAttribute('disabled', true);
      evt.submitter.classList.add('popup__submit-button_inactive');
      evt.submitter.textContent = 'Сохранить';
    })
}

popupProfileForm.addEventListener('submit', saveProfileChanges);
/*Реализация функции редактирования профиля*/


getPromise()
  .then(getAvatar()
    .then((data) => {
      updateUserInfo(data);
    })
    .catch((err) => {
      console.log(err);
    }))
  .then(() => {
    getCards()
      .then((data) => {
        data.forEach((element) => {
          prependNewElement(element.link, element.name, element._id, element.owner._id, element);
          })
        })
  }).catch((err) => {
  console.log(err);
});

export function renderLikes(counter, massive) {
  return counter.textContent = massive.likes.length;
}
/*Спасибо за понятные комментарии!*/
export function isLiked(massive) {
  const isLiked = massive.likes.find(like => like._id === userId);
  if (isLiked === undefined) {
    return false;
  } else {
    return true;
  }
}

function updateUserInfo(user) {
  profileProfession.textContent = user.about;
  profileName.textContent = user.name;
  avatarImage.src = user.avatar;

  userId = user._id;
}




const popupAvatar = document.querySelector('#popup-avatar')
const popupAvatarLink = document.querySelector('.popup__item_avatar');
export const avatarImage = document.querySelector('.profile__avatar');
const avatarForm = popupAvatar.querySelector('.popup__form');

avatarImage.addEventListener('click', function () {
  openPopup(popupAvatar);
});

avatarForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...';
  changeAvatar(popupAvatarLink.value)
    .then((data) => {
      avatarImage.setAttribute('src', data.avatar);
    })
    .then(closePopup(popupAvatar))
    .catch((err) => {
      console.log(err);
    }).finally(() => {
      evt.target.reset();
      evt.submitter.setAttribute('disabled', true);
      evt.submitter.classList.add('popup__submit-button_inactive');
      evt.submitter.textContent = 'Сохранить';
    })
})

enableValidation(configuration);
