import MainCard from './MainCard';

class MainPage {
  constructor(state) {
    this.state = state;
    this.cardsDom = this.createContainer();
    this.cards = this.state.map(singleState => {
      const card = new MainCard(singleState);
      this.cardsDom.append(card.createElement());
      return card;
    });
  }

  createContainer() {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  }

  getPage() {
    return this.cardsDom;
  }
}

export default MainPage;
