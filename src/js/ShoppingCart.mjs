import { getLocalStorage, normalizeCartItems, renderListWithTemplate, setLocalStorage } from './utils.mjs';

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <button class="cart-card__remove" data-id="${item.Id}" aria-label="Remove ${item.Name}">X</button>
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors?.[0]?.ColorName || 'Color unavailable'}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

export default class ShoppingCart {
  constructor(listElement) {
    this.listElement = listElement;
  }

  init() {
    const cartItems = normalizeCartItems(getLocalStorage('so-cart'));
    this.renderList(cartItems);
    this.bindRemoveButtons();
  }

  renderList(list) {
    renderListWithTemplate(cartItemTemplate, this.listElement, list, 'afterbegin', true);
  }

  bindRemoveButtons() {
    this.listElement.querySelectorAll('.cart-card__remove').forEach((button) => {
      button.addEventListener('click', () => {
        this.removeFromCart(button.dataset.id);
      });
    });
  }

  removeFromCart(itemId) {
    const cartItems = normalizeCartItems(getLocalStorage('so-cart'));
    const updatedCart = cartItems.filter((item) => item.Id !== itemId);
    setLocalStorage('so-cart', updatedCart);
    this.init();
  }
}
