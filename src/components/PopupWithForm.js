import { Popup } from "../components/Popup.js";

export class PopupWithForm extends Popup {
  #submitCallback
  #form;
  #inputList;
  #buttonSubmit;

  constructor(popupSelector, { submitCallback }) {
    super(popupSelector);
    this.#submitCallback = submitCallback;
    this.#form = this._popup.querySelector('.popup__form');
    this.#inputList = Array.from(this.#form.querySelectorAll('.popup__input'))
    this.#buttonSubmit = this._popup.querySelector('.popup__submit')
  }

  setNewSubmitCallback(callBack) {
    this.#submitCallback = callBack
  }

  #getInputValues() {
    const formValues = {};
    this.#inputList.forEach(input => {
      formValues[input.name] = input.value
    })
    return formValues;
  };
  
  close() {
    super.close();
    this.#form.reset()
  }

  setEventListeners() {
    super.setEventListeners();
    this.#form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.#submitCallback(this.#getInputValues());
    })
  }

  setSubmitButtonText(text) {
    this.#buttonSubmit.textContent = text;
} 

  // setIsLoading(isLoading) {
  //   if(isLoading) {
  //     this.#buttonSubmit.textContent = 'Сохранение...'
  //   }
  //   else if (this.#popup.classList.contains('popup_type_add')) {
  //     this.#buttonSubmit.textContent = 'Создать'
  //   }
  //   else {
  //     this.#buttonSubmit.textContent = 'Сохранить'
  //   }
  // }
}