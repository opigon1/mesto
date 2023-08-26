import './index.css';
import { Card } from "../components/Card.js";
import { initialCards } from "../utils/cardArr.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

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
const deletePopup = document.querySelector('.popup_type_delete')
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileAvatar = document.querySelector('.profile__avatar-cover');
const popupFopmEdit = document.querySelector('.popup__form_type_edit')
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputStatus = document.querySelector('.popup__input_type_status');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const addFormElement = document.querySelector('.popup__form_type_add');
const addButtonSubmitElement = document.querySelector('.popup__submit_type_add');
const cardListElement = document.querySelector('.elements');
const popupImage = document.querySelector('.popup_type_img');
const likeElement = document.querySelector('.element__like')
const deleteButton = document.querySelector('.element__delete')

let userId = null;

const api = new Api("https://nomoreparties.co/v1/cohort-73/", {
  headers: {
    authorization: "ab3d5963-89f3-4f42-abd5-a3c9a26d09e5",
    "content-type": "application/json"
  }
});

const deleteCardPopup = new PopupWithForm('.popup_type_delete',{
  submitCallback: (_id) => {
    api.deleteCard(_id)
      .then(() => {})
      .catch((err) => console.log(err))
  }
})
deleteCardPopup.setEventListeners()

api.getAllInfo()
  .then(([cardData, userData]) => {
    userId = userData._id
    userInfo.setUsetInfo(userData.name, userData.about)
    userInfo.setUserAvatar(userData.avatar)
    cards.renderItems(cardData)
  })
  .catch((err) => console.log(err));

const newPopupImage = new PopupWithImage('.popup_type_img')
const userInfo = new UserInfo({
  profileName: '.profile__name',
  profileStatus: '.profile__status',
  profileAvatar: '.profile__avatar'
})

const cards = new Section((item) => {
  cards.addItem(createCard(item), 'append');
}
, '.elements')

const popupEditForm = new PopupWithForm('.popup_type_edit', {
  submitCallback: (formData) => {
    popupEditForm.loadingMessage(true)
    api.editUserInfo(formData)
    .then(() => {
      userInfo.setUsetInfo(formData.name, formData.about)
      popupEditForm.close()
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupEditForm.loadingMessage(false)
    })
  }
  }
)
  
const popupAddForm = new PopupWithForm('.popup_type_add', {
  submitCallback: (formData) => {
    popupAddForm.loadingMessage(true)
    api.addCard(formData)
    .then((res) => {
      cards.addItem(createCard(res), 'prepend');
      popupAddForm.close()
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAddForm.loadingMessage(false)
    })
  }
})

const popupEditAvatar = new PopupWithForm('.popup_type_avatar', {
  submitCallback: (formData) => {
    popupEditAvatar.loadingMessage(true)
    api.editUserAvatar(formData)
      .then(() => {
        userInfo.setUserAvatar(formData.avatar)
        popupEditAvatar.close()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupEditAvatar.loadingMessage(false)
      })
  }
})

function createCard(item) {
  const card = new Card({
    data: item,
    userId,
    handleCardClick,
    handleCardLike,
    handleCardDelete
  }, '#elements-template',
  );
  const cardElement = card.createCard()
  return cardElement
}

function handleCardClick(name, link) {
  newPopupImage.open({name, link})
}

function handleCardLike(data) {
  api.handleLikeCard(data.getId(), data.isLiked())
    .then(newData => data.setLike(newData))
    .catch((err) => console.log(err))
}

function handleCardDelete(card) {
  deleteCardPopup.open()
  deleteCardPopup.setNewSubmitCallback(() => {
    api.deleteCard(card.getId())
      .then(() => {
        card.removeCard();
        deleteCardPopup.close()
      })
      .catch((err) => console.log(err))
  })
}

editButton.addEventListener('click', () => {
  const user = userInfo.getUserInfo();
  popupInputName.value = user.name
  popupInputStatus.value = user.status
  popupEditForm.open();
});

addButton.addEventListener('click', () => {
  popupAddForm.open();
  addCardFormValidators.disabledButton();
});

profileAvatar.addEventListener('click', () => {
  popupEditAvatar.open()
})

newPopupImage.setEventListeners()
popupEditForm.setEventListeners()
popupAddForm.setEventListeners()
popupEditAvatar.setEventListeners()

const profileFormValidators = new FormValidator(validateConfig, popupFopmEdit);
profileFormValidators.enableValidation();

const addCardFormValidators = new FormValidator(validateConfig, addFormElement);
addCardFormValidators.enableValidation();