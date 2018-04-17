const MySqlDatabase = require('./mySqlDatabase');
const Table = require('cli-table');

const database = 'bamazon';

showInventory = async function(){
  const db = new MySqlDatabase(database);

  const inventoryQuery = `
    select p.productId, p.productName, p.price
    from product p
    order by p.productId
  `;

  const inventory = await db.query(inventoryQuery);
  db.close();

  let table = new Table({
    head: ['\x1b[33mID', '\x1b[33mProduct Name', '\x1b[33mPrice'],
    colWidths:[4, 45, 15]
  });

  let rows = inventory.rows.map( (x) => {
    return [
      x.productId,
      x.productName,
      '$' + ' '.repeat(12 - x.price.toFixed(2).toString().length) + x.price.toFixed(2)
    ];
  });

  rows.forEach(row => {
    table.push(row);
  });
  console.log(table.toString());

  return
}

getProduct = async function(productId){
  const db = new MySqlDatabase(database);


  productQuery = `
    select p.productId, p.productName, p.price, p.stock
    from product p
    where p.productId = ?
  `;


  let product = await db.query(productQuery, [productId]);
  db.close();

  return {
    id: product.rows[0].productId,
    name: product.rows[0].productName,
    price: product.rows[0].price,
    stock: product.rows[0].stock
  }

}

reduceStock = async function(productId, quantity){
  const db = new MySqlDatabase(database);

  reduceQuery = `
    update product
    set stock = stock - ?
    where productId = ?
  `;

  db.query(reduceQuery, [quantity, productId]);
  db.close();
}


module.exports = {
  showInventory: showInventory,
  getProduct: getProduct,
  reduceStock: reduceStock
}