import { Popup } from "../components/Popup.js";

export class PopupWithImage extends Popup {
  #popupImagePic;
  #popupImageText;
  #cardName;
  #cardImage;

  constructor(popupSelector) {
    super(popupSelector);
    this.#popupImagePic = this.popupSelector.querySelector('.popup__image');
    this.#popupImageText = this.popupSelector.querySelector('.popup__text');
  }

  open(item) {
    super.open()
    this.#popupImagePic.src = item.link;
    this.#popupImagePic.alt = item.name;
    this.#popupImageText.textContent = item.name;
  }
}
