import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.ModalClass = {
      MAIN: 'modal',
      OPENED: 'is-modal-open',
      CLOSE_BTN: 'modal__close',
      TITLE: 'modal__title',
      BODY: 'modal__body'
    };

    this.elem = document.createElement('div');
    this.elem.className = 'modal';
    this.render();

    this.body = this.elem.querySelector(`.${this.ModalClass.BODY}`);
    this.title = this.elem.querySelector(`.${this.ModalClass.TITLE}`);
    this.closeBtn = this.elem.querySelector(`.${this.ModalClass.CLOSE_BTN}`);
  }

  render() {
    this.elem.innerHTML = `<div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
          ${'Вот сюда нужно добавлять заголовок'}
        </h3>
      </div>

      <div class="modal__body">
        ${'A сюда нужно добавлять содержимое тела модального окна'}
      </div>
    </div>`
  }

  open = () => {
    document.body.classList.add(this.ModalClass.OPENED);
    document.body.append(this.elem);

    this.closeBtn.addEventListener('click', this.onCloseBtnClick);
    document.addEventListener('keydown', this.onKeydown);
  }

  close = () => {
    document.body.classList.remove(this.ModalClass.OPENED);
    document.querySelector(`.${this.ModalClass.MAIN}`).remove();
  }

  setTitle = (title) => {
    this.title.textContent = title;
  }

  setBody = (node) => {
    this.body.innerHTML = '';
    this.body.append(node);
  }

  onCloseBtnClick = () => {
    this.close();
    document.removeEventListener('keydown', this.onKeydown);
  }

  onKeydown = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
      document.removeEventListener('keydown', this.onKeydown);
    }
  }
}
