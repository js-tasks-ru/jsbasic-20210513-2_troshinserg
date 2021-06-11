import createElement from '../../assets/lib/create-element.js';

export default class Carousel {

  constructor(slides) {
    this.slides = slides;
    this.slidesCount = slides.length;
    this.currentShift = 0;
    this.currentSlideIndex = 0;
    this.elem = document.createElement('div');
    this.elem.className = 'carousel';

    if (slides) {
      this.render(slides);

      this.next = this.elem.querySelector('.carousel__arrow_right');
      this.prev = this.elem.querySelector('.carousel__arrow_left');
      this.wrapper = this.elem.querySelector('.carousel__inner');
      this.list = this.wrapper.querySelectorAll('.carousel__slide');

      this.next.addEventListener('click', this.onNavBtnClick);
      this.prev.addEventListener('click', this.onNavBtnClick);
      this.elem.addEventListener('click', this.onAddBtnClick);
      this.changeButtonState(this.currentSlideIndex);
    }
  }


  onNavBtnClick = (evt) => {
    let target = evt.target;
    let isNextBtn = target.closest('.carousel__arrow_right');
    let currentSlide = this.list[this.currentSlideIndex];

    let shift = currentSlide.offsetWidth;

    this.currentShift += isNextBtn ? -shift : shift;

    this.wrapper.style.transform = `translateX(${this.currentShift}px)`;
    this.currentSlideIndex = isNextBtn ? ++this.currentSlideIndex : --this.currentSlideIndex;

    this.changeButtonState(this.currentSlideIndex);
  }

  onAddBtnClick = (evt) => {
    const target = evt.target;

    if (target.closest('.carousel__button')) {
      const slide = target.closest('.carousel__slide');

      const event = new CustomEvent("product-add", {
        bubbles: true,
        detail: slide.dataset.id
      });
      this.elem.dispatchEvent(event);

    }
  }

  changeButtonState = (index) => {
    this.next.style.display = index === this.slidesCount - 1 ? 'none' : '';
    this.prev.style.display = index === 0 ? 'none' : '';
  }

  render(slides) {
    const list = slides.map(it => {
      return `<div class="carousel__slide" data-id="${it.id}">
      <img src="/assets/images/carousel/${it.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${it.price.toFixed(2)}</span>
        <div class="carousel__title">${it.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>`
    }).join('');
    this.elem.innerHTML = `
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    <div class="carousel__inner">
      ${list}
    </div>`;
  }
}
