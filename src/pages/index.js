import './index.css';
import { Card } from "../components/Card.js";
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

const profileAvatar = document.querySelector('.profile__avatar-cover');
const popupFopmEdit = document.querySelector('.popup__form_type_edit')
const popupAvatarEdit = document.querySelector('.popup__form_type_avatar')
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputStatus = document.querySelector('.popup__input_type_status');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const addFormElement = document.querySelector('.popup__form_type_add');

let userId = null;

const api = new Api("https://nomoreparties.co/v1/cohort-73/", {
  headers: {
    authorization: "ab3d5963-89f3-4f42-abd5-a3c9a26d09e5",
    "content-type": "application/json"
  }
});

api.getAllInfo()
  .then(([cardData, userData]) => {
    userId = userData._id
    userInfo.setUsetInfo(userData.name, userData.about)
    userInfo.setUserAvatar(userData.avatar)
    cardsSection.renderItems(cardData)
  })
  .catch((err) => console.log(err));

// Отрисовка карточек с сервера

const cardsSection = new Section((item) => {
  cardsSection.appendItem(createCard(item));
}
, '.elements')

// Попап с картинкой

const newPopupImage = new PopupWithImage('.popup_type_img')
const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileStatusSelector: '.profile__status',
  profileAvatarSelector: '.profile__avatar'
})

// Удаление карточки

const deleteCardPopup = new PopupWithForm('.popup_type_delete',{
  submitCallback: (_id) => {
    api.deleteCard(_id)
      .then(() => {})
      .catch((err) => console.log(err))
  }
})

// Редактирование профиля

const popupEditForm = new PopupWithForm('.popup_type_edit', {
  submitCallback: (formData) => {
    popupEditForm.setSubmitButtonText("Сохранение...")
    api.editUserInfo(formData)
    .then(() => {
      userInfo.setUsetInfo(formData.name, formData.about)
      popupEditForm.close()
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupEditForm.setSubmitButtonText("Сохранить")
    })
  }
  }
)

// Создание карточки
  
const popupAddForm = new PopupWithForm('.popup_type_add', {
  submitCallback: (formData) => {
    popupAddForm.setSubmitButtonText("Создание...")
    api.addCard(formData)
    .then((res) => {
      cardsSection.prependItem(createCard(res));
      popupAddForm.close()
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAddForm.setSubmitButtonText("Создать")
    })
  }
})

// Редактирование аватара

const popupEditAvatar = new PopupWithForm('.popup_type_avatar', {
  submitCallback: (formData) => {
    popupEditAvatar.setSubmitButtonText("Сохранение...")
    api.editUserAvatar(formData)
      .then(() => {
        userInfo.setUserAvatar(formData.avatar)
        popupEditAvatar.close()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupEditAvatar.setSubmitButtonText("Сохранить")
      })
  }
})

// Создание карточек

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
    .then(newData => data.setLikes(newData))
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

// Установка слушателей попапов

editButton.addEventListener('click', () => {
  const user = userInfo.getUserInfo();
  popupInputName.value = user.name
  popupInputStatus.value = user.status
  popupEditForm.open();
});

addButton.addEventListener('click', () => {
  popupAddForm.open();
  addCardFormValidators.disableButton();
});

profileAvatar.addEventListener('click', () => {
  popupEditAvatar.open()
  editAvatarFormValidator.disableButton()
})

newPopupImage.setEventListeners()
popupEditForm.setEventListeners()
popupAddForm.setEventListeners()
popupEditAvatar.setEventListeners()
deleteCardPopup.setEventListeners()

// Валижация форм

const profileFormValidators = new FormValidator(validateConfig, popupFopmEdit);
profileFormValidators.enableValidation();

const addCardFormValidators = new FormValidator(validateConfig, addFormElement);
addCardFormValidators.enableValidation();

const editAvatarFormValidator = new FormValidator(validateConfig, popupAvatarEdit);
editAvatarFormValidator.enableValidation()