export class UserInfo {
  #profileName;
  #profileStatus;

  constructor({profileName, profileStatus}) {
    this.#profileName = document.querySelector(profileName);
    this.#profileStatus = document.querySelector(profileStatus);
    console.log( this.#profileName);
  }

  getUserInfo() {
    return {
      name: this.#profileName.textContent,
      status: this.#profileStatus.textContent
    }
  };

  setUsetInfo({profileName, profileStatus}) {
    this.#profileName.textContent = profileName;
    this.#profileStatus.textContent = profileStatus;
  };
};