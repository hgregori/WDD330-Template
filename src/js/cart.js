import {
  getLocalStorage,
  normalizeCartItems,
  setLocalStorage,
} from './utils.mjs';

function removeFromCart(itemId) {
  const cartItems = normalizeCartItems(getLocalStorage('so-cart'));
  const updatedCart = cartItems.filter((item) => item.Id !== itemId);
  setLocalStorage('so-cart', updatedCart);
  renderCartContents();
}

function renderCartContents() {
  const cartItems = normalizeCartItems(getLocalStorage('so-cart'));
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  const productList = document.querySelector('.product-list');

  if (productList) {
    productList.innerHTML = htmlItems.join('');

    productList.querySelectorAll('.cart-card__remove').forEach((button) => {
      button.addEventListener('click', () => {
        removeFromCart(button.dataset.id);
      });
    });
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <button class="cart-card__remove" data-id="${item.Id}" aria-label="Remove ${item.Name}">X</button>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors?.[0]?.ColorName || 'Color unavailable'}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
