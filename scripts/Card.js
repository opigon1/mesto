export class Card {
  #data;
  #cardElement;
  #elementsTemplate;
  #openPopupImg;

  constructor({data, openPopupImg}, elementsTemplate) {
    this.#data = data;
    this.#elementsTemplate = elementsTemplate;
    this.#openPopupImg = openPopupImg;
    
  }

  #getTemplate() {
    return document.querySelector(this.#elementsTemplate).
           content.querySelector('.element').cloneNode(true); 
  }

  #handleCardDelete(cardElement) { //Удаление карточки
    cardElement.remove()
  }
  
  #handleCardLike(cardLike) { //Лайк катрочки
    cardLike.classList.toggle('element__like_active');
  }

  #setEventListeners() {
    this.#cardElement = this.#getTemplate();
    const cardName = this.#cardElement.querySelector('.element__name');
    const cardImage = this.#cardElement.querySelector('.element__img');
    const cardDelete = this.#cardElement.querySelector('.element__delete');
    const cardLike = this.#cardElement.querySelector('.element__like');
    const popupImagePic = document.querySelector('.popup__image');
    const popupImageText = document.querySelector('.popup__text');

    cardImage.src = this.#data.link;
    cardImage.alt = this.#data.name
    cardName.textContent = this.#data.name;

    cardDelete.addEventListener('click', () => this.#handleCardDelete(this.#cardElement));
    cardLike.addEventListener('click', () => this.#handleCardLike(cardLike));
  
    cardImage.addEventListener('click', () => {
      this.#openPopupImg(popupImagePic, cardImage, popupImageText, cardName)
    });
  }
  
  createCard(){ //Создание карточек
    this.#setEventListeners();
    return this.#cardElement;
  };
}

