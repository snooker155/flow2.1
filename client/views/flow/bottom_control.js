
Template.bottom_control.helpers({
    products:function(){
    	var game = Games.findOne({});
    	var products = [];
        var world_state = game.getWorldState();
        var total_share = 0;
        var total_customer_number = 0;
        world_state.region_products.forEach(function (product) {
            var product_share = 0;
            product_share = Math.floor(product.product_customers_number / world_state.region_people_number * 100);
            products.push({
                product_name: product.product_name,
                product_color: product.product_color,
                product_share: product_share,
            });
            total_share += product_share;
            total_customer_number += product.product_customers_number;
        });


        if(total_share < 100 && Math.floor(world_state.region_people_number - total_customer_number / world_state.region_people_number * 100) > 0){
            products.push({
                product_name: "Free",
                product_color: "lightblue",
                product_share: (100 - total_share),
            });
        }

        // if(inactive_share > 0 && Math.floor(inactive_share / game.customers.length * 100) > 0){
        //     products.push({
        //         product_name: "Inactive",
        //         product_color: "red",
        //         product_share: Math.floor(inactive_share / game.customers.length * 100),
        //     });
        // }

        return products;
    },

});
