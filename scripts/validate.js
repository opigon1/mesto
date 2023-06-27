function hideInputError(inputElement, errorElement, validateConfig) { // Функция скрытия ошибки
  inputElement.classList.remove(validateConfig.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function showInputError(inputElement, errorElement, validateConfig) { // Функция появления ошибки
  inputElement.classList.add(validateConfig.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function disabledButton(buttonElement, validateConfig) { // Функция отключения кнопки
  buttonElement.disabled = true;
  buttonElement.classList.add(validateConfig.inactiveButtonClass)
}

function enabledButton(buttonElement, validateConfig) { // Функция включения кнопки
  buttonElement.disabled = false;
  buttonElement.classList.remove(validateConfig.inactiveButtonClass)
}

function checkInputValidity(inputElement, formElement, validateConfig) { // Проверка поля на валидность
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  
  if(!isInputValid) {
    showInputError(inputElement, errorElement, validateConfig);
  } else {
    hideInputError(inputElement, errorElement, validateConfig);
  }
}

function toggleButtonState(buttonElement, isActive, validateConfig) { // Функция переключения состояния кнопки
  if(!isActive) {
    disabledButton(buttonElement, validateConfig)
  } else {
    enabledButton(buttonElement, validateConfig)
  }
}

function setEventListeners(formElement, validateConfig) { // Слушатели события
  const inputList = formElement.querySelectorAll(validateConfig.inputSelector);
  const submitButtonElement = formElement.querySelector(validateConfig.submitButtonSelector);

  toggleButtonState(submitButtonElement, formElement.checkValidity(), validateConfig);

  inputList.forEach(function(inputElement) {
    inputElement.addEventListener('input', function() {
      toggleButtonState(submitButtonElement, formElement.checkValidity(), validateConfig);

      checkInputValidity(inputElement, formElement, validateConfig)
    })
  })
}

function enableValidation(validateConfig) {
  const formsList = document.querySelectorAll(validateConfig.formSelector);

  formsList.forEach(function(formElement) {
    setEventListeners(formElement, validateConfig);
  });
}

const validateConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_state_disabled',
  inputErrorClass: 'popup__input_state_invalid',
  errorClass: 'popup__input-error_type_active'
}

enableValidation(validateConfig);