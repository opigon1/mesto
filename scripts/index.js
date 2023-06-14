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

function fillProfile() { //Заполнение профиля
  profileName.textContent = popupInputName.value;
  profileStatus.textContent = popupInputStatus.value;
}

function fillProfileInput() { //Открытие профиля редактирования
  popupInputName.value = profileName.textContent;
  popupInputStatus.value = profileStatus.textContent;
  handlePopupOpen(popupEdit);
}

function handlePopupOpen(modal) { //Открытие попапа
  modal.classList.add('popup_opened');
}

function handlePopupClose(modal) { //Закрытие попапа
  modal.classList.remove('popup_opened');
}

popups.forEach(popup => { //Закрытие попапа на крестик
    const btnClose = popup.querySelector('.popup__closed');
    btnClose.addEventListener('click', () => handlePopupClose(popup))
  })

popupFopmEdit.addEventListener('submit', function (event) { //Отправка формы редактирования
  event.preventDefault();
  fillProfile();
  handlePopupClose(popupEdit);
});

addButton.addEventListener('click', () => handlePopupOpen(popupAdd));
editButton.addEventListener('click', fillProfileInput);
 
 



const addFormElement = document.querySelector('.popup__form_type_add');
const addButtonSubmitElement = document.querySelector('.popup__submit_type_add');
const addInputNameElement = document.querySelector('.popup__input_type_card-name');
const addInputLinkElement = document.querySelector('.popup__input_type_link');
const cardListElement = document.querySelector('.elements');
const templateElement = document.querySelector('#elements-template').content.querySelector('.element')
const popupImage = document.querySelector('.popup_type_img');
const popupImageText = document.querySelector('.popup__text');
const popupImagePic = document.querySelector('.popup__image');



function createCard(element) { //Создание карточек
  const cardElement = templateElement.cloneNode(true);
  const cardName = cardElement.querySelector('.element__name');
  const cardImage = cardElement.querySelector('.element__img');
  const cardDelete = cardElement.querySelector('.element__delete');
  const cardLike = cardElement.querySelector('.element__like');

  cardImage.src = element.link;
  cardImage.alt = element.name
  cardName.textContent = element.name;

  cardDelete.addEventListener('click', function() { //Удаление карточек
    cardElement.remove()
  })

  cardLike.addEventListener('click', function() { //Лайк карточек
    cardLike.classList.toggle('element__like_active')
  });

  cardImage.addEventListener('click', function() { //Открытие попапа с карточкой
    popupImagePic.src =  cardImage.src;
    popupImagePic.alt = cardName.textContent
    popupImageText.textContent = cardName.textContent

    handlePopupOpen(popupImage);
  })

  return cardElement;
};

function renderCard(data, container, position = 'prepend') { //Отрисовка карточек
  
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

  addFormElement.reset()
  renderCard(data, cardListElement)
  handlePopupClose(popupAdd)
}

addFormElement.addEventListener('submit', handleSubmitAdd)
