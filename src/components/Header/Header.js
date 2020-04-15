class Header {
  constructor(modes) {
    this.modes = modes;
  }

  elements = {
    container: document.createElement('div'),
    hamburger: document.createElement('span'),
    checkbox: document.createElement('input'),
  };

  addListeners() {
    this.elements.container.addEventListener('click', this.handleClick);
  }

  handleClick = ({ target }) => {
    if (target.contains(this.elements.hamburger)) {
      this.elements.hamburger.classList.toggle('expanded');
    }
    if (target.contains(this.elements.checkbox)) {
      this.elements.checkbox.toggleAttribute('checked');
    }
  };

  createContainer() {
    this.elements.container.classList.add('header__container');
    this.elements.container.append(this.createNavigation());
    this.elements.container.append(this.createModeSwitch());
    this.addListeners();
    return this.elements.container;
  }

  createNavigation() {
    const nav = document.createElement('nav');
    nav.append(this.createHamburger());
    return nav;
  }

  createHamburger() {
    this.elements.hamburger.classList.add('header__hamburger', 'hamburger');

    const line = document.createElement('span');
    line.classList.add('hamburger__line');

    this.elements.hamburger.append(line);
    return this.elements.hamburger;
  }

  createModeSwitch() {
    const container = document.createElement('div');
    container.classList.add('switch-container');

    const switchLabel = document.createElement('label');
    switchLabel.classList.add('switch');

    this.elements.checkbox.setAttribute('type', 'checkbox');
    this.elements.checkbox.classList.add('switch-input');
    switchLabel.append(this.elements.checkbox);

    const switchSpan = document.createElement('span');
    switchSpan.classList.add('switch-label');
    switchSpan.setAttribute('data-on', this.modes.TRAIN);
    switchSpan.setAttribute('data-off', this.modes.PLAY);
    switchLabel.append(switchSpan);

    const switchHandle = document.createElement('span');
    switchHandle.classList.add('switch-handle');
    switchLabel.append(switchHandle);

    container.append(switchLabel);
    return container;
  }
}

export default Header;
