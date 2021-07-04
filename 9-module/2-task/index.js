import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

//**************************** */
const data = [
  {
    "name": "Laab kai chicken salad",
    "price": 10,
    "category": "salads",
    "image": "laab_kai_chicken_salad.png",
    "id": "laab-kai-chicken-salad",
    "nuts": true,
    "vegeterian": false,
    "spiciness": 2
  },
  {
    "name": "Som tam papaya salad",
    "price": 9.5,
    "category": "salads",
    "image": "som_tam_papaya_salad.png",
    "id": "som-tam-papaya-salad",
    "nuts": false,
    "vegeterian": true,
    "spiciness": 0
  },
  {
    "name": "Tom yam kai",
    "price": 7,
    "category": "soups",
    "image": "tom_yam.png",
    "id": "tom-yam-kai",
    "nuts": false,
    "vegeterian": false,
    "spiciness": 3
  },
  {
    "name": "Tom kha kai",
    "price": 7,
    "category": "soups",
    "image": "tom_kha.png",
    "id": "tom-kha-kai",
    "nuts": false,
    "vegeterian": false,
    "spiciness": 3
  },
  {
    "name": "Tom kha koong",
    "price": 8,
    "category": "soups",
    "image": "tom_kha.png",
    "id": "tom-kha-koong",
    "nuts": false,
    "vegeterian": false,
    "spiciness": 2
  },
  {
    "name": "Tom yam koong",
    "price": 8,
    "category": "soups",
    "image": "tom_yam.png",
    "id": "tom-yam-koong",
    "nuts": false,
    "vegeterian": false,
    "spiciness": 4
  },
  {
    "name": "Tom yam vegetarian",
    "price": 7,
    "category": "soups",
    "image": "tom_yam.png",
    "id": "tom-yam-vegetarian",
    "nuts": false,
    "vegeterian": true,
    "spiciness": 1
  },
  {
    "name": "Tom kha vegetarian",
    "price": 7,
    "category": "soups",
    "image": "tom_kha.png",
    "id": "tom-kha-vegetarian",
    "nuts": false,
    "vegeterian": true,
    "spiciness": 1
  },
  {
    "name": "Sweet 'n sour chicken",
    "price": 14,
    "category": "chicken-dishes",
    "image": "sweet_n_sour.png",
    "id": "sweet-n-sour-chicken",
    "nuts": true,
    "vegeterian": false,
    "spiciness": 2
  },
  {
    "name": "Chicken cashew",
    "price": 14,
    "category": "chicken-dishes",
    "image": "chicken_cashew.png",
    "id": "chicken-cashew",
    "nuts": true,
    "vegeterian": false,
    "spiciness": 1
  },
  {
    "name": "Kai see ew",
    "price": 14,
    "category": "chicken-dishes",
    "image": "kai_see_ew.png",
    "id": "kai-see-ew",
    "nuts": false,
    "vegeterian": false,
    "spiciness": 4
  },
  {
    "name": "Beef massaman",
    "price": 14.5,
    "category": "beef-dishes",
    "image": "beef_massaman.png",
    "id": "beef-massaman",
    "nuts": false,
    "vegeterian": false,
    "spiciness": 2
  },
  {
    "name": "Seafood chu chee",
    "price": 16,
    "category": "seafood-dishes",
    "image": "chu_chee.png",
    "id": "seafood-chu-chee",
    "nuts": false,
    "vegeterian": false,
    "spiciness": 2
  },
  {
    "name": "Penang shrimp",
    "price": 16,
    "category": "seafood-dishes",
    "image": "red_curry.png",
    "id": "penang-shrimp",
    "nuts": true,
    "vegeterian": false,
    "spiciness": 4
  },
  {
    "name": "Green curry veggies",
    "price": 12.5,
    "category": "vegetable-dishes",
    "image": "green_curry.png",
    "id": "green-curry-veggies",
    "nuts": true,
    "vegeterian": true,
    "spiciness": 0
  },
  {
    "name": "Tofu cashew",
    "price": 12.5,
    "category": "vegetable-dishes",
    "image": "tofu_cashew.png",
    "id": "tofu-cashew",
    "nuts": true,
    "vegeterian": true,
    "spiciness": 0
  },
  {
    "name": "Red curry veggies",
    "price": 12.5,
    "category": "vegetable-dishes",
    "image": "red_curry_vega.png",
    "id": "red-curry-veggies",
    "nuts": false,
    "vegeterian": true,
    "spiciness": 4
  },
  {
    "name": "Krapau tofu",
    "price": 12.5,
    "category": "vegetable-dishes",
    "image": "krapau_vega.png",
    "id": "krapau-tofu",
    "nuts": false,
    "vegeterian": true,
    "spiciness": 0
  },
  {
    "name": "Prawn crackers",
    "price": 2.5,
    "category": "bits-and-bites",
    "image": "kroepoek.png",
    "id": "prawn-crackers",
    "nuts": false,
    "vegeterian": false,
    "spiciness": 1
  },
  {
    "name": "Fish cakes",
    "price": 6.5,
    "category": "bits-and-bites",
    "image": "fish_cakes.png",
    "id": "fish-cakes",
    "nuts": false,
    "vegeterian": false,
    "spiciness": 1
  },
  {
    "name": "Chicken satay",
    "price": 6.5,
    "category": "bits-and-bites",
    "image": "sate.png",
    "id": "chicken-satay",
    "nuts": false,
    "vegeterian": false,
    "spiciness": 1
  },
  {
    "name": "Satay sauce",
    "price": 1.5,
    "category": "bits-and-bites",
    "image": "satesaus.png",
    "id": "satay-sauce",
    "nuts": false,
    "vegeterian": false,
    "spiciness": 2
  },
  {
    "name": "Shrimp springrolls",
    "price": 6.5,
    "category": "bits-and-bites",
    "image": "koong_hom_pha.png",
    "id": "shrimp-springrolls",
    "nuts": false,
    "vegeterian": false,
    "spiciness": 3
  },
  {
    "name": "Mini vegetarian spring rolls",
    "price": 6.5,
    "category": "bits-and-bites",
    "image": "mini_vega_springrolls.png",
    "id": "mini-vegetarian-spring-rolls",
    "nuts": false,
    "vegeterian": false,
    "spiciness": 2
  },
  {
    "name": "Chicken springrolls",
    "price": 6.5,
    "category": "bits-and-bites",
    "image": "chicken_loempias.png",
    "id": "chicken-springrolls",
    "nuts": false,
    "vegeterian": false,
    "spiciness": 2
  },
  {
    "name": "Thai fried rice",
    "price": 7.5,
    "category": "on-the-side",
    "image": "fried_rice.png",
    "id": "thai-fried-rice",
    "nuts": false,
    "vegeterian": false,
    "spiciness": 2
  },
  {
    "name": "Prik nam pla",
    "price": 0.5,
    "category": "on-the-side",
    "image": "prik_nam_pla.png",
    "id": "prik-nam-pla",
    "nuts": false,
    "vegeterian": false,
    "spiciness": 4
  },
  {
    "name": "Fresh prawn crackers",
    "price": 2.5,
    "category": "on-the-side",
    "image": "kroepoek.png",
    "id": "fresh-prawn-crackers",
    "nuts": false,
    "vegeterian": false,
    "spiciness": 1
  },
  {
    "name": "Stir fried vegetables",
    "price": 7.5,
    "category": "on-the-side",
    "image": "stir_fried_vegetables.png",
    "id": "stir-fried-vegetables",
    "nuts": false,
    "vegeterian": true,
    "spiciness": 0
  },
  {
    "name": "White rice",
    "price": 1.5,
    "category": "on-the-side",
    "image": "witte_rijst.png",
    "id": "white-rice",
    "nuts": false,
    "vegeterian": true,
    "spiciness": 0
  },
  {
    "name": "Fried noodles Thai style",
    "price": 7.5,
    "category": "on-the-side",
    "image": "fried_noodles.png",
    "id": "fried-noodles-thai-style",
    "nuts": false,
    "vegeterian": true,
    "spiciness": 2
  },
  {
    "name": "King salad",
    "price": 7.5,
    "category": "on-the-side",
    "image": "king_salad.png",
    "id": "king-salad",
    "nuts": false,
    "vegeterian": true,
    "spiciness": 2
  },
  {
    "name": "Satésaus",
    "price": 1.5,
    "category": "on-the-side",
    "image": "satesaus.png",
    "id": "sat-saus",
    "nuts": false,
    "vegeterian": true,
    "spiciness": 2
  }
]

export default class Main {

  constructor() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({steps: 5, value: 3});
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);
    this.data = this.fetchData();

    this.render();
  }

  async render() {
    document.querySelector('[data-carousel-holder]').append(this.carousel.elem);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);


  }

  fetchData = async () => {
    return fetch({
      url: 'products.json'
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Ошибка HTTP: " + response.status);
      }
    });
  }
}
