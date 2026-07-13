import { getParam, normalizeCartItems } from '../js/utils.mjs';

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
});
