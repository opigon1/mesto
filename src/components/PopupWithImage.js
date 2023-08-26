import { Popup } from "../components/Popup.js";

export class PopupWithImage extends Popup {
  #popupImagePic;
  #popupImageText;
  #cardName;
  #cardImage;
  #popup;

  constructor(popupSelector) {
    super(popupSelector);
    this.#popup = document.querySelector(popupSelector);
    this.#popupImagePic = this.#popup.querySelector('.popup__image');
    this.#popupImageText = this.#popup.querySelector('.popup__text');
  }

  open(item) {
    super.open()
    this.#popupImagePic.src = item.link;
    this.#popupImagePic.alt = item.name;
    this.#popupImageText.textContent = item.name;
  }
}
