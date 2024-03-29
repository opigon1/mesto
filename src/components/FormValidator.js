export class FormValidator {
  #formSelector;
  #inputSelector;
  #submitButtonSelector;
  #inactiveButtonClass;
  #inputErrorClass
  #errorClass;
  #formElement;
  #buttonElement;
  #inputList;

  constructor(data, formElement) {
    this.#formSelector = data.formSelector;
    this.#inputSelector = data.inputSelector;
    this.#submitButtonSelector = data.submitButtonSelector;
    this.#inactiveButtonClass = data.inactiveButtonClass;
    this.#inputErrorClass = data.inputErrorClass;
    this.#errorClass = data.errorClass;
    this.#formElement = formElement;
    this.#inputList = Array.from(this.#formElement.querySelectorAll(this.#inputSelector));
    this.#buttonElement = this.#formElement.querySelector(this.#submitButtonSelector);
  }

  #getErrorElement(inputElement) {
    return this.#formElement.querySelector(`#${inputElement.name}-error`);
  }

  #hideInputError(inputElement) {
    inputElement.classList.remove(this.#inputErrorClass);
    const errorElement = this.#getErrorElement(inputElement); 
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.remove(this.#errorClass)
  }

  #showInputError(inputElement) {
    inputElement.classList.add(this.#inputErrorClass);
    const errorElement = this.#getErrorElement(inputElement); 
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this.#errorClass)
  }

  disableButton() {
    this.#buttonElement.classList.add(this.#inactiveButtonClass);
    this.#buttonElement.disabled = true;
  }

  #enableButton() {
    this.#buttonElement.classList.remove(this.#inactiveButtonClass);
    this.#buttonElement.disabled = false;
  }

  #checkInputValidity(inputElement) {
    if(!inputElement.validity.valid) {
      this.#showInputError(inputElement);
    } else {
      this.#hideInputError(inputElement);
    }
  }

  #toggleButtonState(isActive) {
    if(!isActive) {
      this.disableButton()
    } else {
      this.#enableButton()
    }
  }

  #setEventListeners() {

    this.#inputList.forEach((inputElement) => {
      this.#toggleButtonState(this.#formElement.checkValidity());
      inputElement.addEventListener('input', () => {
        this.#checkInputValidity(inputElement);
        this.#toggleButtonState(this.#formElement.checkValidity());
      });
    })

  }

  enableValidation() {
    this.#setEventListeners();
  }
}
