export class Card {
  #data;
  #likes;
  #todoElement;
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
    return this.#todoElement;
  }

  createCard() {
    this.#cardImage.src = this.#data.link;
    this.#cardImage.alt = this.#data.name
    this.#cardName.textContent = this.#data.name;
    this.#likeUpdate()
    this.#setEventListeners();
    this.setLike(this.#data)

    if(!(this.#userId === this.#ownerId)) {
      this.#cardDelete.classList.add('element__delete_state_hidden')
    }else {
      this.#cardDelete.classList.remove('element__delete_state_hidden')
    }

    return this.#cardElement;
    
  }
  
  #likeUpdate() {
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

  setLike(data) {
    this.#likes = data.likes;
    this.#likeUpdate();
  }

  removeCard() {
    this.#cardElement.remove();
    this.#cardElement = null;
  }

  getId() {
    return this.#data._id;
  }

  getData() {
    const { name, _id, link } = this.#data;
    return { name, _id, link };
  }

  

}





















// import { Api } from "../components/Api.js"

// export class Card {
//   #data;
//   #cardElement;
//   #elementsTemplate;
//   #handleCardClick;
//   #cardName;
//   #cardImage;
//   #cardLike
  
//   constructor({ data, elementsTemplate, handleCardClick }) {
//   this.#data = data;
//   this.name = data.name;
//   this.link = data.link
//   this.#elementsTemplate = elementsTemplate;
//   this.#handleCardClick = handleCardClick;
//   this.#cardElement = document.querySelector(this.#elementsTemplate).content.querySelector('.element').cloneNode(true);
//   this.#cardName = this.#cardElement.querySelector('.element__name');
//   this.#cardImage = this.#cardElement.querySelector('.element__img');
//   this.#cardLike = this.#cardElement.querySelector('.element__like');
//   }
  
//   getId() {
//     return this.#data._id
//   }

//   getData() {
//     const { name, _id, link } = this.#data;
//     return { name, _id, link }
//   }

//   remove() {
//     this.#cardElement.remove();
//     this.#cardElement = null;
//   }

//   #handleCardDelete() { //Удаление карточки
//   this.#cardElement.remove(this)
//   }
  
//   #handleCardLike() { //Лайк катрочки
//   this.#cardLike.classList.toggle('element__like_active');
//   }
  
//   #setEventListeners() {
//   const cardDelete = this.#cardElement.querySelector('.element__delete');
//   cardDelete.addEventListener('click', () => this.#handleCardDelete());
//   this.#cardLike.addEventListener('click', () => this.#handleCardLike());
//   this.#cardImage.addEventListener('click', () => this.#handleCardClick(this.name, this.link))
//   }
  
//   createCard(){ //Создание карточек
//   this.#cardImage.src = this.link;
//   this.#cardImage.alt = this.name
//   this.#cardName.textContent = this.name;
//   this.#setEventListeners();
//   return this.#cardElement;
//   };
// }
