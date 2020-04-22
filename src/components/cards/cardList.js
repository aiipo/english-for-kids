import Card from './card';

class CardList {
  constructor(state, callback, modes) {
    this.state = state;
    this.wordsList = this.createContainer();
    this.modes = modes;
    this.cards = this.state.map(singleState => {
      const card = new Card(singleState, modes);
      this.wordsList.append(card.createElement());
      return card;
    });
    this.elements.container.append(this.createButtons());
    this.goToMain = callback instanceof Function ? callback : () => {};
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
    const parent = target.closest('.card');
    cards.forEach(card => {
      if (parent === card) {
        card.classList.add('translate');
        const handleMouseLeave = function () {
          setTimeout(() => {
            card.classList.remove('translate');
            card.removeEventListener('mouseleave', handleMouseLeave);
          }, 200);
        };
        card.addEventListener('mouseleave', handleMouseLeave);
      }
    });
  }

  playAudio(target) {
    const parent = target.closest('.card');
    if (target.classList.contains('rotate')
        || (parent && parent.classList.contains('translate'))) {
      return;
    }
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

  initGame() {
    this.game.isGame = true;
    this.game.startGameBtn.classList.add('repeat');
    this.game.rating.classList.remove('none');
    this.game.words = this.getCardsForGame();
    this.nextWord();
  }

  startPlayingGame(target) {
    const parent = target.closest('.card');
    if (parent && parent.contains(target)) {
      if (this.findCard(parent) === this.game.currentWord) {
        if (!target.classList.contains('card--cover-inactive')) {
          this.requestPlayAudio('/src/assets/audio/correct.mp3');
          this.fillRating(true);
        }
        target.classList.add('card--cover-inactive');
        if (this.game.words && this.game.words.length) {
          this.nextWord();
        } else {
          this.showEndGame();
          setTimeout(() => this.goToMain(), 2500);
        }
      } else if (!target.classList.contains('card--cover-inactive')) {
        this.requestPlayAudio('/src/assets/audio/error.mp3');
        this.fillRating(false);
      }
    }
  }

  startGame(target) {
    if (this.game.isGame) {
      this.startPlayingGame(target);
    }
    if (target === this.game.startGameBtn) {
      if (!this.game.startGameBtn.classList.contains('repeat')) {
        this.initGame();
      } else {
        this.game.currentWordAudio.play().then();
      }
    }
  }

  showEndGame() {
    this.game.rating.style.justifyContent = 'center';
    const container = document.createElement('div');
    container.classList.add('result');
    this.elements.container.append(container);
    const result = document.createElement('div');
    container.append(result);
    if (this.game.errors) {
      this.game.rating.innerHTML = `${this.game.errors} error${this.game.errors !== 1 ? 's' : ''}`;
      this.requestPlayAudio('/src/assets/audio/failure.mp3');
      result.classList.add('result--failure');
    } else {
      this.game.rating.innerHTML = 'Win!';
      this.requestPlayAudio('/src/assets/audio/success.mp3');
      result.classList.add('result--success');
    }
  }

  fillRating(isSuccess) {
    const star = document.createElement('div');
    this.game.rating.append(star);
    if (isSuccess) {
      star.classList.add('star--success');
    } else {
      star.classList.add('star--error');
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
    return this.getShuffledArray(this.cards);
  }

  getShuffledArray(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  createContainer() {
    this.elements.container.classList.add('card__container');
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

  getPage() {
    return this.wordsList;
  }

  changeMode(mode) {
    if (mode === this.modes.PLAY) {
      this.game.startGameBtn.classList.remove('none');
    } else {
      this.game.isGame = false;
      this.game.startGameBtn.classList.remove('repeat');
      this.game.rating.classList.add('none');
      this.game.rating.innerHTML = '';
      this.game.errors = 0;
      const inactive = this.wordsList.querySelectorAll('.card--cover-inactive');
      if (inactive) {
        inactive.forEach(el => el.classList.remove('card--cover-inactive'));
      }
      this.game.startGameBtn.classList.add('none');
    }
    this.cards.forEach(card => card.changeMode(mode));
  }
}

export default CardList;
