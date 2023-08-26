export class UserInfo {
  #profileName;
  #profileStatus;
  #profileAvatar;

  constructor({profileName, profileStatus, profileAvatar}) {
    this.#profileName = document.querySelector(profileName);
    this.#profileStatus = document.querySelector(profileStatus);
    this.#profileAvatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    return {
      name: this.#profileName.textContent,
      status: this.#profileStatus.textContent
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