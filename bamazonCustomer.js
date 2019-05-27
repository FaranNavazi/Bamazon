var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("You are connected as id " + connection.threadId);
  showProducts();
});

var showProducts = function() {
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    if (err) throw err;
    var showTable = new Table({
      head: ["ID", "Product Name", "Department", "Price", "Unit"],
      colWidths: [10, 25, 25, 10, 10]
    });
    for (var i = 0; i < res.length; i++) {
      showTable.push([
        res[i].id,
        res[i].product_name,
        res[i].department,
        res[i].price,
        res[i].stock_quantity
      ]);
    }
    console.log(showTable.toString());
    start();
  });
};

function start() {
  inquirer
    .prompt([
      {
        name: "itemId",
        type: "input",
        message: "Please enter your desire item ID number."
      },
      {
        name: "quantity",
        type: "input",
        message: "How many unit would you like to buy?"
      }
    ])
    .then(function(answer) {
      var query = "SELECT stock_quantity FROM products WHERE ?";
      connection.query(query, { id: answer.itemId }, function(err, res) {
        console.log(res);
        var unitIn = res[0].stock_quantity;
        var unitBuy = parseInt(answer.quantity);
        if (unitIn >= unitBuy) {
          console.log("Thanks for shopping with us!");
          var newStock = unitIn - unitBuy;

          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: newStock
              },
              {
                id: answer.itemId
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Your order has been placed successfully!");
              start();
            }
          );
        } else {
          console.log("We currently do not have that many unit in stock!");
          start();
        }
      });
    });
}
