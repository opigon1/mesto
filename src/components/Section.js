export class Section {
  #renderer;
  #container;

  constructor(renderer, containerSelector) {
    this.#renderer = renderer;
    this.#container = document.querySelector(containerSelector);
  }

  appendItem(element) {
    this.#container.append(element);
  }

  prependItem(element) {
    this.#container.prepend(element);
  }

  renderItems(items) {
    items.forEach((item) =>
      this.#renderer(item)
    );
  }
}
