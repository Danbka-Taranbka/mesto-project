/*Задаю переменные*/
let likeButton = document.querySelector('.element__like-button');
let likeButtons = document.querySelectorAll('.element__like-button');

let profileEditButton = document.querySelector('.profile .profile__main .profile__info .profile__edit-button');
let profileName = document.querySelector('.profile .profile__main .profile__info .profile__name');
let profileProfession = document.querySelector('.profile .profile__main .profile__info .profile__profession');

let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup .popup__content .popup__close-button');
let popupForm = document.querySelector('.popup .popup__content .popup__form');
let popupSubmitButton = popupForm.querySelector('.popup__submit-button');
let popupProfileName = popupForm.querySelector('.popup__item_name');
let popupProfileProfession = popupForm.querySelector('.popup__item_profession');


/*Управление like*/
function like() {
  likeButton.classList.toggle ('element__like-button_active');
}

likeButton.addEventListener('click', like);

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
