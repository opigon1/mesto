export class Popup {
  #buttonClose;

  constructor(popupSelector) {
    this.popupSelector = document.querySelector(popupSelector);
    this.#buttonClose = this.popupSelector.querySelector('.popup__closed');
  }

  #closePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  #closePopupByOverlay(event) {
      if (event.target.classList.contains('popup_opened')) {
        this.close()
      };
  };

  open() {
    this.popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this.#closePopupByEsc);
  }

  close() {
    this.popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.#closePopupByEsc);
  }

  setEventListeners() {
    this.#buttonClose.addEventListener('click', () => {
      this.close();
    });

    this.popupSelector.addEventListener('mousedown', this.#closePopupByOverlay.bind(this));
  }
}
