var game_methods = {

	getPlayersNumber: function(){
		var players_number = 0;
		for (var player in this.players){
			players_number++;
		}
		return players_number == 0 ? 0 : players_number;
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


	getRegionCustomerNumber: function(region){
		var self = this;
		var region_number = 0;
		self.customers.forEach(function (customer) {
			if(customer.customer_region == region){
				region_number++;
			}
		});
		return region_number;
	},


	getRegionFullness: function(region){
		var self = this;
		var region_customer_number = self.regions[region].region_people_number;
		var region_fullness = 0;
		self.regions[region].region_products.forEach(function (product) {
			region_fullness += product.product_customers_number;
		});
			
		return parseFloat((region_fullness / region_customer_number * 100).toFixed(2));
	},


	getWorldState: function(){
		var self = this;
		var world_state = {};
		var base_level_of_conservatism = 0,
			region_people_number = 0,
			base_income_rate = 0,
			region_pref = 0;
		var world_region_conserv = 0;
		var world_region_active_people_number = 0;
		var world_region_avg_income = 0;
		var world_region_income_groups = [{
			people_group: "rich",
			people_count: 0,
			people_average_income:  0,
			people_active_number: 0,
		},{
			people_group: "middle",
			people_count: 0,
			people_average_income:  0,
			people_active_number: 0,
		},{
			people_group: "poor",
			people_count: 0,
			people_average_income:  0,
			people_active_number: 0,
		}];
		var world_region_products = [];
		var world_region_prop_pop = [];
		var divider = [1,1,1];


		for (var region in self.regions){
			region_people_number += self.regions[region].region_people_number;
			base_level_of_conservatism += self.regions[region].base_level_of_conservatism;
			base_income_rate += self.regions[region].base_income_rate;
			region_pref += self.regions[region].region_pref;
			world_region_conserv += self.regions[region].region_conserv;
			world_region_active_people_number += self.regions[region].region_active_people_number;
			world_region_avg_income += self.regions[region].region_avg_income;

			for(var i = 0; i < self.regions[region].region_income_groups.length; i++) {
				if(self.regions[region].region_income_groups[i].people_count != 0){
					divider[i]++;
				}
				world_region_income_groups[i].people_count += self.regions[region].region_income_groups[i].people_count;
				world_region_income_groups[i].people_average_income += self.regions[region].region_income_groups[i].people_average_income;
				world_region_income_groups[i].people_active_number += self.regions[region].region_income_groups[i].people_active_number;
			}

			for(var j = 0; j < self.regions[region].region_products.length; j++) {
				if(!world_region_products[j]){
					world_region_products.push({
						product_name: self.regions[region].region_products[j].product_name,
						product_color: self.regions[region].region_products[j].product_color,
						product_price: parseFloat((self.regions[region].region_products[j].product_price / _.size(self.regions)).toFixed(2)),
						product_customers_number: self.regions[region].region_products[j].product_customers_number,
						product_income: self.regions[region].region_products[j].product_income,
					});
				}else{
					world_region_products[j].product_name = self.regions[region].region_products[j].product_name;
					world_region_products[j].product_color = self.regions[region].region_products[j].product_color;
					world_region_products[j].product_price = parseFloat((world_region_products[j].product_price + self.regions[region].region_products[j].product_price / _.size(self.regions)).toFixed(2));
					world_region_products[j].product_customers_number += self.regions[region].region_products[j].product_customers_number;
					world_region_products[j].product_income += self.regions[region].region_products[j].product_income;
				}
			}

			for(var z = 0; z < self.regions[region].region_prop_pop.length; z++) {
				if(!world_region_prop_pop[z]){
					var prop_needed_arr = [];
					self.regions[region].region_prop_pop[z].prop_needed_arr.forEach(function (need) {
						prop_needed_arr.push(parseFloat((need / _.size(self.regions)).toFixed(2)));
					});
					world_region_prop_pop.push({
						prop_name:self.regions[region].region_prop_pop[z].prop_name,
						prop_count: parseFloat((self.regions[region].region_prop_pop[z].prop_count /  _.size(self.regions)).toFixed(2)),
						prop_needed_arr: prop_needed_arr,
					});
				}else{
					world_region_prop_pop[z].prop_name = self.regions[region].region_prop_pop[z].prop_name;
					world_region_prop_pop[z].prop_count = parseFloat((world_region_prop_pop[z].prop_count + self.regions[region].region_prop_pop[z].prop_count / _.size(self.regions)).toFixed(2));
					for (var k = 0; k < world_region_prop_pop[z].prop_needed_arr.length; k++){
						world_region_prop_pop[z].prop_needed_arr[k] = parseFloat((world_region_prop_pop[z].prop_needed_arr[k] + self.regions[region].region_prop_pop[z].prop_needed_arr[k] / _.size(self.regions)).toFixed(2));
					}
				}
			}
		}

		for (var m = 0; m < world_region_income_groups.length; m++){
			world_region_income_groups[m].people_average_income = parseFloat((world_region_income_groups[m].people_average_income / divider[m]).toFixed(2))
		}


		base_level_of_conservatism = parseFloat((base_level_of_conservatism / _.size(self.regions)).toFixed(2));
		base_income_rate = parseFloat((base_income_rate / _.size(self.regions)).toFixed(2));
		region_pref = parseFloat((region_pref / _.size(self.regions)).toFixed(2));
		world_region_conserv = parseFloat((world_region_conserv / _.size(self.regions)).toFixed(4));
		world_region_avg_income = parseFloat((world_region_avg_income / _.size(self.regions)).toFixed(2));


		return world_state = {
			region_id: "World",
			region_name: "World",
			region_people_number: region_people_number,
			region_pref: region_pref,
			base_income_rate: base_income_rate,
			base_level_of_conservatism: base_level_of_conservatism,
			region_conserv: world_region_conserv,
			region_active_people_number: world_region_active_people_number,
			region_avg_income: world_region_avg_income,
			region_income_groups: world_region_income_groups,
			region_products: world_region_products,
			region_prop_pop: world_region_prop_pop,
		};
	},


	///////////////////////////////////////////////////////////////////////////////
	////////////////////////////                      /////////////////////////////
	////////////////////////////      NEW METHODS     /////////////////////////////
	////////////////////////////                      /////////////////////////////
	///////////////////////////////////////////////////////////////////////////////


	getAverageIncome: function(region){
		var self = this;
		var average_income = 0;
		var total_income = 0;
		var customer_count = 0;
		if(region){
			self.customers.forEach(function (customer) {
				if(customer.customer_region == region){
					total_income += customer.customer_income;
					customer_count++;
				}
			});
		}else{
			self.customers.forEach(function (customer) {
				total_income += customer.customer_income;
				customer_count++;
			});
		}
		average_income = total_income / customer_count
		return parseFloat(average_income.toFixed(2));
	},


	setCustomersHistory: function(){
		var self = this;
		var avg_income = 0;
		var world_state = self.getWorldState();
		var total_customers = 0;
        world_state.region_products.forEach(function (product) {
            total_customers += product.product_customers_number;
        });
		self.customers.forEach(function (customer) {
			avg_income += customer.customer_income;
		});
		avg_income = parseFloat((avg_income / self.customers.length).toFixed(2));

		if(self.customers_history.length < 40){
			self.customers_history.push({
				current_users: total_customers,
				avg_income: avg_income,
				time_period: self.time_period,
			});
		}else{
			self.customers_history.splice(0, 1);
			self.customers_history.push({
				current_users: total_customers,
				avg_income: avg_income,
				time_period: self.time_period,
			});
		}
	},

	setPriceHistory: function(){
		var total_price = 0;
		var self = this;
		self.products.forEach(function (product) {
			total_price += product.product_price;
		});
		var avg_price = parseFloat((total_price / self.products.length).toFixed(2));
		if(self.avg_price_history.length < 40){
			self.avg_price_history.push(avg_price);
		}else{
			self.avg_price_history.splice(0, 1);
			self.avg_price_history.push(avg_price);
		}
	},

	getMarket: function(region){
		var market = 0;
		var self = this;
		if(region){
			self.regions[region].region_products.forEach(function (product) {
				market += (product.product_price / self.regions[region].region_products.length * self.regions[region].region_people_number);
			});
		}else{
			var world_state = self.getWorldState();
			world_state.region_products.forEach(function (product) {
				market += (product.product_price / world_state.region_products.length * world_state.region_people_number);
			});
		}
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


	getMapData: function(region){
		var self = this;
		var map_data = [];
		var region_customer_number = self.getRegionCustomerNumber(region);
		var inactive_count = 0;
		var notselected_count = 0;
		var increment = 0;
		self.products.forEach(function (product) {
		  	var count = 0;
			self.customers.forEach(function (customer) {
				if(customer.customer_product && customer.customer_activity == 1 && customer.customer_product.product_id == product.product_id){
					if(customer.customer_region == region){
						count++;
					}
				}
			});
			
			if(count > 0){
				increment += parseFloat((count / region_customer_number * 100).toFixed(2));
				map_data.push({
					color: product.product_color,
					offset: increment + "%",
				});
			}

		});

		self.customers.forEach(function (customer) {
			if(customer.customer_activity == 0){
				if(customer.customer_region == region){
					inactive_count++;
				}
			}else if(customer.customer_activity == 1 && !customer.customer_product){
				if(customer.customer_region == region){
					notselected_count++;
				}
			}
		});

		if(inactive_count > 0){
			increment += parseFloat((inactive_count / region_customer_number * 100).toFixed(2));
			map_data.push({
				color: "red",
				offset: increment + "%",
			});
		}

		if(notselected_count > 0){
			increment += parseFloat((notselected_count / region_customer_number * 100).toFixed(2));
			map_data.push({
				color: "lightblue",
				offset: increment + "%",
			});
		}

		return map_data;
	},


	getRegionProducts: function(region){
		var self = this;
		var region_products = [];
		self.products.forEach(function (product) {
		  	var count = 0;
			self.customers.forEach(function (customer) {
				if(customer.customer_product && customer.customer_activity == 1 && customer.customer_product.product_id == product.product_id){
					if(customer.customer_region == region){
						count++;
					}
				}
			});

			region_products.push({
				product_name: product.product_name,
				product_color: product.product_color,
				product_price: product.product_price,
				product_customers_number: count,
				product_income: product.product_price * count,
			});
		});

		return region_products;
	},


	getRegionConserv: function(region){
		var self = this;
		var total_conserv = 0;
		var customer_count = 0;
		self.customers.forEach(function (customer) {
			if(region){
				if(customer.customer_region == region){
					for (var conserv in customer.customer_product_conservatism){
						total_conserv += customer.customer_conservatism * customer.customer_product_conservatism[conserv];		
					}
					customer_count++;
				}
			}else{
				for (var conserv in customer.customer_product_conservatism){
					total_conserv += customer.customer_conservatism * customer.customer_product_conservatism[conserv];		
				}
				customer_count++;
			}
		});
		return parseFloat((total_conserv / customer_count).toFixed(4));
	},


	getRegionPref: function(region){
		var self = this;
		var total_pref = 0;
		var customer_count = 0;
		self.customers.forEach(function (customer) {
			if(region){
				if(customer.customer_region == region){
					total_pref += customer.customer_pref;
					customer_count++;
				}
			}else{
				total_pref += customer.customer_pref;
				customer_count++;
			}
		});
		return total_pref / customer_count;
	},


	getAvgPrice: function(region){
		var self = this;
		var total_price = 0;
		var product_count = 0;
		var target_products = [];
		self.products.forEach(function (product) {
			if(region){
				product.product_regions.forEach(function (reg) {
					if(reg == region){
						total_price += product.product_price;
						product_count++;
					}
				});
			}else{
				total_price += product.product_price;
				product_count++;
			}
		});
		return total_price / product_count;
	},


	getCustomersNumber: function(region){
		var self = this;
		var total_customers = 0;
		self.customers.forEach(function (customer) {
			if(region){
				if(customer.customer_region == region){
					total_customers++;
				}
			}else{
				total_customers++;
			}
		});
		return total_customers;
	},




	///////////////////////////////////////////////////////////////////////////////
	////////////////////////////                      /////////////////////////////
	//////////////////////////   WORLD CHANGE METHODS   ///////////////////////////
	////////////////////////////                      /////////////////////////////
	///////////////////////////////////////////////////////////////////////////////



	changeIncome: function(reducing_level, region){
		var self = this;
		// if(region){
			self.customers.forEach(function (customer) {
				if(customer.customer_region == region){
					if(customer.getIncomeGroup(self) == "rich"){
						customer.customer_income += customer.customer_income * reducing_level;
						customer.customer_income = parseFloat(customer.customer_income.toFixed(2));
					}else if(customer.getIncomeGroup(self) == "middle"){
						customer.customer_income += customer.customer_income * reducing_level;
						customer.customer_income = parseFloat(customer.customer_income.toFixed(2));
					}else if(customer.getIncomeGroup(self) == "poor"){
						customer.customer_income += customer.customer_income * reducing_level;
						customer.customer_income = parseFloat(customer.customer_income.toFixed(2));
					}

					if(customer.customer_income <= 5){
						customer.customer_activity = 0;
					}else if(customer.customer_income >= 30){
						customer.customer_activity = 1;
					}
				}
			});

			self.regions[region].base_income_rate += self.regions[region].base_income_rate * reducing_level;
			self.regions[region].base_income_rate = parseFloat(self.regions[region].base_income_rate.toFixed(2));

			// self.news.push({
			// 	time_period: self.time_period,
			// 	type: "usd", /////Types: usd, newspaper-o, user, warning
			// 	header: "Region Income Change",
			// 	text: "All customers' incomes in region \""+region+"\" have been changed by "+reducing_level * 100+"%.",
			// });

		// }else{
		// 	self.customers.forEach(function (customer) {
		// 		if(customer.getIncomeGroup(self) == "rich"){
		// 			customer.customer_income += customer.customer_income * reducing_level;
		// 			customer.customer_income = parseFloat(customer.customer_income.toFixed(2));
		// 		}else if(customer.getIncomeGroup(self) == "middle"){
		// 			customer.customer_income += customer.customer_income * reducing_level;
		// 			customer.customer_income = parseFloat(customer.customer_income.toFixed(2));
		// 		}else if(customer.getIncomeGroup(self) == "poor"){
		// 			customer.customer_income += customer.customer_income * reducing_level;
		// 			customer.customer_income = parseFloat(customer.customer_income.toFixed(2));
		// 		}

		// 		if(customer.customer_income <= 5){
		// 			customer.customer_activity = 0;
		// 		}else if(customer.customer_income >= 30){
		// 			customer.customer_activity = 1;
		// 		}
		// 	});

		// 	for (var reg in self.regions){
		// 		self.regions[reg].base_income_rate += (self.regions[reg].base_income_rate * reducing_level / _.size(self.regions));
		// 	}

		// 	self.regions[region].base_income_rate = parseFloat(self.regions[region].base_income_rate.toFixed(2));

		// 	// self.news.push({
		// 	// 	time_period: self.time_period,
		// 	// 	type: "usd", /////Types: usd, newspaper-o, user, warning
		// 	// 	header: "Global Income Change",
		// 	// 	text: "All customers' incomes have been changed by "+reducing_level * 100+"%.",
		// 	// });
		// }
	},




	changeRegionActivity: function(status, region){
		var self = this;
		if(region){
			self.customers.forEach(function (customer) {
				if(customer.customer_region == region){
					// if(customer.getIncomeGroup(self) == "rich"){
					// 	customer.customer_income -= customer.customer_income * reducing_level;
					// 	customer.customer_income = parseFloat(customer.customer_income.toFixed(2));
					// }else if(customer.getIncomeGroup(self) == "middle"){
					// 	customer.customer_income -= customer.customer_income * reducing_level;
					// 	customer.customer_income = parseFloat(customer.customer_income.toFixed(2));
					// }else if(customer.getIncomeGroup(self) == "poor"){
					// 	customer.customer_income -= customer.customer_income * reducing_level;
					// 	customer.customer_income = parseFloat(customer.customer_income.toFixed(2));
					// }

					customer.customer_activity = status;
				}
			});

			// self.news.push({
			// 	time_period: self.time_period,
			// 	type: "newspaper-o", /////Types: usd, newspaper-o, user, warning
			// 	header: "Region Activity Change",
			// 	text: "All customers' activities in region \""+region+"\" have been set to "+status+".",
			// });

		}else{
			self.customers.forEach(function (customer) {
				// if(customer.getIncomeGroup(self) == "rich"){
				// 	customer.customer_income -= customer.customer_income * reducing_level;
				// 	customer.customer_income = parseFloat(customer.customer_income.toFixed(2));
				// }else if(customer.getIncomeGroup(self) == "middle"){
				// 	customer.customer_income -= customer.customer_income * reducing_level;
				// 	customer.customer_income = parseFloat(customer.customer_income.toFixed(2));
				// }else if(customer.getIncomeGroup(self) == "poor"){
				// 	customer.customer_income -= customer.customer_income * reducing_level;
				// 	customer.customer_income = parseFloat(customer.customer_income.toFixed(2));
				// }

				customer.customer_activity = status;
			});

			// self.news.push({
			// 	time_period: self.time_period,
			// 	type: "newspaper-o", /////Types: usd, newspaper-o, user, warning
			// 	header: "Global Activity Change",
			// 	text: "All customers' activities have been set to "+status+".",
			// });
		}

	},




	changeProductPrice: function(price, product_name){
		var self =this;
		var products_arr = [];

		if(product_name){
			self.products.forEach(function (product) {
				//console.log(product.product_name+" --- "+product_name);
				if(product.product_name == product_name && product.product_creator == "Bot"){
					//console.log(product);
					product.product_price += product.product_price * price;
				}
				products_arr.push(product);
			});

			//console.log(products_arr);

			self.products = products_arr;

			//console.log(self.products);

			// self.news.push({
			// 	time_period: self.time_period,
			// 	type: "newspaper-o", /////Types: usd, newspaper-o, user, warning
			// 	header: "Global Activity Change",
			// 	text: product_name+"'s price has been changed by "+price * 100+"%.",
			// });

		}else{
			self.products.forEach(function (product) {
				if(product.product_creator == "Bot"){
					product.product_price += product.product_price * price;
				}
				products_arr.push(product);
			});

			self.products = products_arr;

			//console.log(self.products);

			// self.news.push({
			// 	time_period: self.time_period,
			// 	type: "newspaper-o", /////Types: usd, newspaper-o, user, warning
			// 	header: "Global Price Change",
			// 	text: "All products' prices have been set to "+price * 100+"%.",
			// });
		}
	},




	changeCustomersNumber: function(number, region){
		var self =this;
		var customer_arr = [];
		if(region){
			var i = 0;
			customer_arr = self.customers.filter(function(customer){
				return customer.customer_region != region || ++i > number;
			});

			self.customers = customer_arr;

			self.regions[region].region_people_number -= number;

			//console.log(customer_arr.length);

			// self.news.push({
			// 	time_period: self.time_period,
			// 	type: "newspaper-o", /////Types: usd, newspaper-o, user, warning
			// 	header: "Region People Number Change",
			// 	text: "Population in \""+region+"\" has been changed by "+number+".",
			// });

		}else{
			self.customers = self.customers.splice(number, self.customers.length);

			for (var reg in self.regions){									/////////////////////  ?????????   /////////////////////
				self.regions[reg].region_people_number -= (number / 11);	/////////////////////  ?????????   /////////////////////
			}																/////////////////////  ?????????   /////////////////////

			//console.log(self.customers.length);

			// self.news.push({
			// 	time_period: self.time_period,
			// 	type: "newspaper-o", /////Types: usd, newspaper-o, user, warning
			// 	header: "Global People Number Change",
			// 	text: "Global population has been changed by "+number+".",
			// });
		}
	},




	changeRegionConservLevel: function(number, region){
		var self = this;
		// if(region){
			self.customers.forEach(function (customer) {
				if(customer.customer_region == region){
					if((customer.base_customer_conservatism + customer.base_customer_conservatism * number) > 0){
						if((customer.base_customer_conservatism + customer.base_customer_conservatism * number) > 1){
							customer.base_customer_conservatism = 0.999;
						}else{
							customer.base_customer_conservatism += customer.base_customer_conservatism * number;
						}
					}else{
						customer.base_customer_conservatism = 0.001;
					}
					if((customer.customer_conservatism + customer.customer_conservatism * number) > 0){
						if((customer.customer_conservatism + customer.customer_conservatism * number) > 1){
							customer.customer_conservatism = 0.999;
						}else{
							customer.customer_conservatism += customer.customer_conservatism * number;
						}
					}else{
						customer.customer_conservatism = 0.001;
					}
				}
			});

			self.regions[region].base_level_of_conservatism += self.regions[region].base_level_of_conservatism * number;
			self.regions[region].base_level_of_conservatism = parseFloat(self.regions[region].base_level_of_conservatism.toFixed(4))

			// self.news.push({
			// 	time_period: self.time_period,
			// 	type: "newspaper-o", /////Types: usd, newspaper-o, user, warning
			// 	header: "Region Conservatism Change",
			// 	text: "Conservatism in \""+region+"\" has been changed by "+number * 100+"%.",
			// });

		// }else{
		// 	self.customers.forEach(function (customer) {
		// 		if((customer.base_customer_conservatism + number) > 0){
		// 			if((customer.base_customer_conservatism + number) > 1){
		// 				customer.base_customer_conservatism = 0.999;
		// 			}else{
		// 				customer.base_customer_conservatism += customer.customer_conservatism * number;
		// 			}
		// 		}else{
		// 			customer.base_customer_conservatism = 0.001;
		// 		}
		// 		if((customer.customer_conservatism + number) > 0){
		// 			if((customer.customer_conservatism + number) > 1){
		// 				customer.customer_conservatism = 0.999;
		// 			}else{
		// 				customer.customer_conservatism += customer.customer_conservatism * number;
		// 			}
		// 		}else{
		// 			customer.customer_conservatism = 0.001;
		// 		}
		// 	});

		// 	for (var reg in self.regions){
		// 		self.regions[reg].base_level_of_conservatism += (self.regions[reg].base_level_of_conservatism * number / self.regions.length);
		// 	}

		// 	// self.news.push({
		// 	// 	time_period: self.time_period,
		// 	// 	type: "newspaper-o", /////Types: usd, newspaper-o, user, warning
		// 	// 	header: "Global People Number Change",
		// 	// 	text: "Global Conservatism has been changed by "+number * 100 +"%.",
		// 	// });
		// }
	},




	changeRegionPref: function(number, region){
		var self = this;
		//var regions_number = 0;
		// if(region){
			self.customers.forEach(function (customer) {
				if(customer.customer_region == region){
					customer.customer_pref += customer.customer_pref * number;
				}
			});

			self.regions[region].region_pref += self.regions[region].region_pref * number;

			self.regions[region].region_pref = parseFloat(self.regions[region].region_pref.toFixed(2));

			// self.news.push({
			// 	time_period: self.time_period,
			// 	type: "newspaper-o", /////Types: usd, newspaper-o, user, warning
			// 	header: "Region Conservatism Change",
			// 	text: "Preference in \""+region+"\" has been changed by "+number * 100+"%.",
			// });

		// }else{
		// 	self.customers.forEach(function (customer) {
		// 		customer.customer_pref += customer.customer_pref * number;
		// 	});

		// 	for (var reg in self.regions){
		// 		regions_number++;
		// 	}

		// 	for (var reg in self.regions){
		// 		self.regions[reg].region_pref += (self.regions[reg].region_pref * number / regions_number);
		// 	}

		// 	// self.news.push({
		// 	// 	time_period: self.time_period,
		// 	// 	type: "newspaper-o", /////Types: usd, newspaper-o, user, warning
		// 	// 	header: "Global People Number Change",
		// 	// 	text: "Global Preferences have been changed by "+number * 100+"%.",
		// 	// });
		// }
	},







	//////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////
	/////////////////                          ///////////////////////
	/////////////////     EVOLUTION METHODS    ///////////////////////
	/////////////////                          ///////////////////////
	//////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////





	crossover: function(){
		var self = this;
		var new_generation = [];
		var products_arr = [];
		self.products.forEach(function (product) {
			if(product.product_status == "Completed" && product.product_creator == "Bot"){
				products_arr.push(product);
			}
		});
		var id = products_arr.length * (self.time_period+1);
		products_arr.forEach(function (product) {
			new_generation.push(product);
		});
		//console.log(products_arr);
		for (var i = 0; i < products_arr.length; i++){
			var first_parent = products_arr[Math.floor(Math.random() * (products_arr.length-0.1))];
			var second_parent = products_arr[Math.floor(Math.random() * (products_arr.length-0.1))];
			while (first_parent.product_id == second_parent.product_id) {
				second_parent = products_arr[Math.floor(Math.random() * (products_arr.length-0.1))];
			}
			var child_prop = [];

			//console.log(first_parent.product_id+" --- "+second_parent.product_id+" --- "+first_parent.prop.length);
			//console.log(first_parent.prop.length);
			// console.log(second_parent);

			var selected_parent = null;
			for(var j = 0; j < first_parent.prop.length; j++){
				//console.log(first_parent);
				//var selected_parent = null;
				if(Math.random() >= 0.5){
					selected_parent = first_parent;
				}else{
					selected_parent = second_parent;
				}
				
				//console.log(selected_parent);
				//console.log(selected_parent.product_id+" --- "+selected_parent.prop.length);

				var index = Math.floor(Math.random() * (selected_parent.prop.length - 0.1));
				//console.log(index);
				child_prop.push({
					prop_name: selected_parent.prop[index].prop_name,
				})
				//console.log(child_prop);
			}

			var product_price = Math.floor(selected_parent.product_price * 0.8);
			// if(child_prop.length > 0){
			// 	product_price = 5 * child_prop.length;
			// }

			new_generation.push({
				product_id: id,
				product_name: "Prod " + id,
				product_color: "#b240b2",
				product_price: product_price,
				prop: child_prop,
				product_creator: "Bot",
				product_status: "Completed",
				//product_share: 0,
				product_util: 0,
				product_region: selected_parent.product_region,
				product_price_history: [],
				product_quantity: selected_parent.product_quantity,
				product_regions: selected_parent.product_regions,
			});
			id++;
		}
		self.products.forEach(function (product) {
			if(product.product_creator != "Bot"){
				new_generation.push(product);
			}
		});
		self.products = new_generation;
		console.log(self.products);
	},


	mutation: function(){
		var self = this;
		var new_generation = [];
		var products_arr = [];
		self.products.forEach(function (product) {
			if(product.product_status == "Completed" && product.product_creator == "Bot"){
				products_arr.push(product);
			}
		});
		//console.log(products_arr)
		products_arr.forEach(function (product) {
			if(Math.random() < 0.75){
				for(var i = 0; i < Math.floor(Math.random() * self.features.length); i++){
					var new_index = Math.floor(Math.random() * (product.prop.length - 0.001));
					var new_prop = "prop_"+Math.floor(Math.random() * (self.features.length - 0.001));
					//console.log(product.product_id+" --- "+product.prop.length+" --- "+new_index+" --- "+new_prop);
					if(new_index < 0){
						if(new_prop == "prod_-1"){
							product.prop[0].prop_name = "prod_0";
						}else{
							product.prop[0].prop_name = new_prop;
						}
					}else{
						product.prop[new_index].prop_name = new_prop;
					}
				}
			}
			new_generation.push(product);
		});
		self.products.forEach(function (product) {
			if(product.product_creator != "Bot"){
				new_generation.push(product);
			}
		});
		self.products = new_generation;
		//console.log(self.products_arr)
	},


	estimation: function(){
		var self = this;
		var new_generation = [];
		var products_arr = [];
		self.products.forEach(function (product) {
			if(product.product_status == "Completed" && product.product_creator == "Bot"){
				products_arr.push(product);
			}
		});
		products_arr.forEach(function (product) {
			var total_util = 0;
			self.customers.forEach(function (customer) {
				var sub_util = 0;
				customer.needed.forEach(function (need) {
					if(product.prop.length > 0){
						product.prop.forEach(function (prop) {
							sub_util += need.prop[prop.prop_name] * need.weight;
						});
					}
				});
				total_util += sub_util;
			});
			product.product_util = parseFloat((total_util / (self.customers.length * product.product_price)).toFixed(2));
			//console.log(product.product_util);
			new_generation.push(product);
		});
		self.products.forEach(function (product) {
			if(product.product_creator != "Bot"){
				new_generation.push(product);
			}
		});
		self.products = new_generation;
	},


	selection: function(){
		var self = this;
		var products_arr = [];
		self.products.forEach(function (product) {
			if(product.product_status == "Completed" && product.product_creator == "Bot"){
				products_arr.push(product);
			}
		});
		products_arr = products_arr.sort(function(a, b){return b.product_util - a.product_util}).slice(0, 3);
		self.products.forEach(function (product) {
			if(product.product_creator != "Bot"){
				products_arr.push(product);
			}
		});
		self.products = products_arr;

	},


	getShare: function(){
		var self = this;
		return parseFloat((Customers.find({customer_product: self.product_name}).count() / Customers.find({}).count() * 100).toFixed(2));
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

	getShare: function(game){
		var self = this;
		var product_share = 0;
		var total_product_customers = 0;
		game.customers.forEach(function (customer) {
			if(customer.customer_product && customer.customer_product.product_id == self.product_id && customer.customer_activity == 1){
				total_product_customers++;
			}
		});
		product_share = Math.floor(total_product_customers / game.customers.length * 100);
		return product_share;
	},

};

	//////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////




	//////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////
	/////////////////                          ///////////////////////
	/////////////////     COMPANIES METHODS    ///////////////////////
	/////////////////                          ///////////////////////
	//////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////

var company_methods = {

	getUsers: function(game){
		var self = this;
		var customers_number = 0;
		game.customers.forEach(function (customer) {
			if(customer.customer_product && customer.customer_activity == 1){
				if(customer.customer_product.product_creator == self.company_name){
					customers_number++;
				}
			}
		});
		return customers_number;
	},

	getRevenue: function(game){
		var self = this;
		var company_product;
		game.products.forEach(function (product) {
			if(product.product_creator == self.company_name){
				company_product = product;
			}
		});
		if(company_product){
			return parseFloat((self.getUsers(game) * company_product.product_price).toFixed(2));
		}else{
			return 0;
		}
	},

	getCosts: function(game){
		var self = this;
		var costs = 0;
		if(self.company_team){
			self.company_team.forEach(function (dep) {
				costs += dep.price_for_employee * dep.employee_number;
			});
		}
		return costs;
	},


	has_department: function(department_name){
		var self = this;
		var target_department = null;
		self.company_team.forEach(function (dep) {
			if(dep.department_name == department_name){
				target_department = dep;
			}
		});
		if(target_department){
			return true;
		}else{
			return false;
		}
	},


	has_employees_number: function(department_name, employee_number){
		var self = this;
		var target_department = null;
		self.company_team.forEach(function (dep) {
			if(dep.department_name == department_name){
				target_department = dep;
			}
		});

		if(target_department.employee_number - target_department.employee_number_at_work >= employee_number){
			return true;
		}else{
			return false;
		}
	},

	getDepEmployeeNumber: function(department_name){
		var self = this;
		var target_department = null;
		self.company_team.forEach(function (dep) {
			if(dep.department_name == department_name){
				target_department = dep;
			}
		});
		if(target_department){
			return target_department.employee_number - target_department.employee_number_at_work;
		}else{
			return 0;
		}
	},

	setToWork: function(department_name, employee_number){
		var self = this;
		var target_department = null;
		self.company_team.forEach(function (dep) {
			if(dep.department_name == department_name){
				target_department = dep;
			}
		});
		if(target_department){
			target_department.employee_number_at_work = employee_number;
		}
	},


	changeCompanyBalance: function(game){
		var self= this;
		self.company_balance += self.getRevenue(game) - self.getCosts(game);
	},

};

	//////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////



Games = new Mongo.Collection('games', {
	transform: function(doc){

		var newInstance = Object.create(game_methods);

		var customer_instance = Object.create(customer_methods);

		var product_instance = Object.create(product_methods);

		var company_instance = Object.create(company_methods);

		_.each(doc.customers, function(value, key, list){_.extend(value , customer_instance)});

		_.each(doc.products, function(value, key, list){_.extend(value , product_instance)});

		_.each(_.values(doc.companies), function(value, key, list){_.extend(value , company_instance)});

		return _.extend(newInstance, doc);
	}
});
