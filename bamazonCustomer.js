var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "root",
	database: "bamazonDB"
});

connection.connect(function(error){
	if (error) throw error;
	console.log("connected as id " + connection.threadId + "\n");
	show_proucts();
	pick_proucts();

});


function show_proucts(){
	var query = "SELECT item_id,product_name,price,stock_quantity FROM products";
	connection.query(query, function(err, res) {
		 if (err) throw err;

	// Log all results of the SELECT statement
	console.log(res);
	connection.end();
	// for (var i = 0; i < res.length; i++) {
	// 	console.log("Product ID: " + res[i].id + "Product name: " + 
	// 		res[i].product_name + "Price: " + res[i].price);
	// }

	});
}


function pick_proucts() {
	inquirer.prompt({
		name:"options",
		type:"list",
		message:"Which product would you like to buy? Please enter a product ID"
	}).
	then(function(answer) {
		connection.query("SELECT item_id FROM bamazonDB", function(err,res) {
			console.log("you get the item_id");
		});
	});
}