



  Meteor.methods({



////////// Game methods ///////////////

    createGame: function(name, players){
        var regions = {};
        var products = [];
        var customers = [];
        var j = 0;

        var market = 0;

        Regions.find().forEach(function (region) {
            var base_level_of_conservatism = 0,
                new_level_of_conservatism = 0
                customer_income = 0,
                new_customer_income = 0;
            
            for (var i = 0; i < region.region_people_number; ++i){

                // new_level_of_conservatism = Math.random() / 10;
                // level_of_conservatism += new_level_of_conservatism;

                new_customer_income = region.base_income_rate + Math.floor(Math.random() * 20);
                //new_customer_income = region.base_income_rate;
                customer_income += new_customer_income;

                customers.push({
                    customer_id: j,
                    customer_region: region.region_id,
                    customer_pref: region.region_pref,
                    //customer_money: 2000 + Math.floor((Math.random() * 500) + 100),
                    base_customer_conservatism: region.base_level_of_conservatism,
                    customer_conservatism: region.base_level_of_conservatism,
                    customer_product_conservatism: {},
                    customer_income: new_customer_income,
                    customer_activity: 1,
                    customer_product: "",
                    //customer_product_quantity: 0,
                    customer_neighbors: [],
                    //customer_adv: 0,
                    //customer_history: [],
                    needed: [
                        {
                            value: 0, 
                            //weight: Math.floor(Math.random() * 10),
                            weight: Math.floor(Math.random() * 5),
                            prop: {
                                prop_1: Math.floor(Math.random() * 4),
                                prop_2: Math.floor(Math.random() * 4),
                                prop_3: Math.floor(Math.random() * 4),
                                prop_4: Math.floor(Math.random() * 4),
                                prop_5: Math.floor(Math.random() * 4),
                                prop_6: Math.floor(Math.random() * 4),
                                prop_7: Math.floor(Math.random() * 4),
                                prop_8: Math.floor(Math.random() * 4),
                                prop_9: Math.floor(Math.random() * 4),
                                prop_10: Math.floor(Math.random() * 4),
                            }
                        },
                        {
                            value: 0, 
                            //weight: Math.floor(Math.random() * 10),
                            weight: Math.floor(Math.random() * 5),
                            prop: {
                                prop_1: Math.floor(Math.random() * 4),
                                prop_2: Math.floor(Math.random() * 4),
                                prop_3: Math.floor(Math.random() * 4),
                                prop_4: Math.floor(Math.random() * 4),
                                prop_5: Math.floor(Math.random() * 4),
                                prop_6: Math.floor(Math.random() * 4),
                                prop_7: Math.floor(Math.random() * 4),
                                prop_8: Math.floor(Math.random() * 4),
                                prop_9: Math.floor(Math.random() * 4),
                                prop_10: Math.floor(Math.random() * 4),
                            }
                        },
                        {   
                            value: 0, 
                            // weight: Math.floor(Math.random() * 10),
                            weight: Math.floor(Math.random() * 5),
                            prop: {
                                prop_1: Math.floor(Math.random() * 4),
                                prop_2: Math.floor(Math.random() * 4),
                                prop_3: Math.floor(Math.random() * 4),
                                prop_4: Math.floor(Math.random() * 4),
                                prop_5: Math.floor(Math.random() * 4),
                                prop_6: Math.floor(Math.random() * 4),
                                prop_7: Math.floor(Math.random() * 4),
                                prop_8: Math.floor(Math.random() * 4),
                                prop_9: Math.floor(Math.random() * 4),
                                prop_10: Math.floor(Math.random() * 4),
                            }
                        },
                    ],
                });

                j++;

                console.log('Initializing: Customer ---- №' + j);
            }

        });

        var features = [];
        var departments = [];

        Features.find({}).fetch().forEach(function (feature) {
            features.push(feature);
        });

        Departments.find({}).fetch().forEach(function (department) {
            departments.push(department);
        });



        Regions.find().forEach(function (region) {

            var region_active_people_number = 0;
            var region_avg_income = 0;
            var region_income_groups = [];
            var region_products = [];
            var region_prop_pop = [];

            var total_income = 0;
            var region_conservatism = 0;
            var count_rich = 0, count_middle = 0, count_poor = 0;
            var avg_income_rich = 0, avg_income_middle = 0, avg_income_poor = 0;
            var count_active_rich = 0, count_active_middle = 0, count_active_poor = 0;

            customers.forEach(function (customer) {
                if(customer.customer_region == region.region_id){
                    if(customer.customer_activity == 1){
                        region_active_people_number++;
                    }

                    total_income += customer.customer_income;
                }

            });

            region_avg_income = parseFloat((total_income / region.region_people_number).toFixed(2));
            region_conservatism = parseFloat((region_conservatism / region.region_people_number).toFixed(2));

            region_income_groups = [];


            var map_data = [];
            var inactive_count = 0;
            var notselected_count = 0;
            var increment = 0;
            Products.find({}, {sort: {product_id: 1}}).fetch().forEach(function (product) {
                var count = 0;
                customers.forEach(function (customer) {
                    if(customer.customer_product && customer.customer_activity == 1 && customer.customer_product.product_id == product.product_id){
                        if(customer.customer_region == region.region_id){
                            count++;
                        }
                    }
                });
                
                if(count > 0){
                    increment += parseFloat((count / region.region_people_number * 100).toFixed(2));
                    map_data.push({
                        color: product.product_color,
                        offset: increment + "%",
                    });
                }


                region_products.push({
                    product_name: product.product_name,
                    product_color: product.product_color,
                    product_price: product.product_price,
                    product_creator: product.product_creator,
                    product_customers_number: count,
                    product_income: product.product_price * count,
                });
            });

            customers.forEach(function (customer) {
                if(customer.customer_activity == 0){
                    if(customer.customer_region == region.region_id){
                        inactive_count++;
                    }
                }else if(customer.customer_activity == 1 && !customer.customer_product){
                    if(customer.customer_region == region.region_id){
                        notselected_count++;
                    }
                }
            });

            if(inactive_count > 0){
                increment += parseFloat((inactive_count / region.region_people_number * 100).toFixed(2));
                map_data.push({
                    color: "red",
                    offset: increment + "%",
                });
            }

            if(notselected_count > 0){
                increment += parseFloat((notselected_count / region.region_people_number * 100).toFixed(2));
                map_data.push({
                    color: "#fff",
                    offset: increment + "%",
                });
            }


            var count_prop_needed = 0;
            var j = 0;
            var prop_arr = [];

            features.forEach(function (feature) {
                var prop_needed_arr = [];
                for(var x = 0; x < customers[0].needed.length; x++){
                    prop_needed_arr[x] = 0;
                }
                var count_prop = 0;
                var customer_number_in_region = 0;
                customers.forEach(function (customer) {
                    if(customer.customer_region == region.region_id){
                        j = 0;
                        customer.needed.forEach(function (need) {
                            count_prop += need.prop[feature.feature_name];
                            prop_needed_arr[j] += need.prop[feature.feature_name];
                            j++;
                        });
                        customer_number_in_region++;
                    }
                });
                for(var y = 0; y < prop_needed_arr.length; y++){
                    prop_needed_arr[y] = parseFloat((prop_needed_arr[y] / customer_number_in_region).toFixed(2));
                }
                region_prop_pop.push({
                    prop_name: feature.feature_name,
                    prop_count: parseFloat((count_prop / customer_number_in_region).toFixed(2)),
                    prop_needed_arr: prop_needed_arr,
                });
            });


            regions[region.region_id] = {
                region_id: region.region_id,
                region_name: region.region_name,
                region_pref: region.region_pref,
                region_people_number: region.region_people_number,
                base_income_rate: region.base_income_rate,
                base_level_of_conservatism: region.base_level_of_conservatism,
                region_conserv: region_conservatism,
                region_active_people_number: region_active_people_number,
                region_avg_income: region_avg_income,
                region_income_groups: region_income_groups,
                region_products: region_products,
                map_data: map_data,
                region_prop_pop: region_prop_pop,
            }
        });
        var game_id = Games.insert({
            game_name: name,
            players: players,
            regions: regions,
            customers: customers,
            //customers_data: customers_data,
            departments: departments,
            features: features,
            companies: {},
            news: [],
            customers_history: [],
            avg_price_history: [],
            products: products,
            status: "start",
            time_period: 0,
        });

        return game_id;
    },



    initGame: function(game_id){
        
        var game = Games.findOne({_id: game_id});

        var n = 1;

        console.log('Initializing: Relations --- Start');
        console.log('Initializing: Conservatism --- Start');
        game.customers.forEach(function (customer) {
                
            customer.makeRelations();

            customer.setInitConservatism();

            console.log('Initializing: Relations:' + n +' of '+ game.customers.length);
            n++;

        });
        console.log('Initializing: Relations --- End');
        console.log('Initializing: Conservatism --- End');


        for (var region in game.regions){
         var count_rich = 0, count_middle = 0, count_poor = 0;
         var avg_income_rich = 0, avg_income_middle = 0, avg_income_poor = 0;
         var count_active_rich = 0, count_active_middle = 0, count_active_poor = 0;
         var region_conserv = 0;
         game.customers.forEach(function (customer) {
             if(customer.customer_region == game.regions[region].region_id){
                 for (var conserv in customer.customer_product_conservatism){
                     region_conserv += customer.customer_conservatism * customer.customer_product_conservatism[conserv];     
                 }
             }

             if(customer.getIncomeGroup(game) == "rich"){
                 if(customer.customer_region == game.regions[region].region_id){
                     count_rich++;
                     avg_income_rich += customer.customer_income;
                     if(customer.customer_activity == 1){
                         count_active_rich++;
                     }
                 }
             }else if(customer.getIncomeGroup(game) == "middle"){
                 if(customer.customer_region == game.regions[region].region_id){
                     count_middle++;
                     avg_income_middle += customer.customer_income;
                     if(customer.customer_activity == 1){
                         count_active_middle++;
                     }
                 }
             }else if(customer.getIncomeGroup(game) == "poor"){
                 if(customer.customer_region == game.regions[region].region_id){
                     count_poor++;
                     avg_income_poor += customer.customer_income;
                     if(customer.customer_activity == 1){
                         count_active_poor++;
                     }
                 }
             }
         });
         region_conserv = parseFloat((region_conserv / game.regions[region].region_people_number).toFixed(4));
         game.regions[region].region_conserv = region_conserv;

         var region_income_groups = [{
             people_group: "rich",
             people_count: count_rich,
             people_average_income:  parseFloat((avg_income_rich / count_rich).toFixed(2)) >= 0 ? parseFloat((avg_income_rich / count_rich).toFixed(2)) : 0,
             people_active_number: count_active_rich,
         },{
             people_group: "middle",
             people_count: count_middle,
             people_average_income:  parseFloat((avg_income_middle / count_middle).toFixed(2)) >= 0 ? parseFloat((avg_income_middle / count_middle).toFixed(2)) : 0,
             people_active_number: count_active_middle,
         },{
             people_group: "poor",
             people_count: count_poor,
             people_average_income:  parseFloat((avg_income_poor / count_poor).toFixed(2)) >= 0 ? parseFloat((avg_income_poor / count_poor).toFixed(2)) : 0,
             people_active_number: count_active_poor,
         }];

         game.regions[region].region_income_groups = region_income_groups;
        }





        console.log('Initializing: History --- Start');

        game.setPriceHistory();   
        game.setCustomersHistory();

        console.log('Initializing: History --- End');


        Games.update(game._id,{
         players: game.players,
         customers: game.customers,
         //customers_data: game.customers_data,
         customers_history: game.customers_history,
         avg_price_history: game.avg_price_history,
         news: game.news,
         features: game.features,
         companies: game.companies,
         products: game.products,
         regions: game.regions,
         game_name: game.game_name,
         status: "process",
         //status: game.status,
         time_period: game.time_period,
        });

        return game._id;
    },

    updateGame: function(game){
      Games.update(game._id, {
        players: game.players,
        customers: game.customers,
        //customers_data: game.customers_data,
        customers_history: game.customers_history,
        avg_price_history: game.avg_price_history,
        news: game.news,
        companies: game.companies,
        products: game.products,
        features: game.features,
        regions: game.regions,
        game_name: game.game_name,
        status: game.status,
        time_period: game.time_period,
      });
    },



////////// Company methods ///////////////

    

    createCompany: function(company){
      Companies.insert({
        company_name: company.company_name,
        company_region: company.company_region,
        company_level: company.company_level,
        company_exp: company.company_exp,
        company_balance: company.company_balance,
        owner: company.owner,
        company_activities: company.company_activities,
        company_history: company.company_history,
        company_team: company.company_team,
        status: company.status,
      });
    },


    deleteCompany: function(company){
      Companies.remove(company._id);
    },


    updateCompany: function(company){
        Companies.update(company._id, {
        company_name: company.company_name,
        company_region: company.company_region,
        company_level: company.company_level,
        company_exp: company.company_exp,
        company_balance: company.company_balance,
        owner: company.owner,
        company_activities: company.company_activities,
        company_history: company.company_history,
        company_team: company.company_team,
      });
    },





////////// Product methods ///////////////

    

    createProduct: function(product, game_id){
        Products.insert({
          product_id: product.product_id,
          product_name: product.product_name,
          product_price: product.product_price,
          product_color: product.product_color,
          prop: product.prop,
          product_quantity: product.product_quantity,
          product_creator: product.product_creator,
          product_status: product.product_status,
          product_regions: product.product_regions,
          product_editable: product.product_editable,
        });

        var game = Games.findOne({_id: game_id});
        game.customers.forEach(function (customer) {
            customer.makeProductConservatism(product)
        });
        Meteor.call('updateGame', game);
    },


    deleteProduct: function(product){
      Products.remove(product._id);
    },


    updateProduct: function(product){
        Products.update(product._id, {
            product_id: product.product_id,
            product_name: product.product_name,
            product_price: product.product_price,
            product_color: product.product_color,
            prop: product.prop,
            product_quantity: product.product_quantity,
            product_creator: product.product_creator,
            product_status: product.product_status,
            product_regions: product.product_regions,
            product_editable: product.product_editable,
        });
    },




////////// Rooms methods ///////////////


    createRoom: function(name, players, current_players, status){
        var room_id = Rooms.insert({
            name: name,
            players: players,
            current_players: current_players,
            created: new Date(),
            owner: Meteor.user().username,
            game_id: null,
            status: status,
        });
        return room_id;
    },


    updateRoom: function(room){
        Rooms.update(room._id, {
            name: room.name,
            players: room.players,
            current_players: room.current_players,
            created: room.created,
            owner: room.owner,
            game_id: room.game_id,
            status: room.status,
        });
    },

});