Template.segment_info.onRendered(function(){

    Tracker.autorun(function () {
        var game = Games.findOne({});

        $(".sparklines").sparkline('html', {
            width: '100%',
            height: '50px',
            lineColor: 'green',
            fillColor: '#fff'
        });
    });



            var data1 = [
                [0,4],[1,8],[2,5],[3,10],[4,4],[5,16],[6,5],[7,11],[8,6],[9,11],[10,30],[11,10],[12,13],[13,4],[14,3],[15,3],[16,6]
            ];
            var data2 = [
                [0,1],[1,0],[2,2],[3,0],[4,1],[5,3],[6,1],[7,5],[8,2],[9,3],[10,2],[11,1],[12,0],[13,2],[14,8],[15,0],[16,0]
            ];
            
            var dataset1 = [
                {
                    // label: "Number of orders",
                    data: data2,
                    color: "#1ab394",
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
                        show: false,
                        tension: 0.6,
                        lineWidth: 1,
                        fill: 0.1
                    },

                }, {
                    //label: "Payments",
                    data: data1,
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
                    points: {
                        radius: 1,
                        show: true
                    },
                    shadowSize: 2
                }
            ];

            var options1 = {
                grid: {
                    hoverable: true,
                    clickable: true,
                    tickColor: "#d5d5d5",
                    borderWidth: 1,
                    color: '#d5d5d5'
                },
                colors: ["#1ab394", "#1C84C6"],
                xaxis:{
                },
                yaxis: {
                    ticks: 4
                },
                tooltip: true
            };

            $("#flot-dashboard1-chart").length && $.plot($("#flot-dashboard1-chart"), dataset1, options1);


            var data3 = [
                [gd(2012, 1, 1), 7], [gd(2012, 1, 2), 6], [gd(2012, 1, 3), 4], [gd(2012, 1, 4), 8],
                [gd(2012, 1, 5), 9], [gd(2012, 1, 6), 7], [gd(2012, 1, 7), 5], [gd(2012, 1, 8), 4],
                [gd(2012, 1, 9), 7], [gd(2012, 1, 10), 8], [gd(2012, 1, 11), 9], [gd(2012, 1, 12), 6],
                [gd(2012, 1, 13), 4], [gd(2012, 1, 14), 5], [gd(2012, 1, 15), 11], [gd(2012, 1, 16), 8],
                [gd(2012, 1, 17), 8], [gd(2012, 1, 18), 11], [gd(2012, 1, 19), 11], [gd(2012, 1, 20), 6],
                [gd(2012, 1, 21), 6], [gd(2012, 1, 22), 8], [gd(2012, 1, 23), 11], [gd(2012, 1, 24), 13],
                [gd(2012, 1, 25), 7], [gd(2012, 1, 26), 9], [gd(2012, 1, 27), 9], [gd(2012, 1, 28), 8],
                [gd(2012, 1, 29), 5], [gd(2012, 1, 30), 8], [gd(2012, 1, 31), 25]
            ];

            var data4 = [
                [gd(2012, 1, 1), 800], [gd(2012, 1, 2), 500], [gd(2012, 1, 3), 600], [gd(2012, 1, 4), 700],
                [gd(2012, 1, 5), 500], [gd(2012, 1, 6), 456], [gd(2012, 1, 7), 800], [gd(2012, 1, 8), 589],
                [gd(2012, 1, 9), 467], [gd(2012, 1, 10), 876], [gd(2012, 1, 11), 689], [gd(2012, 1, 12), 700],
                [gd(2012, 1, 13), 500], [gd(2012, 1, 14), 600], [gd(2012, 1, 15), 700], [gd(2012, 1, 16), 786],
                [gd(2012, 1, 17), 345], [gd(2012, 1, 18), 888], [gd(2012, 1, 19), 888], [gd(2012, 1, 20), 888],
                [gd(2012, 1, 21), 987], [gd(2012, 1, 22), 444], [gd(2012, 1, 23), 999], [gd(2012, 1, 24), 567],
                [gd(2012, 1, 25), 786], [gd(2012, 1, 26), 666], [gd(2012, 1, 27), 888], [gd(2012, 1, 28), 900],
                [gd(2012, 1, 29), 178], [gd(2012, 1, 30), 555], [gd(2012, 1, 31), 993]
            ];


            var dataset = [
                {
                    label: "Number of orders",
                    data: data4,
                    color: "#1ab394",
                    bars: {
                        show: true,
                        align: "center",
                        barWidth: 24 * 60 * 60 * 600,
                        lineWidth:0
                    }

                }, {
                    label: "Payments",
                    data: data3,
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
                        show: false,
                        tension: 0.6,
                        lineWidth: 1,
                        fill: 0.1
                    },
                }
            ];


            var options = {
                xaxis: {
                    mode: "time",
                    tickSize: [3, "day"],
                    tickLength: 0,
                    axisLabel: "Date",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Arial',
                    axisLabelPadding: 10,
                    color: "#d5d5d5"
                },
                yaxes: [{
                    position: "left",
                    max: 1070,
                    color: "#d5d5d5",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Arial',
                    axisLabelPadding: 3
                }, {
                    position: "right",
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

            $.plot($("#flot-dashboard-chart"), dataset, options);


});





Template.segment_info.helpers({
    current_avg_price_array: function(){
        var game = Games.findOne({});
        var someArray1 = game.avg_price_history;
        return someArray1.toString();
    },

    // options1: function(){
    //     var options1 = {
    //         width: '100%',
    //         height: '50px',
    //         lineColor: 'green',
    //         fillColor: '#fff'
    //     };
    //     return options1;
    // },

    current_user_number_array: function(){
        var game = Games.findOne({});
        var someArray2 = game.customers_history;
        return someArray2.toString();
    },

    // options2: function(){
    //     var options2 = {
    //         width: '100%',
    //         height: '50px',
    //         lineColor: 'green',
    //         fillColor: '#fff'
    //     };
    //     return options2;
    // },

    current_world_avg_price(){
        var game = Games.findOne({});
        var current_world_avg_price = 0;

        game.products.forEach(function (product) {
            current_world_avg_price += product.product_price;
        });

        return parseFloat((current_world_avg_price / game.products.length).toFixed(2));
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
        var diff = game.avg_price_history[game.avg_price_history.length-1] - game.avg_price_history[game.avg_price_history.length-2];
        var price_rise = parseFloat((diff / game.avg_price_history[game.avg_price_history.length-2] * 100).toFixed(2));

        return price_rise;
    },

    last_period_avg_price(){
        var game = Games.findOne({});
        var last_period_avg_price = game.avg_price_history[game.avg_price_history.length-2];

        return last_period_avg_price;
    },

    current_world_users(){
        var game = Games.findOne({});
        var current_world_users = 0;
        game.customers.forEach(function (customer) {
            if(customer.customer_product != "" && customer.customer_activity == 1){
                current_world_users++;
            }
        });

        return current_world_users;
    },

    ratio_potential_current_users(){
        var game = Games.findOne({});
        var current_world_users = 0;
        game.customers.forEach(function (customer) {
            if(customer.customer_product != "" && customer.customer_activity == 1){
                current_world_users++;
            }
        });


        return (current_world_users / game.customers.length * 100).toFixed(2);
    },
    
    new_users(){
        var game = Games.findOne({});
        var diff = game.customers_history[game.customers_history.length-1] - game.customers_history[game.customers_history.length-2];
        var new_users = parseFloat((diff / game.customers_history[game.customers_history.length-2] * 100).toFixed(2));

        return new_users;
    },
    
    last_period_world_users(){
        var game = Games.findOne({});
        var last_period_world_users = game.customers_history[game.customers_history.length-2];

        return last_period_world_users;
    },

    world_demand(){
        var game = Games.findOne({});
        return parseFloat(game.getDemand().toFixed(2));
    },
    
    world_market(){
        var game = Games.findOne({});
        return parseFloat(game.getMarket().toFixed(2));
    },
    
    people_number(){
        var game = Games.findOne({});
        var people_number = 0;
        game.customers ? people_number = game.customers.length : 0;

        return people_number;
    },
    
    companies_number(){
        var game = Games.findOne({});
        var companies_number = 0;
        game.companies ? companies_number = game.companies.length : 0;

        return companies_number;
    },

    active_customers_number(){
        var game = Games.findOne({});
        var active_customers_number = 0;
        game.customers.forEach(function (customer) {
            if(customer.customer_activity == 1){
                active_customers_number++;
            }
        });

        return active_customers_number;
    },

    products_number(){
        var game = Games.findOne({});
        var products_number = 0;
        game.products ? products_number = game.products.length : 0;

        return products_number;
    },

    avg_income(){
        var game = Games.findOne({});
        var total_customers = 0;
        var total_income = 0;
        game.customers.forEach(function (customer) {
            total_customers++;
            total_income += customer.customer_income;
        });

        return parseFloat((total_income / total_customers).toFixed(2));
    },

    clients_number(){
        var game = Games.findOne({});
        var clients_number = 0;
        game.customers.forEach(function (customer) {
            if(customer.customer_product != "" && customer.customer_activity == 1){
                clients_number++;
            }
        });

        return clients_number;
    },

});

