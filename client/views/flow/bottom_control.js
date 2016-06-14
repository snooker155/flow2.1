
Template.bottom_control.helpers({
    products:function(){
    	var game = Games.findOne({});
    	var products = [];
        var free_share = 100;
    	game.products.forEach(function (product) {
            var product_share = 0;
            var total_product_customers = 0;
            game.customers.forEach(function (customer) {
                if(customer.customer_product.product_id == product.product_id){
                    total_product_customers++;
                }
            });
            product_share = Math.floor(total_product_customers / game.customers.length * 100);
            free_share -= product_share;
            products.push({
                product_name: product.product_name,
                product_color: product.product_color,
                product_share: product_share,
            });
        });
        products.push({
            product_name: "Free",
            product_color: "lightblue",
            product_share: free_share,
        });
    	return products;
    },

});
