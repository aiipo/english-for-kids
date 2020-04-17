import Card from './Card';

class CardList {
  constructor(state, mode) {
    this.state = state;
    this.wordsList = this.createContainer();
    this.cards = this.state.map(singleState => {
      const card = new Card(singleState, mode);
      this.wordsList.append(card.createElement());
      return card;
    });
    this.elements.container.append(this.createButtons());
    this.addListeners();
  }

  elements = {
    container: document.createElement('div'),
  };

  game = {
    startGameBtn: document.createElement('button'),
    rating: document.createElement('div'),
    errors: 0,
    isGame: false,
    words: null,
    currentWord: null,
    currentWordAudio: document.createElement('audio'),
    soundEffects: document.createElement('audio'),
  };

  addListeners() {
    this.elements.container.addEventListener('click', this.handleClick);
  }

  handleClick = ({ target }) => {
    this.rotateCard(target);
    this.playAudio(target);
    this.startGame(target);
  };

  findCard(DOMCard) {
    return this.cards.find(cardObj => cardObj.elements.card === DOMCard);
  }

  rotateCard(target) {
    if (!target.classList.contains('rotate') || this.game.isGame) return;
    const cards = this.wordsList.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++) {
      const parent = target.closest('.card');
      if (parent === cards[i]) {
        parent.classList.add('translate');
        const handleMouseLeave = function () {
          setTimeout(() => {
            this.classList.remove('translate');
            parent.removeEventListener('mouseleave', handleMouseLeave);
          }, 200);
        };
        parent.addEventListener('mouseleave', handleMouseLeave);
        break;
      }
    }
  }

  playAudio(target) {
    const parent = target.closest('.card');
    if (target.classList.contains('rotate')) return;
    if (parent && parent.classList.contains('translate')) return;
    const card = this.findCard(parent);
    if (card) {
      card.playAudio();
    }
  }

  requestPlayAudio(url) {
    if (url) {
      const audio = new Audio(url);
      audio.play().then();
    }
  }

  startGame(target) {
    if (this.game.isGame) { // playing
      const parent = target.closest('.card');
      if (parent && parent.contains(target)) {
        if (this.findCard(parent) === this.game.currentWord) {
          if (!target.classList.contains('inactive')) {
            this.requestPlayAudio('/src/assets/audio/correct.mp3');
            this.fillRating(true);
          }
          target.classList.add('inactive');
          if (this.game.words && this.game.words.length) {
            this.nextWord();
          } else { // End game
          }
        } else if (!target.classList.contains('inactive')) {
          this.requestPlayAudio('/src/assets/audio/error.mp3');
          this.fillRating(false);
        }
      }
    }
    if (target === this.game.startGameBtn) {
      if (!(this.game.startGameBtn.classList.contains('repeat'))) { // init game
        this.game.isGame = true;
        this.game.startGameBtn.classList.add('repeat');
        this.game.rating.classList.remove('none');
        this.game.words = this.getCardsForGame();
        this.nextWord();
      } else { // repeat an audio
        this.game.currentWordAudio.play().then();
      }
    }
  }

  fillRating(isSuccess = false) {
    const star = document.createElement('div');
    this.game.rating.append(star);
    if (isSuccess) {
      star.classList.add('star-success');
    } else {
      star.classList.add('star-error');
      this.game.errors += 1;
    }
  }

  nextWord() {
    if (this.game.words && this.game.words.length) {
      this.game.currentWord = this.game.words.pop();
      this.game.currentWordAudio.src = this.game.currentWord.audioSrc;
      this.game.currentWordAudio.play().then();
    }
  }

  getCardsForGame() {
    return this.shuffleArray([...this.cards]);
  }

  shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // eslint-disable-next-line no-param-reassign
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  createContainer() {
    this.elements.container.classList.add('card-container');
    this.elements.container.append(this.createRating());
    return this.elements.container;
  }

  createRating() {
    this.game.rating.classList.add('rating', 'none');
    return this.game.rating;
  }

  createButtons() {
    const buttons = document.createElement('div');
    buttons.classList.add('buttons');

    this.game.startGameBtn.classList.add('start-game', 'none');
    this.game.startGameBtn.innerHTML = 'Start game';

    buttons.append(this.game.startGameBtn);
    return buttons;
  }

  getWords() {
    return this.wordsList;
  }

  changeMode(mode) {
    this.game.startGameBtn.classList.toggle('none');
    this.cards.forEach(card => card.changeMode(mode));
  }
}

export default CardList;
