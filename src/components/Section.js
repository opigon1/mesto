export class Section {
  #renderer;
  #container;

  constructor(renderer, containerSelector) {
    this.#renderer = renderer;
    this.#container = document.querySelector(containerSelector);
  }

  addItem(element, position = 'prepend') {
    switch (position) {
      case 'append':
        this.#container.append(element);
        break;
      case 'prepend':
        this.#container.prepend(element);
        break;
    
      default: this.#container.prepend(element);
        break;
    }
    
  }

  renderItems(items) {
    items.forEach((item) =>
      this.#renderer(item)
    );
  }
}
