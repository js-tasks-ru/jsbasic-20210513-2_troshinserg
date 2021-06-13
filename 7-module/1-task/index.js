import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this._scrollStep = 350;
    this.elem = document.createElement('div');
    this.elem.className = 'ribbon';
    this.render(categories);

    this.RibbonClass = {
      WRAPPER: 'ribbon__inner',
      ARROW_MAIN: 'ribbon__arrow',
      ARROW_VISIBLE: 'ribbon__arrow_visible',
      ARROW_LEFT: 'ribbon__arrow_left',
      ARROW_RIGHT: 'ribbon__arrow_right',
      ITEM: 'ribbon__item',
      ITEM_ACTIVE: 'ribbon__item_active'
    };

    this.wrapper = this.elem.querySelector(`.${this.RibbonClass.WRAPPER}`);
    this.prevBtn = this.elem.querySelector(`.${this.RibbonClass.ARROW_LEFT}`);
    this.nextBtn = this.elem.querySelector(`.${this.RibbonClass.ARROW_RIGHT}`);
    this.links = this.elem.querySelectorAll(`.${this.RibbonClass.ITEM}`);

    //Почему this.scrollMax равен 0?
    //this.maxScroll = this.wrapper.scrollWidth - this.wrapper.clientWidth;

    this.elem.addEventListener('click', this.onNavBtnClick);
    this.elem.addEventListener('click', this.onCategoryLinkClick);
    this.wrapper.addEventListener('scroll', this.changeBtnState);

    this.changeBtnState()
  }

  render(categories) {
    const list = categories.map(it => {
      return `<a href="#" class="ribbon__item" data-id="${it.id}">${it.name}</a>`;
    }).join('');

    this.elem.innerHTML = `
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <nav class="ribbon__inner">
      ${list}
    </nav>
    <button class="ribbon__arrow ribbon__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>`;
  }

  onNavBtnClick = (evt) => {
    const target = evt.target;
    const btn = target.closest(`.${this.RibbonClass.ARROW_MAIN}`);

    if (btn) {
      let isRight = btn.classList.contains(this.RibbonClass.ARROW_RIGHT);

      let step = isRight ? this._scrollStep : -this._scrollStep;
      this.wrapper.scrollBy(step, 0);
    }
  }

  onCategoryLinkClick = (evt) => {
    const target = evt.target;
    const link = target.closest(`.${this.RibbonClass.ITEM}`);

    if (link) {
      evt.preventDefault();
      const categoryId = link.dataset.id;

      this.links.forEach(it => {
        it.classList.remove(this.RibbonClass.ITEM_ACTIVE);
      });

      link.classList.add(this.RibbonClass.ITEM_ACTIVE);

      const event = new CustomEvent('ribbon-select', {
        detail: categoryId,
        bubbles: true
      });
      this.elem.dispatchEvent(event);
    }
  }

  changeBtnState = () => {
    let maxScroll = this.wrapper.scrollWidth - this.wrapper.clientWidth;
    let isStart = this.wrapper.scrollLeft === 0;
    let isEnd = this.wrapper.scrollLeft === maxScroll;
    let isBetween = this.wrapper.scrollLeft !== 0 && this.wrapper.scrollLeft !== maxScroll;

    if (isStart) {
      this.prevBtn.classList.remove(this.RibbonClass.ARROW_VISIBLE);
      this.nextBtn.classList.add(this.RibbonClass.ARROW_VISIBLE);
    } else if (isEnd) {
      this.nextBtn.classList.remove(this.RibbonClass.ARROW_VISIBLE)
      this.prevBtn.classList.add(this.RibbonClass.ARROW_VISIBLE);
    } else if (isBetween) {
      this.prevBtn.classList.add(this.RibbonClass.ARROW_VISIBLE);
      this.nextBtn.classList.add(this.RibbonClass.ARROW_VISIBLE);
    }
  }
}
