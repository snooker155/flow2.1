var generations_methods = {

	crossover: function(){
		var self = this;
		var new_generation = [];
		var id = self.products_arr.length * self.generation_n;
		self.products_arr.forEach(function (product) {
			new_generation.push(product);
		});
		//console.log(self.products_arr);
		for (var i = 0; i < self.products_arr.length; i++){
			var first_parent = self.products_arr[Math.floor(Math.random() * (self.products_arr.length-0.1))];
			var second_parent = self.products_arr[Math.floor(Math.random() * (self.products_arr.length-0.1))];
			while (first_parent.product_id == second_parent.product_id) {
				second_parent = self.products_arr[Math.floor(Math.random() * (self.products_arr.length-0.1))];
			}
			var child_prop = [];

			//console.log(first_parent.product_id+" --- "+second_parent.product_id+" --- "+first_parent.prop.length);
			//console.log(first_parent.prop.length);
			// console.log(second_parent);

			// var k = 0;
			// if(Math.random() >= 0.95){
			// 	k = 1;
			// }else if(Math.random() <= 0.15){
			// 	k = -1;
			// }else{
			// 	k = 0;
			// }

			for(var j = 0; j < first_parent.prop.length; j++){
				//console.log(first_parent);
				var selected_parent = null;
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

			//var product_price = Math.pow(5, child_prop.length);
			var product_price = 3
			if(child_prop.length > 0){
				product_price = 5 * child_prop.length;
			}

			new_generation.push({
				product_id: id,
				product_name: "Prod " + id,
				product_price: product_price,
				prop: child_prop,
				product_creator: "Bot",
		        product_status: "Completed",
		        //product_share: 0,
		        product_util: 0,
			});
			id++;
		}
		self.products_arr = new_generation;
		//console.log(self.products_arr)
	},


	mutation: function(){
		var self = this;
		var new_generation = [];
		//console.log(self.products_arr)
		self.products_arr.forEach(function (product) {
			if(Math.random() < 0.75){
				for(var i = 0; i < Math.floor(Math.random() * self.features_arr.length); i++){
					var new_index = Math.floor(Math.random() * (product.prop.length - 0.001));
					var new_prop = "prop_"+Math.floor(Math.random() * (self.features_arr.length - 0.001));
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
		self.products_arr = new_generation;
		//console.log(self.products_arr)
	},


	estimation: function(){
		var self = this;
		var new_generation = [];
		self.products_arr.forEach(function (product) {
			var total_util = 0;
			self.customers_arr.forEach(function (customer) {
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
			product.product_util = parseFloat((total_util / (self.customers_arr.length * product.product_price)).toFixed(2));
			//console.log(product.product_util);
			new_generation.push(product);
		});
		self.products_arr = new_generation;
	},


	selection: function(){
		var self = this;
		self.products_arr = self.products_arr.sort(function(a, b){return b.product_util - a.product_util}).slice(0, 6);
	},


	getShare: function(){
		var self = this;
		return parseFloat((Customers.find({customer_product: self.product_name}).count() / Customers.find({}).count() * 100).toFixed(2));
	},

};

Generations = new Mongo.Collection("generations", {
	transform: function(doc){

		var newInstance = Object.create(generations_methods);

		return _.extend(newInstance, doc);
	}
});