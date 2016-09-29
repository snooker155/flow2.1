var customer_methods = {

	selectProduct: function(game){
		var self = this;
		var new_product = null;
		var products = [];
		var value_for_money = 0;
		var new_product_value = 0;
		var CONSERVATISM_SCALE = 1;
		switch (self.getIncomeGroup(game)) {
			case "poor":
				game.products.forEach(function (product) {
					if(product.product_price <= self.customer_income && product.product_status != "In progress"){
						product.product_regions.forEach(function (region) {
							if(region == self.customer_region){
								products.push(product);
							}
						});
					}
				});
				products = products.sort();
				// console.log(self.customer_income);
				// console.log(products);
				// console.log(self.customer_id+" "+self.customer_region);
				if(products[0]){
					new_product = products[0];
					new_product_value = self.getSubjectiveUtility(new_product);
					new_product_value = self.getNeighborsOpinion(game, new_product_value, new_product);
					new_product_value = new_product_value * (CONSERVATISM_SCALE - (self.customer_conservatism * self.customer_product_conservatism[new_product.product_id]));
					new_product_value =  new_product_value / new_product.product_price;
					// console.log(new_product);
					if(new_product){
						products.forEach(function (product) {
							var product_value = self.getSubjectiveUtility(product);
							//console.log('--------------------------------------------------------');
							// console.log(product_value+" # "+new_product_value);
							/////// IMPORTANT Graph dependency /////////
							product_value = self.getNeighborsOpinion(game, product_value, product);
							/////// IMPORTANT Customer Conservatism ////
							product_value = product_value * (CONSERVATISM_SCALE - (self.customer_conservatism * self.customer_product_conservatism[product.product_id]));
							////////////////////////////////////////////
							product_value =  product_value / product.product_price;
							// console.log(product_value+" # "+new_product_value);
							// console.log('--------------------------------------------------------');
							if(product.product_price == new_product.product_price && product_value > new_product_value){
								new_product = product;
								new_product_value = product_value;
							}
						});
					}
				}
				// console.log(new_product);
				// console.log(new_product_value);
				// console.log(self.customer_pref);
				if(new_product_value <= self.customer_pref){
					new_product = null;
				}
				break;
			case "middle":
				game.products.forEach(function (product) {
					if(product.product_price <= self.customer_income && product.product_status != "In progress"){
						product.product_regions.forEach(function (region) {
							if(region == self.customer_region){
								products.push(product);
							}
						});
					}
				});
				products = products.sort();
				//console.log(new_product);
				if(products[0]){
					products.forEach(function (product) {
						var product_value = self.getSubjectiveUtility(product);
						// console.log('--------------------------------------------------------');
						// console.log(product_value+" # "+value_for_money);
						/////// IMPORTANT Graph dependency /////////
						product_value = self.getNeighborsOpinion(game, product_value, product);
						/////// IMPORTANT Customer Conservatism ////
						product_value = product_value * (CONSERVATISM_SCALE - (self.customer_conservatism * self.customer_product_conservatism[product.product_id]));
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
				// console.log(new_product);
				// console.log(new_product_value);
				// console.log(self.customer_pref);
				if(value_for_money <= self.customer_pref){
					new_product = null;
				}
				break;
			case "rich":
				game.products.forEach(function (product) {
					if(product.product_price <= self.customer_income && product.product_status != "In progress"){
						product.product_regions.forEach(function (region) {
							if(region == self.customer_region){
								products.push(product);
							}
						});
					}
				});
				products = products.sort();
				new_product = products[0];
				if(products[0]){
					var new_product_value = self.getSubjectiveUtility(new_product);
					new_product_value = self.getNeighborsOpinion(game, new_product_value, new_product);
					new_product_value = new_product_value * (CONSERVATISM_SCALE - (self.customer_conservatism * self.customer_product_conservatism[new_product.product_id]));
					new_product_value =  new_product_value / new_product.product_price;
					products.forEach(function (product) {
						var product_value = self.getSubjectiveUtility(product);
						//console.log('--------------------------------------------------------');
						//console.log(product_value+" # "+new_product_value);
						/////// IMPORTANT Graph dependency /////////
						product_value = self.getNeighborsOpinion(game, product_value, product);
						/////// IMPORTANT Customer Conservatism ////
						product_value = product_value * (CONSERVATISM_SCALE - (self.customer_conservatism * self.customer_product_conservatism[product.product_id]));
						////////////////////////////////////////////
						product_value =  product_value / product.product_price;
						//console.log(product_value+" # "+new_product_value);
						//console.log('--------------------------------------------------------');
						if(product_value > new_product_value){
							new_product = product;
							new_product_value = product_value;
						}
					});
				}
				// console.log(new_product);
				// console.log(new_product_value);
				// console.log(self.customer_pref);
				if(new_product_value <= self.customer_pref){
					new_product = null;
				}
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
				sub_util += need.prop[prop.prop_name] * need.weight * prop.prop_level;
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
		var MAX_CONNECTIONS = 4;
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

	},


	changeActivity: function(game){
		var self = this;
		var status = self.customer_activity;
		var target_neighbor = null;

		// console.log("Id: "+self.customer_id);
		// console.log("Conserv: "+self.customer_conservatism);
		// console.log("Old_status: "+status);

		// if(self.customer_conservatism && self.customer_conservatism >= 0.5){
		// 	status = -4;
		// }else if(self.customer_conservatism && self.customer_conservatism >= 0.35){
		// 	status = -1;
		// }else if(self.customer_conservatism && self.customer_conservatism >= 0.3){
		// 	status = 0;
		// }else if(!self.customer_conservatism || self.customer_conservatism <= 0){
		// 	status = 1;
		// }

		//console.log("Middle_status: "+status);

		self.customer_neighbors.forEach(function (neighbor) {
			game.customers.forEach(function(customer) {
				if(customer.customer_id == neighbor.customer_id){
					target_neighbor = customer;
				}
			});


			if(target_neighbor){                                    ///////// Can't remake relations of customers 
				if(target_neighbor.customer_activity == 1){			///////// in case of deleting customers' neighbors
					status += 1;
				}else{
					status -= 1;
				}
			}
		});

		//console.log("New_status: "+status);

		if(status >= 1){
			self.customer_activity = 1;
		}else{
			self.customer_activity = 0;
		}

	},


	setInitConservatism: function(){
		var game = Games.findOne({});
		var self = this;
		game.products.forEach(function (product) {
			self.makeProductConservatism(product);
		});
	},


	makeProductConservatism: function(product){
		var self = this;
		self.customer_product_conservatism[product.product_id] = 0.25;
	},


	updateProductSelection: function(game){
		var self = this;
		if(self.customer_activity == 1){
			var output = self.selectProduct(game);
			if(self.customer_product && output.new_product){
				//console.log(self.customer_id + " # " + self.customer_income + " # " + self.customer_product._id + " # " + output.new_product._id);
				if (self.customer_product._id == output.new_product._id){
					// if((self.customer_product_conservatism[output.new_product.product_id] + 0.15) > 10){
					// 	self.customer_product_conservatism[output.new_product.product_id] = 10;
					// }else{
						self.customer_product_conservatism[output.new_product.product_id] += 0.015;
					// }
				}else{
					// if((self.customer_product_conservatism[self.customer_product.product_id] + 0.5) > 10){
					// 	self.customer_product_conservatism[self.customer_product.product_id] = 10;
					// }else{
						self.customer_product_conservatism[self.customer_product.product_id] += 0.5;
					// }
					self.customer_product = output.new_product;
					self.needed = output.needed_arr;
				}
			}else{
				self.customer_product = output.new_product;
			}
		}
	},

};



Customers = new Mongo.Collection("customers", {
	transform: function(doc){

		var newInstance = Object.create(customer_methods);

		return _.extend(newInstance, doc);
	}
});