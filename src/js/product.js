import {
  getLocalStorage,
  normalizeCartItems,
  setLocalStorage,
} from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

export function addProductToCart(product) {
  const storedItems = getLocalStorage("so-cart");
  const cartItems = normalizeCartItems(storedItems);
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
const addToCartButton = document.getElementById("addToCart");

if (addToCartButton) {
  addToCartButton.addEventListener("click", addToCartHandler);
}