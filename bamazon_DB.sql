DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  department VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL
);

INSERT INTO products (product_name, department, price, stock_quantity)
VALUES ("portable speaker", "electronics", 19.99, 20);

INSERT INTO products (product_name, department, price, stock_quantity)
VALUES ("jordan air max 3", "shoes", 199.99, 10);

INSERT INTO products (product_name, department, price, stock_quantity)
VALUES ("bose wireless headphone", "electronics", 119.99, 15);

INSERT INTO products (product_name, department, price, stock_quantity)
VALUES ("avea shampoo", "personal care", 7.99, 30);

INSERT INTO products (product_name, department, price, stock_quantity)
VALUES ("toothbrush", "personal care", 12.99, 50);

INSERT INTO products (product_name, department, price, stock_quantity)
VALUES ("sony wired headphone", "electronics", 14.99, 25);

INSERT INTO products (product_name, department, price, stock_quantity)
VALUES ("gaming keyboard", "electronics", 69.69, 5);

INSERT INTO products (product_name, department, price, stock_quantity)
VALUES ("steel pot", "home", 19.99, 20);

INSERT INTO products (product_name, department, price, stock_quantity)
VALUES ("table", "home", 299.99, 7);

INSERT INTO products (product_name, department, price, stock_quantity)
VALUES ("aftershave", "personal care", 19.99, 20);