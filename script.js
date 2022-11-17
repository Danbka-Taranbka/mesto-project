/*Задаю переменные*/
const elements = document.querySelector('.elements');

const profileEditButton = document.querySelector('.profile .profile__main .profile__info .profile__edit-button');
const profileName = document.querySelector('.profile .profile__main .profile__info .profile__name');
const profileProfession = document.querySelector('.profile .profile__main .profile__info .profile__profession');

const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup .popup__content .popup__close-button');
const popupForm = document.querySelector('.popup .popup__content .popup__form');
const popupSubmitButton = popupForm.querySelector('.popup__submit-button');
const popupProfileName = popupForm.querySelector('.popup__item_name');
const popupProfileProfession = popupForm.querySelector('.popup__item_profession');


/*Реализация функции добавления новых карточек.
В графе image задаётся значение атрибута src,
а в графе title задаётся заголовок карточки.
elementTemplate - шаблон карточки без заполненных данных (картинка и название) 
с готовой HTML-разметкой.
element - сама карточка.
Добавление карточек */
function addElement(image, title) {
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);

  element.querySelector('.element__picture').setAttribute('src', image);
  element.querySelector('.element__picture').setAttribute('alt', title);
  element.querySelector('.element__title').textContent = title;
  
  element.querySelector('.element__like-button').addEventListener('click', function (evt) {
  evt.target.classList.toggle('element__like-button_active');
});
  
  elements.append(element);
}

/*Добавление карточек, заданных макетом.
Функция самостоятельного добавления карточек 
пользователем пока не реализована до конца.*/
addElement('./images/image-karachaevsk.jpg', 'Карачаевск');
addElement('./images/image-elbrus.jpg', 'Гора Эльбрус');
addElement('./images/image-dombay.jpg', 'Домбай');
addElement('./images/image-elbrus.jpg', 'Эльбрус');
addElement('./images/image-dombay.jpg', 'Гора Домбай');
addElement('./images/image-karachaevsk.jpg', 'Карачаево-Черкессия');

/*Управление popup*/
function editProfile() {
  popup.classList.toggle ('popup_opened');
  popupProfileName.value = profileName.textContent;
  popupProfileProfession.value = profileProfession.textContent;
}

profileEditButton.addEventListener('click', editProfile);
popupCloseButton.addEventListener('click', editProfile);


function profileSave(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileProfession.textContent = popupProfileProfession.value;
  popup.classList.toggle ('popup_opened');
}

popupForm.addEventListener('submit', profileSave);
