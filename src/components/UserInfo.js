export class UserInfo {
  #profileNameSelector;
  #profileStatusSelector;
  #profileAvatarSelector;

  constructor({profileNameSelector, profileStatusSelector, profileAvatarSelector}) {
    this.#profileNameSelector = document.querySelector(profileNameSelector);
    this.#profileStatusSelector = document.querySelector(profileStatusSelector);
    this.#profileAvatarSelector = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this.#profileNameSelector.textContent,
      status: this.#profileStatusSelector.textContent,
      avatar: this.#profileAvatarSelector.textContent
    }
  };

  setUsetInfo(name, status) {
    this.#profileNameSelector.textContent = name;
    this.#profileStatusSelector.textContent = status;
  };

  setUserAvatar(avatar) {
    this.#profileAvatarSelector.src = avatar
  }
};