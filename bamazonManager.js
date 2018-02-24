var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "root",
	database: "bamazonDB"
});

//connect to the MySql
connection.connect(function(error){
	if (error) throw error;
	managerInput();
});

//prompts all the options what the manager can do
function managerInput(){
	inquirer
		.prompt({
			name:"action",
			type:"list",
			message:"What do you like to do?",
			choices:["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
		})
		.then(function(answer){

			switch(answer.action) {

				case "View Products for Sale":
				viewProucts();
				break;

				case "View Low Inventory":
				viewLowInventory();
				break;

				case "Add to Inventory":
				addInventory();
				break;

				case "Add New Product":
				addNewProduct();

			}
	});

}

//lists every available items for sales
function viewProucts(){

		var query = "SELECT item_id,product_name,price,stock_quantity FROM products";
		connection.query(query, function(err, res) {
			if (err) throw err;
			
			for (var i = 0; i < res.length; i++) {
			console.log("Product ID: " + res[i].item_id + "\nProduct name: " + 
				res[i].product_name + "\nPrice: " + res[i].price + 
				"\nStocks: " + res[i].stock_quantity +
				"\n-------------------------------");
			}
			managerInput();

		});
}

//it lists all items with an inventory count lower than fifty.
function viewLowInventory() {

		var query = "SELECT item_id,product_name,stock_quantity FROM products";
		connection.query(query, function(err, res) {
			if (err) throw err;

			for (var i = 0; i < res.length; i++) {

				if (res[i].stock_quantity <= 50) {
					console.log("Low Inventory Products: " + res[i].stock_quantity + 
						"\nItem ID: " + res[i].item_id + "\nProducts Name: " + res[i].product_name +
						"\n-------------------------------");
				}
			}
			managerInput();
		});
	
}


// * If a manager selects `Add to Inventory`, your app should display a prompt that 
 //will let the manager "add more" of any item currently in the store.
 function addInventory(){
	inquirer
		.prompt([{
			name:"id",
			type:"input",
			message:"What is the ID of the item would you like to add to?"
		},{
			name:"addStock",
			type:"input",
			message:"How many would you like to add?"
		}])
		.then(function(answer){

			var query = "UPDATE products SET ? WHERE ?" 
			connection.query(query, [{
						item_id:answer.id
					},
					{
						stock_quantity:answer.addStock
					}
				], 
				function(err, res) {
				if (err) throw err;
				console.log(res);

			// var updateQuery = "UPDATE products SET stock_quantity = " +	
			// (res[0].stock_quantity + answer.quantity) + 
			// " WHERE item_id = " + answer.item_id;
			
				console.log("Successfully added!");
				managerInput();
			});
			
		});
 }

// It allows the manager to add a completely new product to the store.
function addNewProduct() {
	inquirer
		.prompt([{
			name:"productName",
			type:"input",
			message:"What new product would you like to add?"
		},{
			name:"department",
			type:"input",
			message:"What department would you like to put?"
		},{
			name:"price",
			type:"input",
			message:"What is the price for the new product?"
		},{
			name:"quantity",
			type:"input",
			message:"How many you want to add?"
		}])
		.then(function(answer){
			var query = "INSERT INTO products SET ?";
			connection.query(query, {

				product_name:answer.productName,
				department_name:answer.department,
				price:answer.price,
				stock_quantity:answer.quantity

			}, function(err, res) {
				if (err) throw err;
				viewLowInventory();
				console.log("You successfully added" + res.stock_quantity + res.product_name + "!");

			});
			 connection.end();
		});
 
}
