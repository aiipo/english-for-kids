const MODES = {
  train: 'train',
  play: 'play',
};

class Card {
  constructor({ word, translation, image, audioSrc }) {
    this.word = word;
    this.translation = translation;
    this.image = image;
    this.audioSrc = audioSrc;
    this.mode = MODES.train;
  }

  createElement() {
    const card = document.createElement('div');
    card.classList.add('card');
    card.append(this.createFront());
    card.append(this.createBack());
    card.append(this.createRotate());
    return card;
  }

  createFront() {
    const front = document.createElement('div');
    front.classList.add('front');
    front.style.backgroundImage = `url(${this.image})`;
    front.innerHTML += `<div class="card-header">${this.word}</div>`;
    return front;
  }

  createBack() {
    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${this.image})`;
    back.innerHTML += `<div class="card-header">${this.translation}</div>`;
    return back;
  }

  createRotate() {
    const rotate = document.createElement('div');
    rotate.classList.add('rotate');
    return rotate;
  }

  changeMode(mode) {
    this.mode = mode;
  }
}

export default Card;
