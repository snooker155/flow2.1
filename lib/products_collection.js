var products_methods = {

	getProductQuality: function(){
		var product_quality = 0;
		this.needed.forEach(function (need) {
			product_quality += need.value;
		});
		return product_quality / 100;
	},

	// getNeededValue: function(customer){
	// 	var self = this;
	// 	var needed_value = [];
	// 	for (var prop in customer.needed.prop){
	// 		console.log(prop);
	// 	}
	// 	return needed_value;
	// },

};

Products = new Mongo.Collection("products", {
	transform: function(doc){

		var newInstance = Object.create(products_methods);

		return _.extend(newInstance, doc);
	}
});