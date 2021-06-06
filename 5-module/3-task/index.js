function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const nextBtn = carousel.querySelector('.carousel__arrow_right');
  const prevBtn = carousel.querySelector('.carousel__arrow_left');
  const wrapper = carousel.querySelector('.carousel__inner');
  const slides = carousel.querySelectorAll('.carousel__slide');
  const slidesCount = slides.length;

  let currentShift = 0;
  let currentSlideIndex = 0;

  changeButtonState(currentSlideIndex);

  nextBtn.onclick = onNavBtnClick;
  prevBtn.onclick = onNavBtnClick;

  function onNavBtnClick(evt) {
    let isNextBtn = this.classList.contains('carousel__arrow_right');
    let shift = slides[currentSlideIndex].offsetWidth;

    currentShift += isNextBtn ? -shift : shift;

    wrapper.style.transform = `translateX(${currentShift}px)`;
    currentSlideIndex = isNextBtn ? ++currentSlideIndex : --currentSlideIndex;

    changeButtonState(currentSlideIndex);
  }

  function changeButtonState(index) {
    nextBtn.style.display = index === slidesCount - 1 ? 'none' : '';
    prevBtn.style.display = index === 0 ? 'none' : '';
  }

}
