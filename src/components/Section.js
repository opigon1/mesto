export class Section {
  #renderedItems;
  #renderer;
  #container;

  constructor({ data, renderer }, containerSelector) {
    this.#renderedItems = data;
    this.#renderer = renderer;
    this.#container = containerSelector;
  }

  setItem(element) {
    this.#container.prepend(element);
  }

  renderItems() {
    this.#renderedItems.forEach(item => {
      this.#renderer(item);
    });
  }
}
