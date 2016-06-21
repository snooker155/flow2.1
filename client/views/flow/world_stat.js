Template.world_stat.helpers({
	time_period: function () {
		var game = Games.findOne({});
		return game.time_period;
	},

	players_number: function(){
		var game = Games.findOne({});
		return game.getPlayersNumber();
	},

	products:function(){
    	var game = Games.findOne({});
    	var products = [];
        var free_share = 0;
        var inactive_share = 0;
    	game.products.forEach(function (product) {
            if(product.product_status != "In production"){
                var product_share = 0;
                var total_product_customers = 0;
                game.customers.forEach(function (customer) {
                    if(customer.customer_product && customer.customer_product.product_id == product.product_id && customer.customer_activity == 1){
                        total_product_customers++;
                    }
                });
                product_share = Math.floor(total_product_customers / game.customers.length * 100);
                products.push({
                    product_name: product.product_name,
                    product_color: product.product_color,
                    product_share: product_share,
                });
            }
        });

        game.customers.forEach(function (customer) {
            if(customer.customer_activity != 1){
                inactive_share++;
            }

            if(customer.customer_activity == 1 && !customer.customer_product){
                free_share++;
            }
        });

        products.push({
            product_name: "Free",
            product_color: "lightblue",
            product_share: Math.floor(free_share / game.customers.length * 100),
        });

        products.push({
            product_name: "Inactive",
            product_color: "red",
            product_share: Math.floor(inactive_share / game.customers.length * 100),
        });
    	return products;
    },
});