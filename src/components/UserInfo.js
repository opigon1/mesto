export class UserInfo {
  #profileName;
  #profileStatus;
  #profileAvatar;

  constructor({profileNameSelector, profileStatusSelector, profileAvatarSelector}) {
    this.#profileName = document.querySelector(profileNameSelector);
    this.#profileStatus = document.querySelector(profileStatusSelector);
    this.#profileAvatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this.#profileName.textContent,
      status: this.#profileStatus.textContent,
      avatar: this.#profileAvatar.textContent
    }
  };

  setUsetInfo(name, status) {
    this.#profileName.textContent = name;
    this.#profileStatus.textContent = status;
  };

  setUserAvatar(avatar) {
    this.#profileAvatar.src = avatar
  }
};