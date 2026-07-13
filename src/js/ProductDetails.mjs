import { normalizeCartItems, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    if (!this.product) {
      return;
    }

    this.renderProductDetails();

    const addToCartButton = document.getElementById('addToCart');

    if (addToCartButton) {
      addToCartButton.addEventListener('click', this.addToCart.bind(this));
    }
  }

  addToCart() {
    const cartItems = normalizeCartItems(JSON.parse(localStorage.getItem('so-cart')));
    cartItems.push(this.product);
    setLocalStorage('so-cart', cartItems);
  }

  renderProductDetails() {
    const productBrand = document.getElementById('productBrand');
    const productName = document.getElementById('productName');
    const productImage = document.getElementById('productImage');
    const productPrice = document.getElementById('productPrice');
    const productColor = document.getElementById('productColor');
    const productDescription = document.getElementById('productDescription');
    const addToCartButton = document.getElementById('addToCart');

    if (productBrand) {
      productBrand.textContent = this.product.Brand?.Name || 'Unknown Brand';
    }

    if (productName) {
      productName.textContent = this.product.Name || 'Product Name';
    }

    if (productImage) {
      productImage.src = this.product.Image;
      productImage.alt = this.product.Name || 'Product image';
    }

    if (productPrice) {
      productPrice.textContent = `$${this.product.FinalPrice}`;
    }

    if (productColor) {
      productColor.textContent = this.product.Colors?.[0]?.ColorName || 'Color unavailable';
    }

    if (productDescription) {
      productDescription.innerHTML = this.product.DescriptionHtmlSimple || '';
    }

    if (addToCartButton) {
      addToCartButton.dataset.id = this.product.Id;
    }
  }
}
