import Card from './Card';

class CardList {
  constructor(state) {
    this.state = state;
    this.wordsList = this.createContainer();
    this.cards = this.state.map(singleState => {
      const card = new Card(singleState);
      this.wordsList.append(card.createElement());
      return card;
    });
  }

  elements = {
    container: document.createElement('div'),
  };

  addListeners() {
    this.elements.container.addEventListener('click', this.handleClick);
  }

  handleClick = ({ target }) => {
    if (!(target.getAttribute('class') === 'rotate')) return;
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
  };

  createContainer() {
    this.elements.container.classList.add('card-container');
    this.elements.container.append(this.createRating());
    this.addListeners();
    return this.elements.container;
  }

  createRating() {
    const rating = document.createElement('div');
    rating.classList.add('rating', 'none');
    return rating;
  }

  getWords() {
    return this.wordsList;
  }

  changeMode(mode) {
    this.cards.forEach(card => card.changeMode(mode));
  }
}

export default CardList;
