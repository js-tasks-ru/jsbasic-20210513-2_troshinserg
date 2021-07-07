export default class StepSlider {
  constructor({ steps, value}) {
    this.config = arguments[0];
    const isValue = this.config.value !== undefined;

    if (!isValue) {
      this.config.value = 0;
    }

    this.SliderClass = {
      MAIN: 'slider',
      STEPS: 'slider__steps',
      STEP_ACTIVE: 'slider__step-active',
      THUMB: 'slider__thumb',
      PROGRESS: 'slider__progress',
      VALUE: 'slider__value',
      DRAGGING: 'slider_dragging'
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
    this.elem.addEventListener('pointerdown', this.onSliderPointerdown);
    this.thumb.ondragstart = () => false;
  }

  render() {
    let steps = '';
    const progressPercent = (100 / (this.config.steps - 1)) * this.config.value;
    for(let i = 0; i < this.config.steps; i++) {
      steps += i === this.config.value ? `<span class="${this.SliderClass.STEP_ACTIVE}" data-id="${i}"></span>` : `<span data-id="${i}"></span>`;
    }
    this.elem.innerHTML = `
    <div class="slider__thumb" style="left: ${progressPercent}%">
      <span class="slider__value">${this.config.value}</span>
    </div>

    <div class="slider__progress" style="width: ${progressPercent}%"></div>

    <div class="slider__steps">
      ${steps}
    </div>`
  }

  onSliderPointerdown = (evt) => {
    const target = evt.target.closest(`.${this.SliderClass.MAIN}`);
    const elemParams = this.elem.getBoundingClientRect();
    let stepId = this.config.value;

    if (target) {
      let startCoord = evt.clientX;

      const onSliderPointermove = (evtMove) => {
        let shift = startCoord - evtMove.clientX;
        let currentCoord = (this.thumb.offsetLeft + 10) - shift;
        let currentCoordPercent = currentCoord * 100 / elemParams.width;
        startCoord = evtMove.clientX;
        this.elem.classList.add(this.SliderClass.DRAGGING);

        if (currentCoord >= 0 && currentCoord <= elemParams.width) {
          this.thumb.style.left = `${currentCoordPercent}%`;
        }
        setActiveStep(evtMove.clientX);
        this.progress.style.width = `${currentCoordPercent}%`;
      }

      const onSliderPointerup = (evtUp) => {
        this.elem.classList.remove(this.SliderClass.DRAGGING);
        setActiveStep(evtUp.clientX);

        this.thumb.style.left = `${this.percents[stepId]}%`;
        this.progress.style.width = `${this.percents[stepId]}%`;

        const event = new CustomEvent('slider-change', {
          detail: stepId,
          bubbles: true
        });
        this.elem.dispatchEvent(event);

        document.removeEventListener('pointermove', onSliderPointermove);
        document.removeEventListener('pointerup', onSliderPointerup);
      }

      document.addEventListener('pointermove', onSliderPointermove);
      document.addEventListener('pointerup', onSliderPointerup);
    }

    const setActiveStep = (x) => {
      const click = x - elemParams.left;
      const clickPercent = (click * 100) / elemParams.width;
      stepId = this.getStepId(clickPercent);

      this.steps.forEach((it, index) => {
        index === stepId ? it.classList.add(this.SliderClass.STEP_ACTIVE) : it.classList.remove(this.SliderClass.STEP_ACTIVE);
      });

      if (x > elemParams.left && x < elemParams.right) {
        this.value.textContent = stepId;
      } else if (x < elemParams.left) {
        this.value.textContent = 0;
      } else if (x > elemParams.right) {
        this.value.textContent = this.config.steps - 1;
      }
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
