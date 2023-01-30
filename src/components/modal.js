/*Открытие любого popup.*/
function openPopup(popup) {
  document.addEventListener('keydown', escapePopup);
  popup.classList.add('popup_opened');
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
function closeOverlay () {
  document.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
    }
  })
};

closeOverlay();
/*ЗАКРЫТИЕ POPUP*/



export { openPopup, closePopup };