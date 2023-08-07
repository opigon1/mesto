import './index.css';
import { Card } from "../components/Card.js";
import { initialCards } from "../utils/cardArr.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";


const validateConfig = { //Конфиг для валидации
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_state_disabled',
  inputErrorClass: 'popup__input_state_invalid',
  errorClass: 'popup__input-error_type_active'
}

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
const cardListElement = document.querySelector('.elements');
const popupImage = document.querySelector('.popup_type_img');

const newPopupImage = new PopupWithImage('.popup_type_img')
const userInfo = new UserInfo({
  profileName: '.profile__name',
  profileStatus: '.profile__status'
})

const popupEditForm = new PopupWithForm('.popup_type_edit', {
  submitCallback: (formData) => {
    userInfo.setUsetInfo({
      profileName: formData.nameProfile,
      profileStatus: formData.statusProfile
    })
    popupEditForm.close()
  }
})
  
const popupAddForm = new PopupWithForm('.popup_type_add', {
    submitCallback: (formData) => {
    cards.addItem(createCard({
      name: formData.cardName,
      link: formData.cardLink
    }));
    popupAddForm.close()
  }
})

function createCard(item) {
  const card = new Card({
    data: item,
    elementsTemplate: '#elements-template',
    handleCardClick: (name, link) => newPopupImage.open({name, link})
  });
  const cardElement = card.createCard()
  return cardElement
}

const cards = new Section({
  data: initialCards,
  renderer: (item) => {
    cards.addItem(createCard(item));
  }
}, '.elements')

cards.renderItems();

editButton.addEventListener('click', () => {
  const { name, status } = userInfo.getUserInfo()
  popupEditForm.open()
  popupInputName.value = name
  popupInputStatus.value = status
});

addButton.addEventListener('click', () => {
  popupAddForm.open();
  addCardFormValidators.disabledButton();
});

newPopupImage.setEventListeners()
popupEditForm.setEventListeners()
popupAddForm.setEventListeners()


const profileFormValidators = new FormValidator(validateConfig, popupFopmEdit);
profileFormValidators.enableValidation();

const addCardFormValidators = new FormValidator(validateConfig, addFormElement);
addCardFormValidators.enableValidation();