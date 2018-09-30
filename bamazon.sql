DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(15) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pillow set", "homegoods", 45, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("socket set", "tools", 130, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("socks", "clothing", 3, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("race tire", "automotive", 600, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tea pot", "kitchen", 20, 330);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("computer desk", "office", 1200, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bed sheet set", "homegoods", 120, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tom brady jersey", "clothing", 600, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("espresso machine", "kitchen", 350, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bluetooth speaker", "media", 99, 400);

SELECT * FROM products