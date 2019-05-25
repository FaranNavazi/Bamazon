var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "Fafa.1372",
    database: "bamazon_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    showAll();
  });

  function showAll() {
      connection.query("SELECT * from products", function(err, res) {
          if (err) throw err;
          console.log(res);
          start();
      })
  };

  function start() {
    inquirer
      .prompt({
        name: "itemId",
        type: "input",
        message: "Please select your desire item ID."
      },
      {
          name: "quantity",
          type: "input",
          message: "How many unit would you like to buy?"
      })
      .then(function(answer) {
        var query = "SELECT stock_quantity FROM products WHERE id ?";
        connection.query(query, { id: answer.id }, function (err, res) {
            if(res >= answer.quantity){
                var shop = answer.quantity -= res;
                connection.query(
                    "UPDATE products SET stock_quantity = ? where id = ?",{
                    id: answer.id,
                    shop
                    },
                    function(err) {
                        if (err) throw err;
                        console.log("Thanks for shopping with us!")
                        reset();
                    }
                );
            }
        });
      });
  };


  function reset() {
    inquirer
    .prompt({
      name: "exitOrStay",
      type: "confirm",
      message: "Would you like to continue shopping?"
    }).then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.exitOrStay === true) {
          start();
        }
        else if(answer.exitOrStay === false) {
          connection.end();
        } else{
          connection.end();
        }
      });
  };