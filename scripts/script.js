/*Задаю переменные*/
const elements = document.querySelector('.elements');

/*Кнопка добавления новой карточки.*/
const profileAddButton = document.querySelector('.profile__add-button');
/*Кнопка редактирования профиля (имя и профессия).*/
const profileEditButton = document.querySelector('.profile__edit-button');

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');


/*Переменные, содержащие ключевое слово popupCard
используются для работы с карточками.*/
const popupCard = document.querySelector('#popup-element');
const popupCardCloseButton = popupCard.querySelector('.popup__content .popup__close-button');
const popupCardForm = popupCard.querySelector('.popup__content .popup__form');
const popupCardPlaceName = popupCardForm.querySelector('.popup__item_place-name');
const popupCardImage = popupCardForm.querySelector('.popup__item_image');

/*Открытие любого popup.*/
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

profileAddButton.addEventListener('click', function () {
  openPopup(popupCard);
});


/*Задаю переменные, относящиеся к imagePopup*/
const imagePopup = document.querySelector('.image-popup');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button');
const imagePopupPicture = imagePopup.querySelector('.image-popup__image');
const imagePopupTitle = imagePopup.querySelector('.image-popup__title');

/*Функция открытия картинки*/
function openPicture (picture, heading) {
  openPopup(imagePopup);
  imagePopupTitle.textContent = heading;
  imagePopupPicture.setAttribute('src', picture);
  imagePopupPicture.setAttribute('alt', heading);
}


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
  elements.prepend(element);
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
}

popupCardForm.addEventListener('submit', createNewElement);



/*Переменные, содержащие ключевое слово popupProfile 
используются для работы с данными формы.*/
const popupProfile = document.querySelector('#popup-profile');
const popupProfileCloseButton = popupProfile.querySelector('.popup__content .popup__close-button');
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



function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

const closeButtons = document.querySelectorAll('.popup__close-button');

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});