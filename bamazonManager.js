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
  start();
});

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "HEY BOSS, What can I do for you?",
      choices: [
        "Show Products for Sale",
        "Show Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "Show Products for Sale":
          showAll();
          break;

        case "Show Low Inventory":
          lowAll();
          break;

        case "Add to Inventory":
          addInventory();
          break;

        case "Add New Product":
          addProduct();
          break;

        case "exit":
          connection.end();
          break;
      }
    });
}

function showAll() {
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
}

function lowAll() {
  var query =
    "SELECT * FROM products WHERE stock_quantity = 5 or stock_quantity < 5";
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
}

function addInventory() {
  inquirer
    .prompt([
      {
        name: "itemId",
        type: "input",
        message: "Please enter your desire item ID to add inventory."
      },
      {
        name: "quantity",
        type: "input",
        message: "How many unit would you like to add?"
      }
    ])
    .then(function(answer) {
      var query = "SELECT stock_quantity FROM products WHERE ?";
      connection.query(query, { id: answer.itemId }, function(err, res) {
        var update = res[0].stock_quantity + parseInt(answer.quantity);

        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: update
            },
            {
              id: answer.itemId
            }
          ],
          function(error, res) {
            if (error) throw err;
            if (res) {
                console.log("*********YOUR INVENTORY HAS BEEN UPDATED!*********");
              start();
            }
          }
        );
      });
    });
};

function addProduct() {
    inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Your item Name: "
      },
      {
        name: "department",
        type: "input",
        message: "Your item Deparment: "
      },
      {
        name: "price",
        type: "input",
        message: "Your item Price: "
      },
      {
        name: "quantity",
        type: "input",
        message: "Your item Quantity: "
      }
    ])
    .then(function(answer) {
        var query = "INSERT INTO products (product_name, department, price, stock_quantity) VALUES (?)";
        var values = [answer.name, answer.department, answer.price, answer.quantity];
        connection.query(query, [values], function(err, res) {
          if (err) throw err;
          
          console.log("**********Your inventory has been updated with 1 NEW product!*********");
          start();
        });

    });
};