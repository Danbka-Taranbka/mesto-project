/*Открытие любого popup.*/
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escapePopup);
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
      closePopup(evt.target);
    }
  })
};
/*ЗАКРЫТИЕ POPUP*/

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



export { openPopup, closePopup, openPicture };