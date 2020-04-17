import CardList from './components/Cards/CardList';
import cardsData from './components/cardsData';
import MainPage from './components/MainPage/MainPage';
import Header from './components/Header/Header';

const MODES = {
  TRAIN: 'train',
  PLAY: 'play',
};

let currentCard = null;

const cards = index => {
  currentCard = index === 0
    // eslint-disable-next-line no-use-before-define
    ? new MainPage(cardsData[0], ind => changeCard(ind))
    : new CardList(cardsData[index]);
  return currentCard;
};

let currentMode = MODES.TRAIN;

function changeMode() {
  currentMode = currentMode === MODES.TRAIN ? MODES.PLAY : MODES.TRAIN;
  // eslint-disable-next-line no-use-before-define
  currentCard.changeMode(currentMode);
}

function changeCard(index) {
  const container = document.getElementById('app-container');
  const contentDiv = container.childNodes[1];
  contentDiv.innerHTML = '';
  contentDiv.append(cards(index).getPage());
}

function init() {
  const app = document.getElementById('app');
  if (!app) return;
  const appContainer = document.createElement('div');
  appContainer.setAttribute('id', 'app-container');

  const header = new Header(cardsData[0], {
    modes: MODES,
    callbacks: {
      changeMode: () => changeMode(),
      changeCard: index => changeCard(index),
    },
  });
  appContainer.append(header.createContainer());

  appContainer.append(cards(0).getPage());

  app.append(appContainer);
}

document.addEventListener('DOMContentLoaded', init);
