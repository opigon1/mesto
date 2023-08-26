import { Popup } from "../components/Popup.js";

export class PopupWithImage extends Popup {
  #popupImagePic;
  #popupImageText;

  constructor(popupSelector) {
    super(popupSelector);
    this.#popupImagePic = this._popup.querySelector('.popup__image');
    this.#popupImageText = this._popup.querySelector('.popup__text');
  }

  open(item) {
    super.open()
    this.#popupImagePic.src = item.link;
    this.#popupImagePic.alt = item.name;
    this.#popupImageText.textContent = item.name;
  }
}
