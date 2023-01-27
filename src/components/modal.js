/*Открытие любого popup.*/
function openPopup(popup) {
  document.addEventListener('keydown', escapePopup);
  popup.classList.add('popup_opened');
  closeOverlay(popup);
}

/*ЗАКРЫТИЕ POPUP*/
function closePopup (popup) {
  document.removeEventListener('keydown', escapePopup);
  popup.classList.remove('popup_opened');
}

/*Закрытие нажатием на кнопку*/
const closeButtons = document.querySelectorAll('.popup__close-button');

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

/*Закрытие нажатием на escape*/
function escapePopup(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};


/*Закрытие нажатием на оверлей*/
function closeOverlay (popup) {
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  })
};
/*ЗАКРЫТИЕ POPUP*/

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
  const submitButton = popupProfile.querySelector('.popup__submit-button');
  evt.preventDefault();/*Отмена стандартного поведения с целью отключения перезагрузки страницы.*/
  profileName.textContent = popupProfileName.value;
  profileProfession.textContent = popupProfileProfession.value;
  closePopup(popupProfile);
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add('popup__submit-button_inactive');
}

popupProfileForm.addEventListener('submit', saveProfileChanges);
/*Реализация функции редактирования профиля*/

export { openPopup, closePopup };