export class Popup {
  _popup;
  _closeButton;

  constructor(popupElement) {
    this._popup = document.querySelector(popupElement);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    
    this._popup.addEventListener("mousedown", function (evt) {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
}

export class PopupWithImage extends Popup {
  constructor (popupElement) {
    super(popupElement);
    this._image = document.querySelector(".image-popup__image");
    this._caption = document.querySelector(".image-popup__title");
  }
  
  open(link, name) {
    super.open();
    /*Подстановку актуальных данных наверняка следует выполнить по-другому
    Писал код, основываясь на своём проекте!*/
      this._image.setAttribute("src", link);
      this._image.setAttribute("alt", name);
      this._caption.textContent = name;
      
  }
}