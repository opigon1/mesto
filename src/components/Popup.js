export class Popup {
  #buttonClose;
  #popup;
  #buttonSubmit

  constructor(popupSelector) {
    this.#popup = document.querySelector(popupSelector);
    this.#buttonClose = this.#popup.querySelector('.popup__closed');
    this.#buttonSubmit = this.#popup.querySelector('.popup__submit')
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
    this.#popup.classList.add('popup_opened');
    document.addEventListener('keydown', this.#closePopupByEsc);
  }

  close() {
    this.#popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.#closePopupByEsc);
  }

  setEventListeners() {
    this.#buttonClose.addEventListener('click', () => {
      this.close();
    });

    this.#popup.addEventListener('mousedown', this.#closePopupByOverlay.bind(this));
  }

  loadingMessage(isLoading) {
    if(isLoading) {
      this.#buttonSubmit.textContent = 'Сохранение...'
    }
    else if (this.#popup.classList.contains('popup_type_add')) {
      this.#buttonSubmit.textContent = 'Создать'
    }
    else {
      this.#buttonSubmit.textContent = 'Сохранить'
    }
  }
}