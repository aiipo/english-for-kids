class Card {
  constructor({ word, translation, image, audioSrc }, modes) {
    this.word = word;
    this.translation = translation;
    this.image = image;
    this.audioSrc = audioSrc;
    this.modes = modes;
    this.mode = this.modes.TRAIN;
  }

  elements = {
    card: document.createElement('div'),
  };

  createElement() {
    this.elements.card.classList.add('card');
    this.elements.card.append(this.createFront());
    this.elements.card.append(this.createBack());
    this.elements.card.append(this.createRotate());
    return this.elements.card;
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

  playAudio() {
    const audio = new Audio(this.audioSrc);
    if (this.mode !== this.modes.PLAY) {
      audio.play().then();
    }
  }

  getCard() {
    return this.elements.card;
  }

  changeMode(mode) {
    this.mode = mode;
    if (this.mode === this.modes.PLAY) {
      this.elements.card.classList.add('card-cover');
      const words = this.elements.card.querySelectorAll('.card-header');
      words.forEach(card => card.classList.add('none'));
      const rotate = this.elements.card.querySelector('.rotate');
      rotate.classList.add('none');
    } else {
      this.elements.card.classList.remove('card-cover');
      const words = this.elements.card.querySelectorAll('.card-header');
      words.forEach(card => card.classList.remove('none'));
      const rotate = this.elements.card.querySelector('.rotate');
      rotate.classList.remove('none');
    }
  }
}

export default Card;
