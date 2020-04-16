class MainCard {
  constructor({ name, image }) {
    this.name = name;
    this.image = image;
  }

  elements = {
    card: document.createElement('a'),
  };

  createElement() {
    this.elements.card.classList.add('main-card', 'green');
    this.elements.card.innerHTML = `<img src="${this.image}" alt="${this.name}">`;
    this.elements.card.innerHTML += this.name;
    return this.elements.card;
  }

  changeMode(mode) {
    this.mode = mode;
    this.elements.card.classList.toggle('green');
  }
}

export default MainCard;
