/*Задаю переменные*/
const elements = document.querySelector('.elements');

/*Кнопка добавления новой карточки.*/
const profileAddButton = document.querySelector('.profile .profile__add-button');
/*Кнопка редактирования профиля (имя и профессия).*/
const profileEditButton = document.querySelector('.profile .profile__main .profile__info .profile__edit-button');

const profileName = document.querySelector('.profile .profile__main .profile__info .profile__name');
const profileProfession = document.querySelector('.profile .profile__main .profile__info .profile__profession');


/*Переменные, содержащие ключевое слово popupElement 
используются для работы с карточками.*/
const popupElement = document.querySelector('#popup-element');
const popupElementCloseButton = popupElement.querySelector('.popup__content .popup__close-button');
const popupElementForm = popupElement.querySelector('.popup__content .popup__form');
const popupElementPlaceName = popupElementForm.querySelector('.popup__item_place-name');
const popupElementImage = popupElementForm.querySelector('.popup__item_image');

/*Открытие и закрытие popup, отвечающего за добавление новых карточек.
Закрытие без сохранения изменений.*/
function newElementPopup() {
  popupElement.classList.toggle ('popup_opened');
  popupElementImage.value = '';
  popupElementPlaceName.value = '';
}

profileAddButton.addEventListener('click', newElementPopup);
popupElementCloseButton.addEventListener('click', newElementPopup);


/*Функции создания и добавления новых карточек.
В графе image задаётся значение атрибута src,
а в графе title задаётся заголовок карточки.
elementTemplate - шаблон карточки без заполненных данных (картинка и название) 
с готовой HTML-разметкой.
element - сама карточка.*/
function newElement(image, title) {
  /*Клонирование шаблона*/
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);

  element.querySelector('.element__picture').setAttribute('src', image);
  element.querySelector('.element__picture').setAttribute('alt', title);
  element.querySelector('.element__title').textContent = title;
  
  element.querySelector('.element__like-button').addEventListener('click', function (evt) {
  evt.target.classList.toggle('element__like-button_active');
});
  /*Добавление нового элемента в конец блока elements.*/
  elements.prepend(element);
}

/*Добавление основных карточек*/
newElement('./images/image-karachaevsk.jpg', 'Карачаевск');
newElement('./images/image-elbrus.jpg', 'Гора Эльбрус');
newElement('./images/image-dombay.jpg', 'Домбай');
newElement('./images/image-elbrus.jpg', 'Эльбрус');
newElement('./images/image-dombay.jpg', 'Гора Домбай');
newElement('./images/image-karachaevsk.jpg', 'Карачаево-Черкессия');


/*Функция самостоятельного добавления новой карточки пользователем
с помощью формы.*/
function addNewElement (evt) {
  /*Отмена стандартного поведения с целью отключения перезагрузки страницы.*/
  evt.preventDefault();
  /*Принимаем данные из формы и передаём их значения 
  аргументам функции добавления новой карточки.*/
  let image = popupElementImage.value;
  let title = popupElementPlaceName.value;
  newElement(image, title);
  
  /*Обнуление заполняемых значений формы.*/
  popupElementImage.value = '';
  popupElementPlaceName.value = '';

  popupElement.classList.toggle ('popup_opened');
}

popupElementForm.addEventListener('submit', addNewElement);



/*Переменные, содержащие ключевое слово popupProfile 
используются для работы с данными формы.*/
const popupProfile = document.querySelector('#popup-profile');
const popupProfileCloseButton = popupProfile.querySelector('.popup__content .popup__close-button');
const popupProfileForm = popupProfile.querySelector('.popup__content .popup__form');
const popupProfileName = popupProfileForm.querySelector('.popup__item_name');
const popupProfileProfession = popupProfileForm.querySelector('.popup__item_profession');

/*Открытие и закрытие popup, отвечающего за редактирования профиля.
Закрытие без сохранения изменений.*/
function editProfile() {
  popupProfile.classList.toggle ('popup_opened');
  /*Отображение действующих данных профиля (имя и профессия).*/
  popupProfileName.value = profileName.textContent;
  popupProfileProfession.value = profileProfession.textContent;
}

profileEditButton.addEventListener('click', editProfile);
popupProfileCloseButton.addEventListener('click', editProfile);


/*Реализация функции редактирования профиля*/
function profileSave(evt) {
  evt.preventDefault();/*Отмена стандартного поведения с целью отключения перезагрузки страницы.*/
  profileName.textContent = popupProfileName.value;
  profileProfession.textContent = popupProfileProfession.value;
  popupProfile.classList.toggle ('popup_opened');
}

popupProfileForm.addEventListener('submit', profileSave);