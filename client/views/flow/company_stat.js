Template.company_stat.helpers({
	has_company(){
		var game = Games.findOne({});
		return game.companies[Meteor.user().username];
	},

	company_name: function () {
		var game = Games.findOne({});
		return game.companies[Meteor.user().username].company_name;
	},

	company_balance: function () {
		var game = Games.findOne({});
		return parseFloat(game.companies[Meteor.user().username].company_balance.toFixed(2));
	},

	// company_level: function () {
	// 	var game = Games.findOne({});
	// 	return game.companies[Meteor.user().username].company_level;
	// },

	// company_exp: function(){
	// 	var game = Games.findOne({});
	// 	return game.companies[Meteor.user().username].company_exp;
	// },

	production(){
		var game = Games.findOne({});
		var company = game.companies[Meteor.user().username];
		var production = [];
		game.products.forEach(function (product) {
			if(product.product_creator == company.company_name){
				if(product.product_status == "In production"){
					production.push(product);
				}
			}
		});

		return production;
	},

	product_production_progress(){
		var game = Games.findOne({});
		var self = this;
		var total_time_to_achieve = 0;
		var total_start_period = 0;
		self.prop.forEach(function (property) {
			total_time_to_achieve += property.time_to_achieve;
			if(total_start_period < property.start_period){
				total_start_period = property.start_period;
			}
		});
		// console.log(total_time_to_achieve);
		// console.log(total_start_period);
		// console.log(Math.round((game.time_period - total_start_period) / (total_time_to_achieve / 3) * 100));
		if(Math.round((game.time_period - total_start_period) / (total_time_to_achieve / 3) * 100) >= 100){
			return 100;
		}else{
			return Math.round((game.time_period - total_start_period) / (total_time_to_achieve / 3) * 100);	
		}
	},

	company_customers: function(){
    	var game = Games.findOne({});
    	var customers_number = 0;
    	game.customers.forEach(function (customer) {
    		if(customer.customer_product && customer.customer_product.product_creator == game.companies[Meteor.user().username].company_name && customer.customer_activity == 1){
				customers_number++;
    		}
    	});
		return customers_number;
	},

 //    company_regions: function(){
 //    	var game = Games.findOne({});
	// 	return game.companies[Meteor.user().username].company_region.length;
	// },

    company_products: function(){
    	var game = Games.findOne({});
    	var company = game.companies[Meteor.user().username];
    	var count = 0;
    	game.products.forEach(function (product) {
    		if(product.product_creator == company.company_name){
    			count++;
    		}
    	});

		return count;
	},
});