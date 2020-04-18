import MainCard from './MainCard';

class MainPage {
  constructor(state, callback, modes) {
    this.state = state;
    this.cardsDom = this.createContainer();
    this.cards = this.state.map(singleState => {
      const card = new MainCard(singleState, modes);
      this.cardsDom.append(card.createElement());
      return card;
    });
    this.changeCard = callback instanceof Function ? callback : () => {};
    this.cardsDom.addEventListener('click', this.handleClick);
  }

  handleClick = ({ target }) => {
    const parent = target.parentNode.classList.contains('main-card') ? target.parentNode : false;
    if (target.classList.contains('main-card') || parent) {
      const links = this.cardsDom.querySelectorAll('.main-card');
      const ind = Array.prototype.findIndex.call(links, card => card === target || card === parent);
      if (ind !== -1) {
        this.changeCard(ind + 1, this.cards[0].mode);
      }
    }
  };

  createContainer() {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  }

  changeMode(mode) {
    this.cards.forEach(card => card.changeMode(mode));
  }

  getPage() {
    return this.cardsDom;
  }
}

export default MainPage;
