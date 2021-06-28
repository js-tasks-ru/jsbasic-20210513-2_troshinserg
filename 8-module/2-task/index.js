import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = document.createElement('div');
    this.elem.className = 'products-grid';
    this.elem.innerHTML = `<div class="products-grid__inner"></div>`;
    this.wrapper = this.elem.querySelector('.products-grid__inner');

    this.render(this.products);
  }

  render(products) {
    //console.log(products);
    products.forEach(it => {
      this.wrapper.append(new ProductCard(it).elem);
    });
  }

  updateFilter = (filters) => {
    Object.assign(this.filters, filters);

    let filteredProducts = this.products.filter(it => {
      return (this.filters.category ? it.category === this.filters.category : it) && ( this.filters.maxSpiciness ? it.spiciness <= this.filters.maxSpiciness : it ) && ( this.filters.noNuts ? this.filters.noNuts === !it.nuts : it ) && ( this.filters.vegeterianOnly ? it.vegeterian === true : it)
    });

    this.wrapper.innerHTML = '';
    this.render(filteredProducts);
  }
}
