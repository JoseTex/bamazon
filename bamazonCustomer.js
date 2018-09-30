var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
	host: 'localhost',
	port: 8889, //Enter your db port
	user: 'root',
	password: ' ', //Enter your password
	database: 'bamazon'
});

//Establish Connection
connection.connect(function(err){
	if (err) throw err;
    console.log('connected as id: ' + connection.threadId)
   });

//Test db connection and log the output from bamazon
//function afterConnection() {
//    connection.query("SELECT * FROM products", function(err, res) {
//      if (err) throw err;
//      console.log(res);
//      connection.end();
//    });
//  }
bamazonStart();

function bamazonStart() {
    connection.query ("SELECT * FROM products", function(err, res) {
        console.log("\n ");
        console.log("Thank You For Choosing Bamazon!");
        console.log("\n ");
        console.log("--- Please Browse Our Products ---");
        console.log("\n ");
        console.log("|     Item #    | " + " |   Department   | " + " |    Name of Product    | " + " |   Price     |");
        console.log("| ------------- | " + " |--------------- | " + " | --------------------- | " + " | ----------- |");
        for (var i = 0; i < res.length; i++) {  
            //my horrible attempt to create a nice table... should have found a table module but didnt have time.                   
            console.log("         " + res[i].id + "            " + res[i].department_name + "                " + res[i].product_name  + "                " + "$" + res[i].price);
        }   
    });
    bamazonPrompt();
};


function bamazonPrompt() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

    inquirer.prompt([
        {
        name: "chooseProduct",
        list: function() {
            var items = [];
            for (var i = 0; i < res.length; i++) {
                items.push(res[i].id);
            }},
        message: "Please select the item ID number for the product you would like to buy.",
        }, 
        {
        name: "amount",
        message: "How many would you like to buy?",

    }]).then(function(answer) {

        var requestID = answer.chooseProduct.trim();
        var custChoice = res[requestID - 1];
        var itemQuantity = custChoice.stock_quantity;

        console.log("You're purchasing " + requestID + " " + custChoice.product_name + "s");
       
        if (requestID < itemQuantity) {
            var updateQuantity = itemQuantity - requestID;

            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: updateQuantity
            }, 
            {
                id: custChoice.id
            }], function(err) {
                if (err) throw err;
                console.log("Thank you for your purchase!!! We will notify you as soon as we process your transaction.");
                console.log("Your total cost for this transaction: $" + (requestID * custChoice.price));
                connection.end()
            })
        } else {
            console.log("Im sorry. There are currently not enough " + custChoice.product_name + "s left at this time to process your order. Please choose another option." ); 
            setTimeout(bamazonStart, 2500);       
        };
    });
});
}