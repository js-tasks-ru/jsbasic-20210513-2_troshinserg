export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.config = arguments[0];

    if (!(value in this.config)) {
      this.config.value = 0;
    }

    this.SliderClass = {
      MAIN: 'slider',
      STEPS: 'slider__steps',
      STEP_ACTIVE: 'slider__step-active',
      THUMB: 'slider__thumb',
      PROGRESS: 'slider__progress',
      VALUE: 'slider__value'
    };

    this.percents = this.setStepsPercents();


    this.elem = document.createElement('div');
    this.elem.className = this.SliderClass.MAIN;

    this.render();

    this.stepsWrapper = this.elem.querySelector(`.${this.SliderClass.STEPS}`);
    this.progress = this.elem.querySelector(`.${this.SliderClass.PROGRESS}`);
    this.thumb = this.elem.querySelector(`.${this.SliderClass.THUMB}`);
    this.value = this.elem.querySelector(`.${this.SliderClass.VALUE}`);
    this.steps = this.stepsWrapper.querySelectorAll('span');
    this.elem.addEventListener('click', this.onSliderClick);
  }

  render() {
    let steps = '';
    const progressPercent = (100 / this.config.steps - 1) * this.config.value;
    for(let i = 0; i < this.config.steps; i++) {
      steps += i === this.config.value ? `<span class="${this.SliderClass.STEP_ACTIVE}" data-id="${i}"></span>` : `<span data-id="${i}"></span>`;
    }
    this.elem.innerHTML = `
    <div class="slider__thumb">
      <span class="slider__value">${this.config.value}</span>
    </div>

    <div class="slider__progress" style="width: ${progressPercent}%"></div>

    <div class="slider__steps">
      ${steps}
    </div>`
  }

  onSliderClick = (evt) => {
    const target = evt.target.closest(`.${this.SliderClass.MAIN}`);

    if (target) {
      const elemParams = this.elem.getBoundingClientRect();
      const click = evt.clientX - elemParams.left;
      const clickPercent = (click * 100) / elemParams.width;
      const stepId = this.getStepId(clickPercent);

      this.steps.forEach((it, index) => {
        index === stepId ? it.classList.add(this.SliderClass.STEP_ACTIVE) : it.classList.remove(this.SliderClass.STEP_ACTIVE);
      });

      this.thumb.style.left = `${this.percents[stepId]}%`;
      this.progress.style.width = `${this.percents[stepId]}%`;
      this.value.textContent = stepId;

      const event = new CustomEvent('slider-change', {
        detail: stepId,
        bubbles: true
      });
      this.elem.dispatchEvent(event);
    }
  }

  setStepsPercents = () => {
    const percents = [];
    for(let i = 0; i < this.config.steps; i++) {
      percents.push(100 / (this.config.steps - 1) * i);
    }
    return percents;
  }

  getStepId = (clickPercent) => {
    const stepId = this.percents.findIndex(it => {
      return it > clickPercent;
    });

    const segmentHalfWidth = (this.percents[stepId] - this.percents[stepId - 1]) / 2;
    return (clickPercent > this.percents[stepId] - segmentHalfWidth) ? stepId : stepId - 1;
  }
}
