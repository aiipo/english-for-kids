import CardList from './components/cards/cardList';
import cardsData from './components/cardsData';
import MainPage from './components/mainPage/mainPage';
import Header from './components/header/header';

const MODES = {
  TRAIN: 'train',
  PLAY: 'play',
};

let currentCard = null;

function changeMode(mode) {
  if (mode) {
    currentCard.changeMode(mode);
  }
}

function getNewCard(index, mode) {
  currentCard = index
    ? new CardList(cardsData.mainPage[index - 1].set, () => changeCard(0, MODES.PLAY), MODES)
    : new MainPage(cardsData.mainPage, (ind, m) => changeCard(ind, m), MODES);
  if (mode) {
    changeMode(mode);
  }
  return currentCard;
}

function changeCard(index, mode) {
  const container = document.getElementById('app-container');
  const contentDiv = container.childNodes[1];
  contentDiv.innerHTML = '';
  contentDiv.append(getNewCard(index, mode).getPage());
}

function init() {
  const app = document.getElementById('app');
  if (!app) {
    return;
  }
  const appContainer = document.createElement('div');
  appContainer.setAttribute('id', 'app-container');

  const header = new Header(cardsData.mainPage, {
    modes: MODES,
    callbacks: {
      changeMode: mode => changeMode(mode),
      changeCard: (index, mode) => changeCard(index, mode),
    },
  });
  appContainer.append(header.createContainer());

  appContainer.append(getNewCard(0).getPage());

  app.append(appContainer);
}

document.addEventListener('DOMContentLoaded', init);
