import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    const productIndex = this.cartItems.findIndex(it => {
      return it.product.id === product.id;
    });

    if (productIndex === -1) {
      this.cartItems.push({'product': product, count: 1});
      this.onProductUpdate(this.cartItems[this.cartItems.length - 1]);
    } else {
      this.cartItems[productIndex].count++;
      this.onProductUpdate(this.cartItems[productIndex]);
    }
  }

  updateProductCount(productId, amount) {
    const productIndex = this.cartItems.findIndex(it => {
      return it.product.id === productId;
    });

    const result = this.cartItems[productIndex].count += amount;

    if (result) {
      this.onProductUpdate(this.cartItems[productIndex]);
    } else {
      this.onProductUpdate(this.cartItems[productIndex]);
      this.cartItems.splice(productIndex, 1);
    }
  }

  isEmpty() {
    return this.cartItems.length ? false : true;
  }

  getTotalCount() {
    if (!this.cartItems.length) {
      return 0;
    }
    return this.cartItems.map(it => it.count).reduce((accumulator, current) => accumulator + current);
  }

  getTotalPrice() {
    if (!this.cartItems.length) {
      return 0;
    }
    return this.cartItems.map(it => it.product.price * it.count).reduce((accumulator, current) => accumulator + current);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    const productrWrapper = document.createElement('div');

    this.cartItems.forEach(it => {
      productrWrapper.append(this.renderProduct(it.product, it.count))
    });

    productrWrapper.append(this.renderOrderForm());

    this.modal = new Modal();
    this.modal.setTitle('Your order');
    this.modal.setBody(productrWrapper);
    this.modal.open();


    const onCounterButtonClick = evt => {
      const target = evt.target.closest('.cart-counter__button');

      if (target) {
        const productId = target.closest('.cart-product').dataset.productId;
        const amount = target.classList.contains('cart-counter__button_minus') ? -1 : 1;

        const productIndex = this.cartItems.findIndex(it => {
          return it.product.id === productId;
        });

        this.updateProductCount(productId, amount);
      }
    };

    this.modal.body.addEventListener('click', onCounterButtonClick);
    this.modal.body.querySelector('.cart-form').addEventListener('submit', this.onSubmit);
  }

  onProductUpdate = (cartItem) => {
    if (document.body.classList.contains('is-modal-open')) {
      const productId = cartItem.product.id;
      const modalBody = this.modal.body;
      const productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      const productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      const infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      if (cartItem.count < 1 && this.cartItems.length > 1) {
        modalBody.querySelector(`[data-product-id="${productId}"]`).remove();
      }

      if (cartItem.count < 1 && this.cartItems.length === 1) {
        this.cartItems = [];
        this.modal.close()
      }

      productCount.textContent = cartItem.count;
      productPrice.textContent = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      infoPrice.textContent = `€${this.getTotalPrice().toFixed(2)}`;
    }

    this.cartIcon.update(this);
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const button = form.querySelector('button[type="submit"]');
    const data = new FormData(form);
    button.classList.add('is-loading');

    const promise = fetch('https://httpbin.org/post', {
      method: 'POST',
      body: data
    });

    promise.then(response => {
      if (response.ok) {
        this.cartItems = [];
        this.cartIcon.update(this);
        this.modal.setTitle('Success!');
        this.modal.body.innerHTML = `<div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>`;
      }
    });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

