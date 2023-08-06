export class UserInfo {
  #profileName;
  #profileStatus;

  constructor({profileName, profileStatus}) {
    this.#profileName = profileName;
    this.#profileStatus = profileStatus;
  }

  getUserInfo() {
    const userInfo = {
      name: this.#profileName.textContent,
      status: this.#profileStatus.textContent
    }
    return userInfo
  };

  setUsetInfo({profileName, profileStatus}) {
    this.#profileName.textContent = profileName;
    this.#profileStatus.textContent = profileStatus;
  };
};