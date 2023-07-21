import { Card } from "./Card.js";
import {initialCards} from "./cardArr.js";
import { FormValidator } from "./FormValidator.js";


const validateConfig = { //Конфиг для валидации
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_state_disabled',
  inputErrorClass: 'popup__input_state_invalid',
  errorClass: 'popup__input-error_type_active'
}

const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const popupFopmEdit = document.querySelector('.popup__form_type_edit')
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputStatus = document.querySelector('.popup__input_type_status');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const addFormElement = document.querySelector('.popup__form_type_add');
const addButtonSubmitElement = document.querySelector('.popup__submit_type_add');
const addInputNameElement = document.querySelector('.popup__input_type_card-name');
const addInputLinkElement = document.querySelector('.popup__input_type_link');
const cardListElement = document.querySelector('.elements');
const popupImage = document.querySelector('.popup_type_img');

function fillProfile() { //Заполнение профиля
  profileName.textContent = popupInputName.value;
  profileStatus.textContent = popupInputStatus.value;
}

function openProfilePopup() { //Открытие профиля редактирования
  popupInputName.value = profileName.textContent;
  popupInputStatus.value = profileStatus.textContent;
  handlePopupOpen(popupEdit);
}

export function handlePopupOpen(modal) { //Открытие попапа
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closedPopupByEsc);
}

function handlePopupClose(modal) { //Закрытие попапа
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closedPopupByEsc);
}

function closedPopupByEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    handlePopupClose(popupOpened)
  }
}

popups.forEach(popup => { //Закрытие попапа на крестик
  const btnClose = popup.querySelector('.popup__closed');
  btnClose.addEventListener('click', () => handlePopupClose(popup));

  popup.addEventListener('mousedown', (evt) => { 
    if (evt.target.classList.contains('popup_opened')) {
      handlePopupClose(popup); 
    }
  })
})

popupFopmEdit.addEventListener('submit', function (event) { //Отправка формы редактирования
  event.preventDefault();
  fillProfile();
  handlePopupClose(popupEdit);
});

function openPopupImg(popupImagePic, cardImage, popupImageText, cardName) {
  popupImagePic.src =  cardImage.src;
  popupImagePic.alt = cardName.textContent
  popupImageText.textContent = cardName.textContent

  handlePopupOpen(popupImage);
}

function renderCard(data, container, position = 'prepend') { //Отрисовка карточек
  const cardElement = new Card({data, openPopupImg}, '#elements-template').createCard();

  switch (position) {
    case "append":
      container.append(cardElement)
      break;
    case "prepend":
      container.prepend(cardElement)
      break;
    default:
      break;
  }
}

initialCards.forEach(function(data) {
  renderCard(data, cardListElement,'append')
});

function handleSubmitAdd(e) {
  e.preventDefault();

  const data = {
    name: addInputNameElement.value,
    link: addInputLinkElement.value
  }

  addFormElement.reset();
  addCardFormValidators.disabledButton(addButtonSubmitElement);
  renderCard(data, cardListElement);
  handlePopupClose(popupAdd);
}

addFormElement.addEventListener('submit', handleSubmitAdd);
addButton.addEventListener('click', () => handlePopupOpen(popupAdd));
editButton.addEventListener('click', openProfilePopup);

const profileFormValidators = new FormValidator(validateConfig, popupFopmEdit);
profileFormValidators.enableValidation();

const addCardFormValidators = new FormValidator(validateConfig, addFormElement);
addCardFormValidators.enableValidation();
