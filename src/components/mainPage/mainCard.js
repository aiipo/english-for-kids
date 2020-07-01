class MainCard {
  constructor({ name, image }, modes) {
    this.name = name;
    this.image = image;
    this.modes = modes;
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
    if (mode === this.modes.PLAY) {
      this.elements.card.classList.remove('green');
    } else {
      this.elements.card.classList.add('green');
    }
  }
}

export default MainCard;
