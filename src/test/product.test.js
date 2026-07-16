import { getParam, normalizeCartItems } from '../js/utils.mjs';
import ShoppingCart from '../js/ShoppingCart.mjs';
// Testing utility helpers that are used in the product page and cart page.
describe('Utility helpers', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('returns a URL parameter value when present', () => {
    window.history.replaceState({}, '', '/product_pages/?product=880RR');

    expect(getParam('product')).toBe('880RR');
  });

  it('normalizes cart storage values into an array', () => {
    expect(normalizeCartItems({ id: '880RR' })).toEqual([{ id: '880RR' }]);
    expect(normalizeCartItems([{ id: '880RR' }])).toEqual([{ id: '880RR' }]);
  });

  it('renders cart items from localStorage through the ShoppingCart class', async () => {
    const item = {
      Id: '880RR',
      Name: 'Ajax Tent',
      Image: '/images/tent.jpg',
      FinalPrice: 199.99,
      Colors: [{ ColorName: 'Pale Pumpkin' }],
    };

    localStorage.setItem('so-cart', JSON.stringify([item]));

    const listElement = document.createElement('ul');
    const cart = new ShoppingCart(listElement);

    await cart.init();

    expect(listElement.innerHTML).toContain('Ajax Tent');
    expect(listElement.innerHTML).toContain('Pale Pumpkin');
  });
});
