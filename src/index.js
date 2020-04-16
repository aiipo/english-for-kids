import CardList from './components/Cards/CardList';
import cardsData from './components/cardsData';
import MainPage from './components/MainPage/MainPage';
import Header from './components/Header/Header';

const MODES = {
  TRAIN: 'train',
  PLAY: 'play',
};

let currentMode = MODES.TRAIN;

function init() {
  const app = document.getElementById('app');
  if (!app) return;
  const appContainer = document.createElement('div');
  appContainer.setAttribute('id', 'app-container');

  function changeMode() {
    currentMode = currentMode === MODES.TRAIN ? MODES.PLAY : MODES.TRAIN;
    // eslint-disable-next-line no-use-before-define
    cards.changeMode(currentMode);
  }

  const header = new Header(cardsData[0], {
    modes: MODES,
    callbacks: {
      changeMode: () => changeMode(),
    },
  });
  appContainer.append(header.createContainer());

  const cards = new CardList(cardsData[1], currentMode);
  appContainer.append(cards.getWords());

  app.append(appContainer);
}

document.addEventListener('DOMContentLoaded', init);
