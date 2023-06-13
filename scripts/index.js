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

function fillProfile() {
  profileName.textContent = popupInputName.value;
  profileStatus.textContent = popupInputStatus.value;
}

function fillProfileInput() {
  popupInputName.value = profileName.textContent;
  popupInputStatus.value = profileStatus.textContent;
  eventPopupOpen(popupEdit);
}

function eventPopupOpen(modal) {
  modal.classList.add('popup_opened');
}

function eventPopupClose(modal) {
  modal.classList.remove('popup_opened');
}

popups.forEach(popup => {
    const btnClose = popup.querySelector('.popup__closed');
    btnClose.addEventListener('click', () => eventPopupClose(popup))
  })

popupFopmEdit.addEventListener('submit', function (event) {
  event.preventDefault();
  fillProfile();
  eventPopupClose(popupEdit);
});

// closedButton.addEventListener('click', handleClosePopupClick);
addButton.addEventListener('click', () => eventPopupOpen(popupAdd));
editButton.addEventListener('click', fillProfileInput);
 
 

const initialCards = [ //массив с карточками
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const addFormElement = document.querySelector('.popup__add-form');
const addButtonSubmitElement = document.querySelector('.popup__add-submit');
const addInputNameElement = document.querySelector('.popup__add-imput-name');
const addInputLinkElement = document.querySelector('.popup__add-imput-link');
const cardListElement = document.querySelector('.elements');
const templateElement = document.querySelector('#elements-template').content.querySelector('.element')



function createCard(element) {
  const cardElement = templateElement.cloneNode(true);
  const cardName = cardElement.querySelector('.element__name');
  const cardImage = cardElement.querySelector('.element__img');
  const cardDelete = cardElement.querySelector('.element__delete');
  const cardLike = cardElement.querySelector('.element__like');
  cardImage.src = element.link;
  cardName.textContent = element.name;

  cardDelete.addEventListener('click', function() {
    cardElement.remove()
  })

  cardLike.addEventListener('click', function() {
    cardLike.classList.toggle('element__like_active')
  });

  return cardElement;
};

function renderCard(data, container, position = 'prepend') {
  
  switch (position) {
    case "append":
      container.append(createCard(data))
      break;
    case "prepend":
      container.prepend(createCard(data))
      break;
    default:
      break;
  }
}

initialCards.forEach(function(data) {
  renderCard(data, cardListElement,)
});

function handleSubmitAdd(e) {
  e.preventDefault();

  const data = {
    name: addInputNameElement.value,
    link: addInputLinkElement.value
  }

  renderCard(data, cardListElement,)
  eventPopupClose(popupAdd)
}

addFormElement.addEventListener('submit', handleSubmitAdd)