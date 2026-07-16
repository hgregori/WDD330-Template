import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductList from './productList.mjs';
import Alert from './Alert.js';

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();

const alerts = new Alert();
alerts.init();