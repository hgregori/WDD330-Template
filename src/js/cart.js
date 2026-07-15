import ShoppingCart from './ShoppingCart.mjs';
import { loadHeaderFooter } from './utils.mjs';

const cartElement = document.querySelector('.product-list');
const shoppingCart = new ShoppingCart(cartElement);

shoppingCart.init();
loadHeaderFooter();
