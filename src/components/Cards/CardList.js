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

  createContainer() {
    const container = document.createElement('div');
    container.classList.add('card-container');
    container.append(this.createRating());
    return container;
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
