import { openPopup, closePopup } from './modal.js';

/*Задаю переменные*/
const cardTemplate = document.querySelector('.elements');

/*Кнопка добавления новой карточки.*/
const addButton = document.querySelector('.profile__add-button');

/*Переменные, содержащие ключевое слово popupCard
используются для работы с карточками.*/
const popupCard = document.querySelector('#popup-card');
/*const popupCardCloseButton = popupCard.querySelector('.popup__content .popup__close-button');*/
const popupCardForm = popupCard.querySelector('.popup__content .popup__form');
const popupCardPlaceName = popupCardForm.querySelector('.popup__item_place-name');
const popupCardImage = popupCardForm.querySelector('.popup__item_image');

addButton.addEventListener('click', function () {
  openPopup(popupCard);
});


/*Функции создания новых карточек.
В графе image задаётся значение атрибута src,
а в графе title задаётся заголовок карточки.
elementTemplate - шаблон карточки без заполненных данных (картинка и название) 
с готовой HTML-разметкой.
element - сама карточка.*/

function createCard (image, title) {
  /*Клонирование шаблона*/
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const cardImage = element.querySelector('.element__picture');

  cardImage.setAttribute('src', image);
  cardImage.setAttribute('alt', title);
  element.querySelector('.element__title').textContent = title;
  element.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });
  element.querySelector('.element__delete-button').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });
    /*Разворачивание картинки.*/
    cardImage.addEventListener('click', function (evt) {
    openPicture(image, title);
  });
  return element;
}

/*Функции добавления новых карточек.*/
function prependNewElement(image, title) {
  const element = createCard (image, title);
  cardTemplate.prepend(element);
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/*Добавление основных карточек*/
initialCards.forEach(function (item) {
  prependNewElement(item.link, item.name);
});


/*Функция самостоятельного добавления новой карточки пользователем
с помощью формы.*/
function createNewElement (evt) {
  const submitButton = popupCard.querySelector('.popup__submit-button');
  /*Отмена стандартного поведения с целью отключения перезагрузки страницы.*/
  evt.preventDefault();
  /*Принимаем данные из формы и передаём их значения 
  аргументам функции добавления новой карточки.*/
  const image = popupCardImage.value;
  const title = popupCardPlaceName.value;
  prependNewElement(image, title);
  
  /*Обнуление заполняемых значений формы.*/
  evt.target.reset();
  
  closePopup(popupCard);
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add('popup__submit-button_inactive');
}



/*Задаю переменные, относящиеся к imagePopup*/
const imagePopup = document.querySelector('.image-popup');
/*const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button');*/
const imagePopupPicture = imagePopup.querySelector('.image-popup__image');
const imagePopupTitle = imagePopup.querySelector('.image-popup__title');

/*Функция открытия картинки*/
function openPicture (picture, heading) {
  openPopup(imagePopup);
  imagePopupTitle.textContent = heading;
  imagePopupPicture.setAttribute('src', picture);
  imagePopupPicture.setAttribute('alt', heading);
}

export { cardTemplate, addButton, popupCard, popupCardForm, popupCardPlaceName, popupCardImage, createCard, 
  prependNewElement, initialCards, createNewElement, imagePopup, imagePopupPicture, imagePopupTitle, openPicture }