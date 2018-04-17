var Inventory = require('./Inventory');
var inquirer = require('inquirer');

var isInt = function (val) {
  return (parseInt(val)) ? true : false;
}

var collectOrder = function () {
  Inventory.showInventory()
    .then(() => {
      inquirer.prompt([
        {
          name: 'id',
          message: 'What product would you like to purchase?',
          type: 'input',
          validate: isInt
        },
        {
          name: 'qty',
          message: 'How many would you like?',
          type: 'input',
          validate: isInt
        }
      ])
        .then((answers) => {
          Inventory.getProduct(answers.id)
          .then( product => {
            if ( product.stock < answers.qty){
              return console.log('Insufficient Quantity Bruh!!');
            }
            Inventory.reduceStock(answers.id, answers.qty)
            .then( () => {
              const total = parseInt(answers.qty) * product.price;
              console.log(`Total Cost: \$${total.toFixed(2)}`);
            })
          })
        })
    })
}


collectOrder();
