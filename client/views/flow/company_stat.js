Template.company_stat.onCreated(function() {
    var self = this;
    Tracker.autorun(function (c) {
        self.company = Companies.findOne({owner: Meteor.user().username});
        //console.log("Now i am here");
        self.c = c;
        var company_subscription = self.subscribe("companies");
        if(company_subscription.ready()){
           	console.log('Loaded');
        }else{
            console.log('Loading...');
        }
    });

    self.getCompany = function(){
        return self.company;
    }
});



Template.company_stat.helpers({
	has_company(){
        return self.company;
	},

	company_name: function () {
		return self.company.company_name;
	},

	company_level: function () {
		return self.company.company_level;
	},

	company_balance: function () {
		return parseFloat(self.company.company_balance.toFixed(2));
	},

	// company_level: function () {
	// 	var game = Games.findOne({});
	// 	return game.companies[Meteor.user().username].company_level;
	// },

	// company_exp: function(){
	// 	var game = Games.findOne({});
	// 	return game.companies[Meteor.user().username].company_exp;
	// },

	// production(){
	// 	var game = Games.findOne({});
	// 	var company = game.companies[Meteor.user().username];
	// 	var production = [];
	// 	game.products.forEach(function (product) {
	// 		if(product.product_creator == company.company_name){
	// 			//if(product.product_status != "Completed"){
	// 				production.push(product);
	// 			//}
	// 		}
	// 	});

	// 	return production;
	// },

	// product_production_progress(){
	// 	var game = Games.findOne({});
	// 	var self = this;
	// 	var total_time_to_achieve = 0;
	// 	var total_start_period = 0;
	// 	self.prop.forEach(function (property) {
 //            if(property.status == 'active'){
 //                if(total_time_to_achieve < property.start_period + property.time_to_achieve * property.prop_level){
 //                    total_time_to_achieve = property.start_period + property.time_to_achieve * property.prop_level;
 //                    target_property = property;
 //                }
 //            }
 //        });
 //        // console.log(total_time_to_achieve);
 //        // console.log(total_start_period);
 //        // console.log(Math.round((game.time_period - total_start_period) / (total_time_to_achieve / 3) * 100));
 //        if(target_property){
 //            if(Math.round((game.time_period - target_property.start_period) / (target_property.time_to_achieve * target_property.prop_level) * 100) >= 100){
 //                return 100;
 //            }else{
 //                return Math.round((game.time_period - target_property.start_period) / (target_property.time_to_achieve * target_property.prop_level) * 100); 
 //            }
 //        }else{
 //            return 100;
 //        }
	// },

	// company_customers: function(){
 //    	var game = Games.findOne({});
 //    	var customers_number = 0;
 //    	game.customers.forEach(function (customer) {
 //    		if(customer.customer_product && customer.customer_product.product_creator == game.companies[Meteor.user().username].company_name && customer.customer_activity == 1){
	// 			customers_number++;
 //    		}
 //    	});
	// 	return customers_number;
	// },

 //    company_regions: function(){
 //    	var game = Games.findOne({});
	// 	return game.companies[Meteor.user().username].company_region.length;
	// },

 //    company_products: function(){
 //    	var game = Games.findOne({});
 //    	var company = game.companies[Meteor.user().username];
 //    	var count = 0;
 //    	game.products.forEach(function (product) {
 //    		if(product.product_creator == company.company_name){
 //    			count++;
 //    		}
 //    	});

	// 	return count;
	// },
});



Template.company_stat.onDestroyed(function() {
    var self = this;
    self.c.stop();
});
