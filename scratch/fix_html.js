const fs = require('fs');
const files = [
  'src/index.html',
  'src/cart/index.html',
  'src/product_pages/index.html',
  'src/checkout/index.html'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Match the header start and anything until the first closing header tag
  content = content.replace(/<header class="divider" id="main-header"><\/header>[\s\S]*?<\/header>/, '<header class="divider" id="main-header"></header>');
  fs.writeFileSync(file, content);
  console.log('Fixed ' + file);
});
