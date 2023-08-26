import { Popup } from "../components/Popup.js";

export class PopupWithForm extends Popup {
  #submitCallback
  #form;
  #inputList;
  #formValues;
  #popup

  constructor(popupSelector, { submitCallback }) {
    super(popupSelector);
    this.#submitCallback = submitCallback;
    this.#popup = document.querySelector(popupSelector);
    this.#form = this.#popup.querySelector('.popup__form');
    this.#inputList = Array.from(this.#form.querySelectorAll('.popup__input'))
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
}