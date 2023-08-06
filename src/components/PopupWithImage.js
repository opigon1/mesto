import { Popup } from "../components/Popup.js";

export class PopupWithImage extends Popup {
  #popupImagePic;
  #popupImageText;
  #cardName;
  #cardImage;

  constructor(popupSelector) {
    super(popupSelector);
    this.#popupImagePic = document.querySelector('.popup__image');
    this.#popupImageText = document.querySelector('.popup__text');
  }

  open(item) {
    super.open()
    this.#popupImagePic.src = item.link;
    this.#popupImagePic.alt = item.name;
    this.#popupImageText.textContent = item.name;
  }
}