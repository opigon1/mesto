const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupClosed = popup.querySelector('.popup__closed');
const popupFopm = popup.querySelector('.popup__form');
const popupInputName = popup.querySelector('.popup__input_type_name');
const popupInputStatus = popup.querySelector('.popup__input_type_status');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status')

function eventPopupOpen() { //функция открытия попапа
  popup.classList.add('popup_opened')
  popupInputName.value = profileName.textContent;
  popupInputStatus.value = profileStatus.textContent;
}

function eventPopupClose() { //функция закрытия попапа
  popup.classList.remove('popup_opened')
}

function handleFormSubmit(evt) { // редактирование имени
  evt.preventDefault()
  
  profileName.textContent = popupInputName.value;
  profileStatus.textContent = popupInputStatus.value;

  eventPopupClose()
}

editButton.addEventListener('click', eventPopupOpen);
popupClosed.addEventListener('click', eventPopupClose);
popupFopm.addEventListener('submit', handleFormSubmit);