export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

