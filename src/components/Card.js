export class Card {
  #data;
  #cardElement;
  #elementsTemplate;
  #handleCardClick;
  #cardName;
  #cardImage;
  #cardLike
  
  constructor({ data, elementsTemplate, handleCardClick }) {
  this.#data = data;
  this.#elementsTemplate = elementsTemplate;
  this.#handleCardClick = handleCardClick;
  this.#cardElement = document.querySelector(this.#elementsTemplate).content.querySelector('.element').cloneNode(true);
  this.#cardName = this.#cardElement.querySelector('.element__name');
  this.#cardImage = this.#cardElement.querySelector('.element__img');
  this.#cardLike = this.#cardElement.querySelector('.element__like');
  console.log(this.#cardElement);
  }
  
  #handleCardDelete() { //Удаление карточки
  this.#cardElement.remove()
  }
  
  #handleCardLike() { //Лайк катрочки
  this.#cardLike.classList.toggle('element__like_active');
  }
  
  #setEventListeners() {
  const cardDelete = this.#cardElement.querySelector('.element__delete');
  cardDelete.addEventListener('click', () => this.#handleCardDelete());
  this.#cardLike.addEventListener('click', () => this.#handleCardLike());
  this.#cardImage.addEventListener('click', () => this.#handleCardClick(this.#data.name, this.#data.link))
  }
  
  createCard(){ //Создание карточек
  this.#cardImage.src = this.#data.link;
  this.#cardImage.alt = this.#data.name
  this.#cardName.textContent = this.#data.name;
  this.#setEventListeners();
  return this.#cardElement;
  };
  }
