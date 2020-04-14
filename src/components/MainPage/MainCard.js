class MainCard {
  constructor({ name, image }) {
    this.name = name;
    this.image = image;
  }

  createElement() {
    const card = document.createElement('a');
    card.classList.add('main-card');
    card.innerHTML = `<img src="${this.image}" alt="${this.name}">`;
    card.innerHTML += this.name;
    return card;
  }

  changeMode(mode) {
    this.mode = mode;
  }
}

export default MainCard;
