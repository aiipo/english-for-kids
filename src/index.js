import CardList from './components/Cards/CardList';
import cardsData from './components/cardsData';
import MainPage from './components/MainPage/MainPage';
import Header from './components/Header/Header';

const MODES = {
  TRAIN: 'train',
  PLAY: 'play',
};

function init() {
  const app = document.getElementById('app');
  if (!app) return;
  const appContainer = document.createElement('div');
  appContainer.setAttribute('id', 'app-container');

  const header = new Header(cardsData[0], MODES);
  appContainer.append(header.createContainer());

  const mainPage = new CardList(cardsData[1]);
  appContainer.append(mainPage.getWords());

  app.append(appContainer);
}

document.addEventListener('DOMContentLoaded', init);
