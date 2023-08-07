export class Section {
  #renderedItems;
  #renderer;
  #container;

  constructor({ data, renderer }, containerSelector) {
    this.#renderedItems = data;
    this.#renderer = renderer;
    this.#container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this.#container.prepend(element);
  }

  renderItems() {
    this.#renderedItems.forEach(item => {
      this.#renderer(item);
    });
  }
}
