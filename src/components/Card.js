export class Card {
  #data;
  #likes;
  #templateSelector;
  #handleCardDelete;
  #handleCardClick;
  #handleCardLike;
  #cardElement;
  #cardName;
  #cardImage;
  #cardLike;
  #cardLikeNumber;
  #userId;
  #ownerId;
  #cardDelete;

  constructor({
    data,
    userId,
    ownerId,
    handleCardClick,
    handleCardDelete,
    handleCardLike,
  },
    templateSelector) 
  {
    this.#data = data;
    this.#userId = userId;
    this.#ownerId = data.owner._id
    this.#likes = this.#data.likes
    this.#templateSelector = templateSelector;
    this.#handleCardClick = handleCardClick;
    this.#handleCardLike = handleCardLike;
    this.#handleCardDelete = handleCardDelete;
    this.#cardElement = this.#getTemplate();
    this.#cardName = this.#cardElement.querySelector('.element__name');
    this.#cardDelete = this.#cardElement.querySelector('.element__delete');
    this.#cardImage = this.#cardElement.querySelector('.element__img');
    this.#cardLike = this.#cardElement.querySelector('.element__like');
    this.#cardLikeNumber = this.#cardElement.querySelector('.element__like-number')
  }

  #getTemplate() {
    return document
      .querySelector(this.#templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
  }

  #setEventListeners() {
    this.#cardDelete.addEventListener('click', () => this.#handleCardDelete(this));
    this.#cardLike.addEventListener('click', () => this.#handleCardLike(this));
    this.#cardImage.addEventListener('click', () => this.#handleCardClick(this.#data.name, this.#data.link))
  }

  createCard() {
    this.#cardImage.src = this.#data.link;
    this.#cardImage.alt = this.#data.name
    this.#cardName.textContent = this.#data.name;
    this.#updateLikesView()
    this.#setEventListeners();

    if(!(this.#userId === this.#ownerId)) {
      this.#cardDelete.classList.add('element__delete_state_hidden')
    }else {
      this.#cardDelete.classList.remove('element__delete_state_hidden')
    }

    return this.#cardElement;
  }
  
  #updateLikesView() {
    this.#cardLikeNumber.textContent = this.#likes.length

    if(this.isLiked()) {
      this.#cardLike.classList.add('element__like_active')
    } else {
      this.#cardLike.classList.remove('element__like_active')
    }
  }
    
  isLiked() {
    return this.#likes.some((item) => {
      return item._id === this.#userId
    })
  }

  setLikes(data) {
    this.#likes = data.likes;
    this.#updateLikesView();
  }

  removeCard() {
    this.#cardElement.remove();
    this.#cardElement = null;
  }

  getId() {
    return this.#data._id;
  }
}