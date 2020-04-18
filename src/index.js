import CardList from './components/Cards/CardList';
import cardsData from './components/cardsData';
import MainPage from './components/MainPage/MainPage';
import Header from './components/Header/Header';

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
  currentCard = index === 0
    // eslint-disable-next-line no-use-before-define
    ? new MainPage(cardsData[0], (ind, m) => changeCard(ind, m), MODES)
    // eslint-disable-next-line no-use-before-define
    : new CardList(cardsData[index], () => changeCard(0, MODES.PLAY), MODES);
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
  if (!app) return;
  const appContainer = document.createElement('div');
  appContainer.setAttribute('id', 'app-container');

  const header = new Header(cardsData[0], {
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
