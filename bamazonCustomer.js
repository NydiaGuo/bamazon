var mysql = require("mysql");
var inquirer = require("inquirer");
//connect to the MySql
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "root",
	database: "bamazonDB"
});

connection.connect(function(error){
	if (error) throw error;
	show_proucts();
});

//Displays all the proucts to the customer
function show_proucts(){

	var query = "SELECT item_id,product_name,price,stock_quantity FROM products";
	connection.query(query, function(err, res) {
		if (err) throw err;
		
		for (var i = 0; i < res.length; i++) {
		console.log("Product ID: " + res[i].item_id + "\nProduct name: " + 
			res[i].product_name + "\nPrice: " + res[i].price + 
			"\nStocks: " + res[i].stock_quantity +
			"\n-------------------------------");
		}

		pick_proucts();

	});
}

//asks the buyer to place an order
function pick_proucts() {
	inquirer
		.prompt([{
				name:"item_id",
				type:"input",
				message:"Which product would you like to buy? Please enter a product ID:"
			}, 
			{
				name:"quantity",
				type:"input",
				message:"How many would you like to buy?",
			}
		])
		.then(function(answer) {

			var query = "SELECT * FROM products WHERE ?";
			connection.query( query, {item_id: answer.item_id}, function(err, res) {
				if (err) throw err;

				if (answer.quantity <= res[0].stock_quantity) {
					//updates the quantity in MySql for what the buyers just placed if the product is in stock
					var updateQuery = "UPDATE products SET stock_quantity = " +	(res[0].stock_quantity - answer.quantity) + " WHERE item_id = " + answer.item_id;
					connection.query(updateQuery, function(err, data){

						if (err) throw err;
						//shows the customer the total cost of their purchase
						console.log("This product is in stock!");
						console.log("Your oder item ID " + answer.item_id + " with " + answer.quantity + " pcs has already placed it! Your total is $: " + (res[0].price * answer.quantity));	
						
						connection.end();

					});

				} //Displays if there is not enough stock for the pruduct.
				else {
					console.log("sorry! Insufficient quantity! Take a look something else!");
					console.log("===============================================================================");
					show_proucts();
				}

			});

		});

}

