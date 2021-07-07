import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({steps: 5, value: 3});
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);

    this.render();
    this.addEventListeners();
  }

  async render() {
    document.querySelector('[data-carousel-holder]').append(this.carousel.elem);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);

    this.data = await fetch('products.json').then(response => response.json());
    const productsGrid = document.querySelector('[data-products-grid-holder]');
    productsGrid.innerHTML = '';

    this.productsGrid = new ProductsGrid(this.data);
    productsGrid.append(this.productsGrid.elem);
    const currentCategory = this.ribbonMenu.elem.querySelector('.ribbon__item_active');

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.config.value,
      category: currentCategory ? currentCategory.dataset.id : ''
    });
  }

  addEventListeners = () => {
    const onProductAdd = (evt) => {
      const product = this.data.find(it => {
        return it.id === evt.detail
      });
      this.cart.addProduct(product);
    };

    const onStepSliderChange = (evt) => {
      this.productsGrid.updateFilter({
        maxSpiciness: evt.detail
      });
    };

    const onRibbonCategorySelect = (evt) => {
      this.productsGrid.updateFilter({
        category: evt.detail
      });
    };

    const onFiltersCheckboxChange = (evt) => {
      const target = evt.target;

      if (target.closest('#nuts-checkbox')) {
        this.productsGrid.updateFilter({
          noNuts: target.checked
        });
      }

      if (target.closest('#vegeterian-checkbox')) {
        this.productsGrid.updateFilter({
          vegeterianOnly: target.checked
        });
      }
    }

    const handlers = [
      {
        elem: document.body,
        event: 'product-add',
        handler: onProductAdd
      },
      {
        elem: this.stepSlider.elem,
        event: 'slider-change',
        handler: onStepSliderChange
      },
      {
        elem: this.ribbonMenu.elem,
        event: 'ribbon-select',
        handler: onRibbonCategorySelect
      },
      {
        elem: document.body,
        event: 'change',
        handler: onFiltersCheckboxChange
      }
    ];

    handlers.forEach(it => {
      it.elem.addEventListener(it.event, it.handler);
    });
  }
}
