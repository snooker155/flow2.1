Template.company_stat.onCreated(function() {
    // var self = this;
    // Tracker.autorun(function (c) {
    //     self.c = c;
    //     self.company = Companies.findOne({owner: Meteor.user().username});
    //     // var company_subscription = self.subscribe("companies");
    //     // if(company_subscription.ready()){
    //     //    	console.log('Loaded');
    //     //    	console.log(self.company);
    //     // }else{
    //     //     console.log('Loading...');
    //     // }
    // });

    // self.getCompany = function(){
    //     return self.company;
    // }
});



Template.company_stat.helpers({
	has_company(){
        return Companies.findOne({owner: Meteor.user().username});
	},

	company_name: function () {
		return Companies.findOne({owner: Meteor.user().username}).company_name;
	},

	company_level: function () {
		return Companies.findOne({owner: Meteor.user().username}).company_level;
	},

	company_balance: function () {
		return parseFloat(Companies.findOne({owner: Meteor.user().username}).company_balance.toFixed(2));
	},

	// company_exp: function(){
	// 	var game = Games.findOne({});
	// 	return game.companies[Meteor.user().username].company_exp;
	// },

	production(){
		var company = Companies.findOne({owner: Meteor.user().username});
		var production = [];
		Products.find().fetch().forEach(function (product) {
			if(product.product_creator == company.company_name){
				//if(product.product_status != "Completed"){
					production.push(product);
				//}
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
            if(property.status == 'active'){
                if(total_time_to_achieve < property.start_period + property.time_to_achieve * property.prop_level){
                    total_time_to_achieve = property.start_period + property.time_to_achieve * property.prop_level;
                    target_property = property;
                }
            }
        });
        // console.log(total_time_to_achieve);
        // console.log(total_start_period);
        // console.log(Math.round((game.time_period - total_start_period) / (total_time_to_achieve / 3) * 100));
        if(target_property){
            if(Math.round((game.time_period - target_property.start_period) / (target_property.time_to_achieve * target_property.prop_level) * 100) >= 100){
                return 100;
            }else if(Math.round(((game.time_period) - target_property.start_period) / (target_property.time_to_achieve * target_property.prop_level) * 100) < 0){
                return 0;
            }else{
                return Math.round((game.time_period - target_property.start_period) / (target_property.time_to_achieve * target_property.prop_level) * 100); 
            }
        }else{
            return 100;
        }
	},

	company_customers: function(){
    	var game = Games.findOne({});
    	var world_state = game.getWorldState();
    	var company = Companies.findOne({owner: Meteor.user().username});
    	var customers_number = 0;
    	world_state.region_products.forEach(function (product) {
    		if(product.product_creator == company.company_name){
				customers_number += product.product_customers_number;
    		}
    	});
		return customers_number;
	},

 //    company_regions: function(){
 //    	var game = Games.findOne({});
	// 	return game.companies[Meteor.user().username].company_region.length;
	// },

    company_products: function(){
    	var company = Companies.findOne({owner: Meteor.user().username});
    	var count = 0;
    	Products.find().fetch().forEach(function (product) {
    		if(product.product_creator == company.company_name){
    			count++;
    		}
    	});

		return count;
	},
});



Template.company_stat.onDestroyed(function() {
    // var self = this;
    // self.c.stop();
});
