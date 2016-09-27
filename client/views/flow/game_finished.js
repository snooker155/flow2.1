Template.game_finished.helpers({
	companies: function () {
		var game = Games.findOne({});
		var companies = [];
		for (var company in game.companies){
			companies.push(game.companies[company]);
		}
		return companies;
	},

	products: function () {
		var game = Games.findOne({});
		return game.products;
	},

	company_balance(){
		var self = this;
		return parseFloat(self.company_balance.toFixed(2));
	},

	company_product(){
		var game = Games.findOne({});
		var self = this;
		var target_product = null;
		game.products.forEach(function (product) {
			if(product.product_creator == self.company_name){
				target_product = product;
			}
		});
		return target_product.product_name;
	},

	product_price(){
		var self = this;
		return parseFloat(self.product_price.toFixed(2));
	},

	product_users(){
		var self = this;
		var game = Games.findOne({});
		var total_product_customers = 0;
		game.customers.forEach(function (customer) {
			if(customer.customer_product && customer.customer_product.product_id == self.product_id && customer.customer_activity == 1){
				total_product_customers++;
			}
		});
		return total_product_customers;
	},

	product_share(){
		var self = this;
		var game = Games.findOne({});
		return self.getShare(game);
	},
});