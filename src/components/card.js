import { openPicture } from './modal.js';
import { deleteCard, getCards, putLike, deleteLike } from './api.js';
import { userId, renderLikes, isLiked } from './index.js';
/*Задаю переменные*/
const cardTemplate = document.querySelector('.elements');

/*Кнопка добавления новой карточки.*/
const addButton = document.querySelector('.profile__add-button');

/*Переменные, содержащие ключевое слово popupCard
используются для работы с карточками.*/
const popupCard = document.querySelector('#popup-card');
/*const popupCardCloseButton = popupCard.querySelector('.popup__content .popup__close-button');*/
const popupCardForm = popupCard.querySelector('.popup__content .popup__form');



/*Функции создания новых карточек.
В графе image задаётся значение атрибута src,
а в графе title задаётся заголовок карточки.
elementTemplate - шаблон карточки без заполненных данных (картинка и название) 
с готовой HTML-разметкой.
element - сама карточка.*/

function createCard (image, title, id, ownerId, massive) {
  /*Клонирование шаблона*/
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const cardImage = element.querySelector('.element__picture');
  const deleteButton = element.querySelector('.element__delete-button');
  deleteButton.setAttribute('disabled', true);
  const likeButton = element.querySelector('.element__like-button');
  const likesCounter = element.querySelector('.element__like-counter');
  renderLikes(likesCounter, massive);
  if (isLiked(massive)) {
    likeButton.classList.add('element__like-button_active');
  } else {
    likeButton.classList.remove('element__like-button_active');
  }

  cardImage.setAttribute('src', image);
  cardImage.setAttribute('alt', title);
  element.querySelector('.element__title').textContent = title;

  likeButton.addEventListener('click', function () {
    if (likeButton.classList.contains('element__like-button_active')) {
      deleteLike(id)
        .then(() => {likeButton.classList.remove('element__like-button_active');})
        .then(() => {likesCounter.textContent = (Number(likesCounter.textContent) - 1);})
        .catch((err) => {console.log(err);})
    } else {
      putLike(id)
        .then(() => {likeButton.classList.add('element__like-button_active');})
        .then(() => {likesCounter.textContent = (Number(likesCounter.textContent) + 1);})
        .catch((err) => {console.log(err);})
    }
    
  });

    if (ownerId === userId) {
    deleteButton.classList.add('element__delete-button_active');
    deleteButton.removeAttribute('disabled', true);
    deleteButton.addEventListener('click', function (evt) {
      deleteCard(id)
        .then(() => {
          evt.target.closest('.element').remove();
        })
        .catch((err) => {
          console.log(err);
        })
    });
  };

    /*Разворачивание картинки.*/
    cardImage.addEventListener('click', function () {
    openPicture(image, title);
  });
  return element;
}

/*Функции добавления новых карточек.*/
function prependNewElement(image, title, id, ownerId, massive) {
  const element = createCard(image, title, id, ownerId, massive);
  cardTemplate.prepend(element);
}







export { cardTemplate, addButton, popupCard, popupCardForm, createCard, 
  prependNewElement}