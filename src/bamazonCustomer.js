var Inventory = require('./Inventory');
var inquirer = require('inquirer');

var isInt = function (val) {
  if (parseInt(val)) {
    return true;
  }
}

var collectOrder = function () {
  Inventory.showInventory()
    .then(() => {
      inquirer.prompt([
        {
          name: 'id',
          message: 'What product would you like to purchase?',
          type: 'input',
          validte: isInt
        },
        {
          name: 'qty',
          message: 'How many would you like?',
          type: 'input',
          validte: isInt
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