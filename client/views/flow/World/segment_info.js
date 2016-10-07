Template.segment_info.onRendered(function(){
    var self = this;
    Tracker.autorun(function (c) {
        self.c = c;
        var game = Games.findOne({});

        $(".sparklines").sparkline('html', {
            width: '100%',
            height: '50px',
            lineColor: 'green',
            fillColor: '#fff'
        });



    ////////////////////////////////////////////////////////////////////////////
    ///////////////////    USERS-INCOME-CHART    ////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    var data1 = [];
    var data2 = [];
    var last_time_period = 0;

    game.customers_history.forEach(function (customer) {
        data1.push([customer.time_period, customer.current_users]);
        data2.push([customer.time_period, customer.avg_income]);
        last_time_period = customer.time_period;
    });

    for(var i = data1.length; i < 20; i++){
        data1.push([i, 0]);
    }


    // console.log(data1);
    // console.log(data2);


            var dataset = [
                {
                    label: "Active users",
                    data: data1,
                    color: "#1ab394",
                    bars: {
                        show: true,
                        align: "center",
                        barWidth: 0.5,
                        lineWidth: 0
                    }

                }, {
                    label: "Avg income",
                    data: data2,
                    yaxis: 2,
                    color: "#1C84C6",
                    lines: {
                        lineWidth:1,
                            show: true,
                            fill: true,
                        fillColor: {
                            colors: [{
                                opacity: 0.2
                            }, {
                                opacity: 0.4
                            }]
                        }
                    },
                    splines: {
                        show: true,
                        tension: 0.6,
                        lineWidth: 1,
                        fill: 0.1
                    },
                }
            ];

    


            var options = {
                xaxis: {
                    tickSize: 1,
                    tickLength: 0,
                    tickDecimals: 0,
                    axisLabel: "Period",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Arial',
                    axisLabelPadding: 10,
                    color: "#d5d5d5"
                },
                yaxes: [{
                    position: "left",
                    max: 250,
                    color: "#d5d5d5",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Arial',
                    axisLabelPadding: 3
                }, {
                    position: "right",
                    max: 50,
                    clolor: "#d5d5d5",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: ' Arial',
                    axisLabelPadding: 67
                }
                ],
                legend: {
                    noColumns: 1,
                    labelBoxBorderColor: "#000000",
                    position: "nw"
                },
                grid: {
                    hoverable: false,
                    borderWidth: 0
                }
            };

            function gd(year, month, day) {
                return new Date(year, month - 1, day).getTime();
            }

            var previousPoint = null, previousLabel = null;

            $.plot($("#users_income_chart"), dataset, options);
    });






        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////




            // var data1 = [
            //     [0,4],[1,8],[2,5],[3,10],[4,4],[5,16],[6,5],[7,11],[8,6],[9,11],[10,30],[11,10],[12,13],[13,4],[14,3],[15,3],[16,6]
            // ];
            // var data2 = [
            //     [0,1],[1,0],[2,2],[3,0],[4,1],[5,3],[6,1],[7,5],[8,2],[9,3],[10,2],[11,1],[12,0],[13,2],[14,8],[15,0],[16,0]
            // ];
            
            // var dataset1 = [
            //     {
            //         // label: "Number of orders",
            //         data: data2,
            //         color: "#1ab394",
            //         lines: {
            //             lineWidth:1,
            //                 show: true,
            //                 fill: true,
            //             fillColor: {
            //                 colors: [{
            //                     opacity: 0.2
            //                 }, {
            //                     opacity: 0.4
            //                 }]
            //             }
            //         },
            //         splines: {
            //             show: false,
            //             tension: 0.6,
            //             lineWidth: 1,
            //             fill: 0.1
            //         },

            //     }, {
            //         //label: "Payments",
            //         data: data1,
            //         color: "#1C84C6",
            //         lines: {
            //             lineWidth:1,
            //                 show: true,
            //                 fill: true,
            //             fillColor: {
            //                 colors: [{
            //                     opacity: 0.2
            //                 }, {
            //                     opacity: 0.4
            //                 }]
            //             }
            //         },
            //         splines: {
            //             show: true,
            //             tension: 0.6,
            //             lineWidth: 1,
            //             fill: 0.1
            //         },
            //         points: {
            //             radius: 1,
            //             show: true
            //         },
            //         shadowSize: 2
            //     }
            // ];

            // var options1 = {
            //     grid: {
            //         hoverable: true,
            //         clickable: true,
            //         tickColor: "#d5d5d5",
            //         borderWidth: 1,
            //         color: '#d5d5d5'
            //     },
            //     colors: ["#1ab394", "#1C84C6"],
            //     xaxis:{
            //     },
            //     yaxis: {
            //         ticks: 4
            //     },
            //     tooltip: true
            // };

            // $("#flot-dashboard1-chart").length && $.plot($("#flot-dashboard1-chart"), dataset1, options1);


        


});





Template.segment_info.helpers({
    current_avg_price_array: function(){
        var game = Games.findOne({});
        var someArray1 = game.avg_price_history;
        return someArray1.toString();
    },

    current_user_number_array: function(){
        var game = Games.findOne({});
        var current_users = [];
        game.customers_history.forEach(function (customer) {
            current_users.push(customer.current_users);
        });
        return current_users.toString();
    },

    current_world_avg_price(){
        var current_world_avg_price = 0;

        Products.find().fetch().forEach(function (product) {
            current_world_avg_price += product.product_price;
        });

        return parseFloat((current_world_avg_price / Products.find().fetch().length).toFixed(2));
    },

    avg_price_10(){
        var game = Games.findOne({});
        var avg_price_10 = 0;

        game.avg_price_history.forEach(function (avg_price) {
            avg_price_10 += avg_price;
        });

        return parseFloat((avg_price_10 / game.avg_price_history.length).toFixed(2));
    },

    price_rise(){
        var game = Games.findOne({});
        var price_rise = 0;
        if(game.avg_price_history[game.avg_price_history.length-1] && game.avg_price_history[game.avg_price_history.length-2]){
            var diff = game.avg_price_history[game.avg_price_history.length-1] - game.avg_price_history[game.avg_price_history.length-2];
            price_rise = parseFloat((diff / game.avg_price_history[game.avg_price_history.length-2] * 100).toFixed(2));
        }

        return price_rise;
    },

    last_period_avg_price(){
        var game = Games.findOne({});
        var last_period_avg_price = 0;
        if(game.avg_price_history[game.avg_price_history.length-2]){
            last_period_avg_price = game.avg_price_history[game.avg_price_history.length-2];
        }

        return last_period_avg_price;
    },

    current_world_users(){
        var game = Games.findOne({});
        var world_state = game.getWorldState();
        var total_customers = 0;
        world_state.region_products.forEach(function (product) {
            total_customers += product.product_customers_number;
        });
        return total_customers;
    },

    ratio_potential_current_users(){
        var game = Games.findOne({});
        var world_state = game.getWorldState();
        var total_customers = 0;
        world_state.region_products.forEach(function (product) {
            total_customers += product.product_customers_number;
        });
        return (total_customers / world_state.region_people_number * 100).toFixed(2);
    },
    
    new_users(){
        var game = Games.findOne({});
        var new_users = 0;
        if(game.customers_history[game.customers_history.length-1] && game.customers_history[game.customers_history.length-2] && game.customers_history[game.customers_history.length-2].current_users != 0){
            var diff = game.customers_history[game.customers_history.length-1].current_users - game.customers_history[game.customers_history.length-2].current_users;
            new_users = parseFloat((diff / game.customers_history[game.customers_history.length-2].current_users * 100).toFixed(2));
        }

        return new_users;
    },
    
    last_period_world_users(){
        var game = Games.findOne({});
        var last_period_world_users = 0;
        if(game.customers_history[game.customers_history.length-2]){
            last_period_world_users = game.customers_history[game.customers_history.length-2].current_users;
        }

        return last_period_world_users;
    },

    world_demand(){
        var game = Games.findOne({});
        var demand = 0;
        for (var region in game.regions){
            demand += game.regions[region].region_people_number * game.regions[region].base_income_rate;
        }
        return parseFloat(demand.toFixed(0));
    },
    
    world_market(){
        var game = Games.findOne({});
        return parseFloat(game.getMarket().toFixed(0));
    },
    
    people_number(){
        var game = Games.findOne({});
        var world_state = game.getWorldState();
        return world_state.region_people_number;
    },
    
    companies_number(){
        var game = Games.findOne({});
        var companies_number = 0;
        if(game.companies){
            for (var company in game.companies){
                companies_number++;
            }
        }
        return companies_number;
    },

    active_customers_number(){
        var game = Games.findOne({});
        var world_state = game.getWorldState();
        return world_state.region_people_number;
    },

    products_number(){
        var game = Games.findOne({});
        var products_number = 0;
        game.products ? products_number = game.products.length : 0;

        return products_number;
    },

    avg_income(){
        var game = Games.findOne({});
        var world_state = game.getWorldState();
        return world_state.region_avg_income;
    },

    clients_number(){
        var game = Games.findOne({});
        var world_state = game.getWorldState();
        var total_customers = 0;
        world_state.region_products.forEach(function (product) {
            total_customers += product.product_customers_number;
        });
        return total_customers;
    },

    users_in_period(){
        var game = Games.findOne({});
        var world_state = game.getWorldState();
        var total_customers = 0;
        world_state.region_products.forEach(function (product) {
            total_customers += product.product_customers_number;
        });
        return total_customers;
    },

    income_in_period(){
        var game = Games.findOne({});
        var world_state = game.getWorldState();
        return world_state.region_avg_income;
    },

    revenue_in_period(){
        var game = Games.findOne({});
        var total_revenue = 0;
        for (var region in game.regions){
            game.regions[region].region_products.forEach(function (product) {
                total_revenue += product.product_price * product.product_customers_number;
            });
        }

        return parseFloat(total_revenue.toFixed(2));
    },

    users_in_period_ratio(){
        var game = Games.findOne({});
        var world_state = game.getWorldState();
        var total_customers = 0;
        world_state.region_products.forEach(function (product) {
            total_customers += product.product_customers_number;
        });

        return Math.floor(total_customers / world_state.region_people_number * 100);
    },

    income_in_period_ratio(){
        var game = Games.findOne({});
        var world_state = game.getWorldState();

        return Math.floor((world_state.region_avg_income / world_state.region_avg_income) * 100);
    },

    revenue_in_period_ratio(){
        var game = Games.findOne({});
        var world_state = game.getWorldState();
        var total_revenue = 0;
        for (var region in game.regions){
            game.regions[region].region_products.forEach(function (product) {
                total_revenue += product.product_price * product.product_customers_number;
            });
        }

        return Math.floor(total_revenue / (world_state.region_avg_income * world_state.region_people_number) * 100);
    },

});



Template.segment_info.onDestroyed(function(){
    var self = this;
    self.c.stop();
});
