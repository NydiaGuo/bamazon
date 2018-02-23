CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(80) NOT NULL,
	department_name VARCHAR(80) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT(100) NULL,
	PRIMARY KEY (item_id)

);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("oranges", "fruits", 0.25, 100), ("sunsreen", "beauty", 8, 100), 
("toners", "beauty", 11.5, 100), ("basktball", "sports", 25.5, 100), 
("hand cream", "beauty", 5.5, 100), ("badminton rackets", "sports", 45.5, 100), 
("black panther", "movies", 25, 500), ("apples", "fruits", 0.35, 100), 
("body loction", "beauty", 0.25, 500), ("dragon fruit", "fruits", 0.45, 100);