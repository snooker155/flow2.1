var game_methods = {

	getPlayersNumber: function(){
		var players_number = 0;
		for (var player in this.players){
			players_number++;
		}
		return players_number == 0 ? 1 : players_number;
	},

	updatePlayerExp: function(player){
		if (this.players[player].player_exp + 5 <= 100){
			this.players[player].player_exp += 5;
		}else{
			this.players[player].player_level += 1;
			this.players[player].player_exp = 0;
		}
	},

	getPlayerUsers: function(player){
		var users = 0;
		for (var region in this.players[player].regions){
			users += this.players[player].regions[region].people;
		}
		return users;
	},

	getRegionCustomerNumber: function(region_id){
		var region_customer_number = 0;
		this.customers.forEach(function (customer) {
			if(customer.customer_region == region_id){
				region_customer_number++;
			}
		});
		return region_customer_number;
	},

	getCustomersInRegion: function(region){
		var engaged_people = 0;
		this.customers.forEach(function (customer) {
			if(customer.customer_region == region){
				if(customer.customer_product != "" ||  customer.customer_product != undefined){
					engaged_people ++;
				}
			}
		});
		return engaged_people;
	},

	getCustomersNumber: function(){
		var customers_number = 0;
		for (var player in this.players){
			for (var region in this.players[player].regions){
				if(this.players[player].regions !== undefined && this.players[player].regions[region] !== undefined){
					customers_number += this.players[player].regions[region].people;
				}
			}
		}
		return customers_number == 0 ? 0 : customers_number;
	},

	// getTotalPeople: function(){
	// 	var total_people = 0;
	// 	for (var region in this.regions){
	// 		total_people += this.regions[region].region_people_number;
	// 	}
	// 	return total_people;
	// },

	getRegionFullness: function(region){
		var self = this;
		var region_customer_number = self.getRegionCustomerNumber(region);
		var region_fullness = 0;
		self.products.forEach(function (product) {
			var count = 0;
			self.customers.forEach(function (customer) {
				if(customer.customer_product && customer.customer_activity == 1 && customer.customer_product._id == product._id){
					if(customer.customer_region == region){
						count++;
					}
				}
			});
			
			if(count > 0){
				region_fullness += parseFloat((count / region_customer_number * 100).toFixed(2));
			}
		});
			
		return region_fullness;
	},

	getWorldState: function(){
		var world_state = {};
		var level_of_conservatism = 0,
			region_people_number = this.customers.length,
			base_price_rate = 0,
			base_profit_rate = 0,
			preferences = "Technology",
			total_demand = 0,
			total_market = 0,
			trend = "";


		for (var region in this.regions){
			total_demand += this.regions[region].region_demand;
		}
		total_demand = parseFloat((total_demand/6).toFixed(2));

		for (var region in this.regions){
			total_market += this.regions[region].region_market;
		}
		total_market = parseFloat((total_market/6).toFixed(2));

		if(total_demand - total_market < 0){
			trend = "Negative";
		}else if(total_demand - total_market < 0.5){
			trend = "Low";
		}else if(total_demand - total_market < 1){
			trend = "Medium";
		}else if (total_demand - total_market > 1) {
			trend = "High";
		}
		
		for (var region in this.regions){
			base_profit_rate += this.regions[region].base_profit_rate;
		}
		base_profit_rate = parseFloat((base_profit_rate).toFixed(2));

		for (var region in this.regions){
			base_price_rate += this.regions[region].base_price_rate;
		}
		base_price_rate = parseFloat((base_price_rate).toFixed(2));

		for (var region in this.regions){
			level_of_conservatism += this.regions[region].level_of_conservatism;
		}
		level_of_conservatism = parseFloat((level_of_conservatism / 6).toFixed(2));

		return world_state = {
			region_id: "World",
			region_name: "World",
			level_of_conservatism: level_of_conservatism,
			region_people_number: region_people_number,
			base_price_rate: base_price_rate,
			base_profit_rate: base_profit_rate,
			region_pref: preferences,
			region_demand: total_demand,
			region_market: total_market,
			region_trend: trend,
		};
	},

	updateMarketShare: function(username){
		if(this.players[username].regions){
		   	var players_people = 0;
		    for(var region in this.players[username].regions){
		       	if(this.players[username].regions[region].people > 0){
		       		this.players[username].player_balance += this.players[username].regions[region].people * this.regions[region].base_profit_rate; 
		        	this.players[username].regions[region].people -= 1;
		        	players_people += this.players[username].regions[region].people;
		        	this.players[username].regions[region].share = this.players[username].regions[region].people / this.regions[region].region_people * 100;
		        	this.updatePriceProfit(username, region);
		       	}
		   	}
		    this.players[username].player_share = players_people / this.getTotalPeople() * 100;
	    }
	},

	updatePriceProfit: function(username, region){
		var price = this.regions[region].level_of_conservatism * this.players[username].regions[region].share + this.regions[region].base_price_rate; 

		this.players[username].regions[region].price = Math.round(price*10);

		this.players[username].regions[region].profit = this.regions[region].base_profit_rate;
	},

	updateLevelOfConservatism: function(reigon){
		this.regions[region].level_of_conservatism -= 0.0005;
	},

	updateRegionBaseProfitRate: function(region){
		this.regions[region].base_profit_rate -= 0.0001;
	},

	updateRegionPeople: function(region){
		this.regions[region].region_people += this.regions[region].region_people * (this.regions[region].region_demand / 100);
		for (var player in this.players){
			if(this.players[player].regions !== undefined && this.players[player].regions[region] !== undefined){
				if(this.regions[region].region_demand / 100 < 0){
					this.players[player].regions[region].people += this.players[player].regions[region].people * (this.regions[region].region_demand / 100);
				}
			}
		}
	},

	updateRegionBasePriceRate: function(region){
		this.regions[region].base_price_rate += this.regions[region].base_price_rate * (this.regions[region].region_market / 100);		
	},


	updateRegionDemand: function(region, value){
		this.regions[region].region_demand = this.regions[region].region_demand - value;
	},

	updateRegionMarket: function(region, value){
		this.regions[region].region_market = this.regions[region].region_market - value;
	},

	updateRegionTrend: function(region){
		if(this.regions[region].region_demand - this.regions[region].region_market < 0){
			this.regions[region].region_trend = "Negative";
		}else if(this.regions[region].region_demand - this.regions[region].region_market < 0.5){
			this.regions[region].region_trend = "Low";
		}else if(this.regions[region].region_demand - this.regions[region].region_market < 1){
			this.regions[region].region_trend = "Medium";
		}else if (this.regions[region].region_demand - this.regions[region].region_market > 1) {
			this.regions[region].region_trend = "High";
		}
	},

	buyShare: function(region_name, player){
		var price = 0;
	    if(region_name !== null){
	        price = this.players[player].regions[region_name].price;
	        if(this.players[player].regions[region_name].share < 100){
	        	if(this.regions[region_name].region_people - this.getCustomersInRegion(region_name) - 10 > 0){
	          		this.players[player].regions[region_name].people += 10;
	          	}else{
	          		for (var other_player in this.players){
	          			if(other_player !== player){
	          				this.players[other_player].regions[region_name].people -= (10 / (this.getPlayersNumber()-1));
	          			}
	          		}
	          		this.players[player].regions[region_name].people += 10;
	          	}
	        }
	    }else{
	        for(var region in this.players[player].regions){
	          price += this.players[player].regions[region].price;
	          if(this.players[player].regions[region].share < 100){
	            this.players[player].regions[region].people += 10;
	          }
	        }
	      }

      	this.players[player].player_balance -= price;
	},


	///////////////////////////////////////////////////////////////////////////////
	////////////////////////////                      /////////////////////////////
	////////////////////////////      NEW METHODS     /////////////////////////////
	////////////////////////////                      /////////////////////////////
	///////////////////////////////////////////////////////////////////////////////


	getAverageIncome: function(){
		var average_income = 0;
		var total_income = 0;
		this.customers.forEach(function (customer) {
			total_income += customer.customer_income;
		});
		return average_income = total_income / this.customers.length;
	},


	setCustomersHistory: function(){
		var current_users = 0;
		var self = this;
		self.customers.forEach(function (customer) {
			if(customer.customer_activity == 1 && customer.customer_product != ""){
				current_users++;
			}
		});
		if(self.customers_history.length <= 10){
			self.customers_history.push(current_users);
		}else{
			self.customers_history.splice(0, 1);
			self.customers_history.push(current_users);
		}
	},

	setPriceHistory: function(){
		var total_price = 0;
		var self = this;
		self.products.forEach(function (product) {
			total_price += product.product_price;
		});
		var avg_price = parseFloat((total_price / self.products.length).toFixed(2));
		if(self.avg_price_history.length <= 10){
			self.avg_price_history.push(avg_price);
		}else{
			self.avg_price_history.splice(0, 1);
			self.avg_price_history.push(avg_price);
		}
	},

	getMarket: function(region){
		var market = 0;
		var self = this;
		self.products.forEach(function (product) {
			if(region){
				if(product.product_region == region){
					market += product.product_price * product.product_quantity;
				}
			}else{
				market += product.product_price * product.product_quantity;
			}
		});

		return market;
	},

	getDemand: function(region){
		var demand = 0;
		var self = this;
		self.customers.forEach(function (customer) {
			if(region){
				if(customer.customer_region == region){
					demand += customer.customer_income;
				}
			}else{
				demand += customer.customer_income;
			}
		});

		return demand;
	},

};




	//////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////
	/////////////////                          ///////////////////////
	/////////////////     CUSTOMERS METHODS    ///////////////////////
	/////////////////                          ///////////////////////
	//////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////





var customer_methods = {

	selectProduct: function(game){
		var self = this;
		var new_product;
		var products = [];
		var value_for_money = 0;
		var CONSERVATISM_SCALE = 1;
		switch (self.getIncomeGroup(game)) {
			case "poor":
				game.products.forEach(function (product) {
					if(product.product_price <= self.customer_income){
						products.push(product);
					}
				});
				products = products.sort();
				new_product = game.products[0];
				//console.log(new_product);
				// console.log(self.customer_income);
				// console.log(products);
				// console.log(new_product);
				if(products && new_product){
					var new_product_value = self.getSubjectiveUtility(new_product);
					products.forEach(function (product) {
						var product_value = self.getSubjectiveUtility(product);
						// console.log('--------------------------------------------------------');
						// console.log(product_value+" # "+new_product_value);
						/////// IMPORTANT Graph dependency /////////
						product_value = self.getNeighborsOpinion(game, product_value, product);
						/////// IMPORTANT Customer Conservatism ////
						product_value = product_value * (CONSERVATISM_SCALE - self.customer_product_conservatism[product._id]);
						////////////////////////////////////////////
						// console.log(product_value+" # "+new_product_value);
						// console.log('--------------------------------------------------------');
						if(product.product_price == new_product.product_price && product_value > new_product_value){
							new_product = product;
							new_product_value = product_value;
						}
					});
				}
				//console.log(new_product);
				break;
			case "middle":
				game.products.forEach(function (product) {
					if(product.product_price <= self.customer_income){
						products.push(product);
					}
				});
				products = products.sort();
				//console.log(new_product);
				if(products){
					products.forEach(function (product) {
						var product_value = self.getSubjectiveUtility(product);
						// console.log('--------------------------------------------------------');
						// console.log(product_value+" # "+value_for_money);
						/////// IMPORTANT Graph dependency /////////
						product_value = self.getNeighborsOpinion(game, product_value, product);
						/////// IMPORTANT Customer Conservatism ////
						product_value = product_value * (CONSERVATISM_SCALE - self.customer_product_conservatism[product._id]);
						////////////////////////////////////////////
						product_value =  product_value / product.product_price;
						// console.log(product_value+" # "+value_for_money);
						// console.log('--------------------------------------------------------');
						if(product_value > value_for_money){
							new_product = product;
							value_for_money = product_value;
						}
					});
				}
				//console.log(new_product);
				break;
			case "rich":
				game.products.forEach(function (product) {
					if(product.product_price <= self.customer_income){
						products.push(product);
					}
				});
				products = products.sort();
				new_product = game.products[0];
				//console.log(new_product);
				if(products){
					var new_product_value = self.getSubjectiveUtility(new_product);
					products.forEach(function (product) {
						var product_value = self.getSubjectiveUtility(product);
						//console.log('--------------------------------------------------------');
						//console.log(product_value+" # "+new_product_value);
						/////// IMPORTANT Graph dependency /////////
						product_value = self.getNeighborsOpinion(game, product_value, product);
						/////// IMPORTANT Customer Conservatism ////
						product_value = product_value * (CONSERVATISM_SCALE - self.customer_product_conservatism[product._id]);
						////////////////////////////////////////////
						//console.log(product_value+" # "+new_product_value);
						//console.log('--------------------------------------------------------');
						if(product_value > new_product_value){
							new_product = product;
							new_product_value = product_value;
						}
					});
				}
				//console.log(new_product);
				break;
		}

		if (new_product){
			var output = {
				new_product: new_product,
				needed_arr: self.updateNeeded(new_product),
			};
			//console.log(output);
			return output;
		}else{
			var output = {
				needed_arr: self.updateNeeded(),
			};
			//console.log(output);
			return output;
		}
	},


	getSubjectiveUtility: function (product){
		var self = this;
		var sub_util = 0;
		self.needed.forEach(function (need) {
			product.prop.forEach(function (prop) {
				sub_util += need.prop[prop.prop_name] * need.weight;
			});
		});
		return sub_util;
	},


	getNeighborsOpinion: function(game, sub_util, product){
		var self = this;
		var total_util = sub_util;
		var i = 0;
		var neighbor;
		self.customer_neighbors.forEach(function (neighbor_obj) {
			game.customers.forEach(function(customer) {
				if(customer.customer_id == neighbor_obj.customer_id){
					neighbor = customer;
				}
			});
			if (neighbor && neighbor.customer_product && neighbor.customer_product._id == product._id && neighbor.customer_activity == 1){
				total_util += (neighbor_obj.weight / 100) * neighbor.getSubjectiveUtility(product);
			}	
		});
		return total_util;
	},


	updateNeeded: function(product){
		var self = this;
		var needed_arr = [];
		if(product){
			self.needed.forEach(function (need) {
				var needed_value = 0;
				product.prop.forEach(function (prop) {
					needed_value += need.prop[prop.prop_name];
				});
				needed_arr.push(
					{value: needed_value, weight: need.weight, prop: need.prop}
				);
			});
		}else{
			self.needed.forEach(function (need) {
				needed_arr.push(
					{value: 0, weight: need.weight, prop: need.prop}
				);
			});
		}
		
		//console.log(needed_arr);
		return needed_arr;
	},

	getIncomeGroup: function(game){
		//var game = Games.findOne({});
		var average_income = game.getAverageIncome();
		if(this.customer_income < average_income * 0.7){
			return "poor";
		}else if(this.customer_income > average_income * 1.3){
			return "rich";
		}else{
			return "middle";
		}
	},

	makeRelations: function(){
		var game = Games.findOne({});
		var BASE_WEIGHT = 2;
		var MAX_CONNECTIONS = 6;
		var self = this;
		var i = 0;
		self.customer_neighbors = [];
		game.customers.forEach(function (customer) {
			if(i < MAX_CONNECTIONS){
				if(customer.customer_id != self.customer_id && 
					customer.customer_income == (self.customer_income) && 
					customer.customer_region == self.customer_region)
				{
					var weight = BASE_WEIGHT * 3;
					self.customer_neighbors.push({
						customer_id: customer.customer_id,
						weight: weight,
					});
					i++;
				}else if(customer.customer_id != self.customer_id && 
					customer.customer_income == (self.customer_income + 1) && 
					customer.customer_region == self.customer_region)
				{
					var weight = BASE_WEIGHT * 2;
					self.customer_neighbors.push({
						customer_id: customer.customer_id,
						weight: weight,
					});
					i++;
				}else if(customer.customer_id != self.customer_id && 
					customer.customer_income == (self.customer_income - 1) && 
					customer.customer_region == self.customer_region)
				{
					var weight = BASE_WEIGHT * 2;
					self.customer_neighbors.push({
						customer_id: customer.customer_id,
						weight: weight,
					});
					i++;
				}else if(customer.customer_id != self.customer_id && 
					customer.customer_income == (self.customer_income + 2) && 
					customer.customer_region == self.customer_region)
				{
					var weight = BASE_WEIGHT;
					self.customer_neighbors.push({
						customer_id: customer.customer_id,
						weight: weight,
					});
					i++;
				}else if(customer.customer_id != self.customer_id && 
					customer.customer_income == (self.customer_income - 2) && 
					customer.customer_region == self.customer_region)
				{
					var weight = BASE_WEIGHT;
					self.customer_neighbors.push({
						customer_id: customer.customer_id,
						weight: weight,
					});
					i++;
				}
			}
		});

		//Meteor.call('makeRelations', self, function (error, result) {});
	},


	changeActivity: function(game){
		var self = this;
		var status = self.customer_activity;
		var neighbor;

		// console.log("Id: "+self.customer_id);
		// console.log("Conserv: "+self.customer_conservatism);
		// console.log("Old_status: "+status);

		if(self.customer_conservatism && self.customer_conservatism >= 0.2){
			status = -4;
		}else if(self.customer_conservatism && self.customer_conservatism >= 0.15){
			status = -1;
		}else if(self.customer_conservatism && self.customer_conservatism >= 0.1){
			status = 0;
		}else if(!self.customer_conservatism || self.customer_conservatism <= 0){
			status = 1;
		}

		//console.log("Middle_status: "+status);

		self.customer_neighbors.forEach(function (neighbor) {
			game.customers.forEach(function(customer) {
				if(customer.customer_id == neighbor.customer_id){
					neighbor = customer;
				}
			});

			if(neighbor.customer_activity == 1){
				status += 1;
			}else{
				status -= 1;
			}
		});

		//console.log("New_status: "+status);

		if(status >= 1){
			self.customer_activity = 1;
		}else{
			self.customer_activity = 0;
		}

		//Meteor.call('changeActivity', self);
	},


	changeIncome: function(game){
		var self = this;
		if(self.getIncomeGroup(game) == "rich"){
			self.customer_income -= self.customer_income * 0.005;
			self.customer_income = parseFloat(self.customer_income.toFixed(2));
		}else if(self.getIncomeGroup(game) == "middle"){
			self.customer_income -= self.customer_income * 0.005;
			self.customer_income = parseFloat(self.customer_income.toFixed(2));
		}else if(self.getIncomeGroup(game) == "poor"){
			self.customer_income -= self.customer_income * 0.005;
			self.customer_income = parseFloat(self.customer_income.toFixed(2));
		}

		if(self.customer_income <= 5){
			self.customer_activity = 0;
		}else if(self.customer_income >= 30){
			self.customer_activity = 1;
		}
	},


	makeConservatism: function(){
		var game = Games.findOne({});
		var self = this;
		game.products.forEach(function (product) {
			self.customer_product_conservatism[product._id] = self.base_customer_conservatism;
		});
	},


	updateProductSelection: function(game){
		var self = this;
		if(self.customer_activity == 1){
			var output = self.selectProduct(game);
			if(self.customer_product && output.new_product){
				//console.log(self.customer_id + " # " + self.customer_income + " # " + self.customer_product._id + " # " + output.new_product._id);
				if (self.customer_product._id == output.new_product._id){
					if(self.customer_conservatism){
						self.customer_conservatism += 0.005;
						self.customer_product_conservatism[output.new_product._id] += 0.005;
						//Meteor.call("changeConservatism", self);
					}else{
						self.customer_conservatism = self.base_customer_conservatism + 0.005;
						self.customer_product_conservatism[output.new_product._id] += 0.005;
						//Meteor.call("changeConservatism", self);
					}
				}else{
					self.customer_conservatism = self.customer_product_conservatism[output.new_product._id];
					self.customer_product_conservatism[self.customer_product._id] += 0.2;
					self.customer_product = output.new_product;
					self.needed = output.needed_arr;
				}
			}else{
				self.customer_product = output.new_product;
			}
		}
	},


	// updateCustomer: function(){
	// 	var self = this;
	// 	Meteor.call('updateCustomer', self);
	// },

};

	//////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////






	//////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////
	/////////////////                          ///////////////////////
	/////////////////      PRODUCT METHODS     ///////////////////////
	/////////////////                          ///////////////////////
	//////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////

var product_methods = {

};

	//////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////



Games = new Mongo.Collection('games', {
	transform: function(doc){

		var newInstance = Object.create(game_methods);

		var customer_instance = Object.create(customer_methods);

		var product_instance = Object.create(product_methods);

		_.each(doc.customers, function(value, key, list){_.extend(value , customer_instance)});

		_.each(doc.products, function(value, key, list){_.extend(value , product_instance)});

		return _.extend(newInstance, doc);
	}
});
