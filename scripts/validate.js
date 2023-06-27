function hideInputError(inputElement, errorElement, ValidateConfig) { // Функция скрытия ошибки
  inputElement.classList.remove(ValidateConfig.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function showInputError(inputElement, errorElement, ValidateConfig) { // Функция появления ошибки
  inputElement.classList.add(ValidateConfig.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function disabledButton(ButtonElement, ValidateConfig) { // Функция отключения кнопки
  ButtonElement.disabled = 'disabled';
  ButtonElement.classList.add(ValidateConfig.inactiveButtonClass)
}

function enabledButton(ButtonElement, ValidateConfig) { // Функция включения кнопки
  ButtonElement.disabled = false;
  ButtonElement.classList.remove(ValidateConfig.inactiveButtonClass)
}

function checkInputValidity(inputElement, formElement, ValidateConfig) { // Проверка поля на валидность
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  
  if(!isInputValid) {
    showInputError(inputElement, errorElement, ValidateConfig);
  } else {
    hideInputError(inputElement, errorElement, ValidateConfig);
  }
}

function toggleButtonState(ButtonElement, isActive, ValidateConfig) { // Функция переключения состояния кнопки
  if(!isActive) {
    disabledButton(ButtonElement, ValidateConfig)
  } else {
    enabledButton(ButtonElement, ValidateConfig)
  }
}

function setEventListeners(formElement, ValidateConfig) { // Слушатели события
  const inputList = formElement.querySelectorAll(ValidateConfig.inputSelector);
  const submitButtonElement = formElement.querySelector(ValidateConfig.submitButtonSelector);

  toggleButtonState(submitButtonElement, formElement.checkValidity(), ValidateConfig);

  [...inputList].forEach(function(inputElement) {
    inputElement.addEventListener('input', function() {
      toggleButtonState(submitButtonElement, formElement.checkValidity(), ValidateConfig);

      checkInputValidity(inputElement, formElement, ValidateConfig)
    })
  })

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (!formElement.checkValidity()) return;
  });
}

function enableValidation(ValidateConfig) {
  const formsList = document.querySelectorAll(ValidateConfig.formSelector);

  [...formsList].forEach(function(formElement) {
    setEventListeners(formElement, ValidateConfig);
  });
}

const ValidateConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_state_disabled',
  inputErrorClass: 'popup__input_state_invalid',
  errorClass: 'popup__input-error_type_active'
}

enableValidation(ValidateConfig);