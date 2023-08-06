import './index.css';
import { Card } from "../components/Card.js";
import { initialCards } from "../components/cardArr.js";
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

const newPopupImage = new PopupWithImage(popupImage)
const userInfo = new UserInfo({
  profileName,
  profileStatus,
})

const popupEditForm = new PopupWithForm(popupEdit, {
  submitCallback: (formData) => {
    userInfo.setUsetInfo({
      profileName: formData.nameProfile,
      profileStatus: formData.statusProfile
    })
    popupEditForm.close()
  }
})
  
const popupAddForm = new PopupWithForm(popupAdd, {
    submitCallback: (formData) => {
    cards.setItem(createCard({
      name: formData.cardName,
      link: formData.cardLink
    }));
    popupAddForm.close()
    addCardFormValidators.disabledButton(addButtonSubmitElement);
  }
})

function createCard(item) {
  const card = new Card({
    data: item,
    elementsTemplate: '#elements-template',
    handleCardClick: () => {
      newPopupImage.open(item)
    }
  });
  const cardElement = card.createCard()
  return cardElement
}

const cards = new Section({
  data: initialCards,
  renderer: (item) => {
    cards.setItem(createCard(item));
  }
}, cardListElement)

cards.renderItems();

editButton.addEventListener('click', () => {
  const { name, status } = userInfo.getUserInfo()
  popupEditForm.open()
  popupInputName.value = name
  popupInputStatus.value = status
});

addButton.addEventListener('click', () => {
  popupAddForm.open()
});

newPopupImage.setEventListeners()
popupEditForm.setEventListeners()
popupAddForm.setEventListeners()


const profileFormValidators = new FormValidator(validateConfig, popupFopmEdit);
profileFormValidators.enableValidation();

const addCardFormValidators = new FormValidator(validateConfig, addFormElement);
addCardFormValidators.enableValidation();