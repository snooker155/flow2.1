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

	company_level: function () {
		var game = Games.findOne({});
		return game.companies[Meteor.user().username].company_level;
	},

	company_exp: function(){
		var game = Games.findOne({});
		return game.companies[Meteor.user().username].company_exp;
	},

	company_customers: function(){
    	var game = Games.findOne({});
    	var customers_number = 0;
    	game.customers.forEach(function (customer) {
    		if(customer.customer_product.product_creator == game.companies[Meteor.user().username].company_name){
				customers_number++;
    		}
    	});
		return customers_number;
	},

    company_regions: function(){
    	var game = Games.findOne({});
		return game.companies[Meteor.user().username].company_region.length;
	},

    company_products: function(){
    	var game = Games.findOne({});
    	if(game.companies[Meteor.user().username].company_product_name){
			return game.companies[Meteor.user().username].company_product_name.length;
		}else{
			return 0;
		}
	},
});