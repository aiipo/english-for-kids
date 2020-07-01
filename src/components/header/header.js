class Header {
  constructor(state, { modes, callbacks = {} }) {
    this.state = state;
    this.menuNames = this.state.map(({ name }) => name);
    this.modes = modes;
    this.changeMode = callbacks.changeMode instanceof Function ? callbacks.changeMode : () => {};
    this.changeCard = callbacks.changeCard instanceof Function ? callbacks.changeCard : () => {};
    this.addListeners();
  }

  elements = {
    container: document.createElement('div'),
    menu: document.createElement('ul'),
    hamburger: document.createElement('span'),
    checkbox: document.createElement('input'),
  };

  addListeners() {
    document.addEventListener('click', this.handleClick);
  }

  handleClick = ({ target }) => {
    this.closeMenu(target);
    if (target === this.elements.checkbox) {
      this.elements.checkbox.toggleAttribute('checked');
      const mode = this.elements.checkbox.hasAttribute('checked') ? this.modes.TRAIN : this.modes.PLAY;
      this.changeMode(mode);
    }
    if (target.tagName === 'A') {
      const links = this.elements.menu.querySelectorAll('.nav__link');
      const ind = Array.from(links).findIndex(link => link === target);
      if (ind !== -1) {
        const mode = this.elements.checkbox.hasAttribute('checked') ? this.modes.TRAIN : this.modes.PLAY;
        links.forEach(link => link.classList.remove('nav__link--active'));
        links[ind].classList.add('nav__link--active');
        this.changeCard(ind, mode);
      }
    }
  };

  closeMenu(target) {
    if (target === this.elements.hamburger || target.parentNode === this.elements.hamburger) {
      this.elements.hamburger.classList.toggle('expanded');
      this.elements.menu.classList.toggle('expanded');
    } else if (target !== this.elements.menu) {
      this.elements.hamburger.classList.remove('expanded');
      this.elements.menu.classList.remove('expanded');
    }
  }

  createContainer() {
    this.elements.container.classList.add('header__container');
    this.elements.container.append(this.createNavigation());
    this.elements.container.append(this.createModeSwitch());
    return this.elements.container;
  }

  createNavigation() {
    const nav = document.createElement('nav');
    nav.append(this.createHamburger());
    nav.append(this.createMenu());
    return nav;
  }

  createHamburger() {
    this.elements.hamburger.classList.add('header__hamburger', 'hamburger');

    const line = document.createElement('span');
    line.classList.add('hamburger__line');

    this.elements.hamburger.append(line);
    return this.elements.hamburger;
  }

  createMenu() {
    this.elements.menu.innerHTML = '';
    this.elements.menu.setAttribute('class', 'navigation');
    this.menuNames.unshift('Main Page');
    this.menuNames.forEach(name => {
      const link = document.createElement('a');
      link.classList.add('nav__link');
      link.innerHTML = name;
      this.elements.menu.append(link);
    });
    this.elements.menu.firstChild.className += ' nav__link--active';
    return this.elements.menu;
  }

  createModeSwitch() {
    const container = document.createElement('div');
    container.classList.add('switch__container');

    const switchLabel = document.createElement('label');
    switchLabel.classList.add('switch');

    this.elements.checkbox.setAttribute('type', 'checkbox');
    this.elements.checkbox.classList.add('switch__input');
    this.elements.checkbox.setAttribute('checked', '');
    switchLabel.append(this.elements.checkbox);

    const switchSpan = document.createElement('span');
    switchSpan.classList.add('switch__label');
    switchSpan.setAttribute('data-on', this.modes.TRAIN);
    switchSpan.setAttribute('data-off', this.modes.PLAY);
    switchLabel.append(switchSpan);

    const switchHandle = document.createElement('span');
    switchHandle.classList.add('switch__handle');
    switchLabel.append(switchHandle);

    container.append(switchLabel);
    return container;
  }
}

export default Header;
