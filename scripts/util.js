/*Открытие любого popup.*/
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

/*ЗАКРЫТИЕ POPUP*/
function closePopup (popup) {
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
    const popup = document.querySelectorAll('.popup');
    popup.forEach(closePopup);
  };
};

document.addEventListener('keydown', escapePopup);

/*Закрытие нажатием на оверлей*/
function closeOverlay () {
  const popup = document.querySelectorAll('.popup');
  const popupOverlayArr = Array.from(document.querySelectorAll('.popup__overlay'));
  popupOverlayArr.forEach((element) => {
    element.addEventListener('click', function () {
      popup.forEach(closePopup);
    });
  });
}

closeOverlay();
/*ЗАКРЫТИЕ POPUP*/

export { openPopup, closePopup, closeButtons, escapePopup, closeOverlay }