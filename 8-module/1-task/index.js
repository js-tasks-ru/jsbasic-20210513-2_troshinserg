import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    const isVisible = this.elem.offsetWidth && this.elem.offsetHeight;

    if (!isVisible) {
      return;
    }

    const isMobile = document.documentElement.clientWidth <= 767;

    const ElemIndent = {
      LEFT: 20,
      RIGHT: 10
    };

    const scroll = document.documentElement.scrollTop;
    const container = document.body.querySelector('.container');
    const isEnough = container.offsetLeft > ElemIndent.LEFT + ElemIndent.RIGHT + this.elem.offsetWidth;
    const indent = isEnough ? ElemIndent.LEFT : container.offsetLeft - this.elem.offsetWidth - ElemIndent.RIGHT;

    const Position = {
      TOP: 50,
      LEFT: container.getBoundingClientRect().right + indent
    };

    if (scroll > this.elem.offsetTop && !isMobile && isVisible) {
      this.elem.style.position = `fixed`;
      this.elem.style.left = `${Position.LEFT}px`;
      this.elem.style.top = `${Position.TOP}px`;
      this.elem.style.zIndex = `1000`;
    } else {
      this.elem.removeAttribute('style');
    }
  }
}
