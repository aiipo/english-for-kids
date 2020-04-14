import CardList from './components/Cards/CardList';
import cardsData from './components/cardsData';
import MainPage from './components/MainPage/MainPage';

function init() {
  const app = document.getElementById('app');
  if (!app) return;
  const appContainer = document.createElement('div');
  appContainer.setAttribute('id', 'app-container');


  app.append(appContainer);
}

document.addEventListener('DOMContentLoaded', init);
