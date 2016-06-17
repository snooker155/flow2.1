Template.game_company.onRendered(function(){

    ////////////////////////////////////////////////////////////////////////////
    ///////////////////    CUSTOMERS-REVENUE-CHART    ////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    var data1 = [];
    var data2 = [];



            var dataset = [
                {
                    label: "Company balance",
                    data: data1,
                    color: "#1ab394",
                    bars: {
                        show: true,
                        align: "center",
                        barWidth: 24 * 60 * 60 * 600,
                        lineWidth:0
                    }

                }, {
                    label: "Company revenue",
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
                    max: 250000,
                    color: "#d5d5d5",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Arial',
                    axisLabelPadding: 3
                }, {
                    position: "right",
                    max: 250000,
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

            $.plot($("#customers_revenue_chart"), dataset, options);


Tracker.autorun(function () {
    var game = Games.findOne({});

    var data1 = [];
    var data2 = [];

    if(game.companies[Meteor.user().username]){
        game.companies[Meteor.user().username].company_history.forEach(function (company) {
            data1.push([gd(2012, 1, company.time_period), company.company_balance]);
            data2.push([gd(2012, 1, company.time_period), company.company_revenue]);
        });

    // console.log(data1);
    // console.log(data2);


            var dataset = [
                {
                    label: "Company balance",
                    data: data1,
                    color: "#1ab394",
                    bars: {
                        show: true,
                        align: "center",
                        barWidth: 24 * 60 * 60 * 600,
                        lineWidth:0
                    }

                }, {
                    label: "Company revenue",
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
                    max: 250000,
                    color: "#d5d5d5",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Arial',
                    axisLabelPadding: 3
                }, {
                    position: "right",
                    max: 250000,
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

            $.plot($("#customers_revenue_chart"), dataset, options);
        }
    });


});





Template.game_company.helpers({
    
    has_company(){
        var game = Games.findOne({});
        return game.companies[Meteor.user().username];
    },

    activities_list: function(){
        var game = Games.findOne({});
        if(game.companies[Meteor.user().username].company_activities){
            return game.companies[Meteor.user().username].company_activities.slice(game.companies[Meteor.user().username].company_activities.length-7).sort(function(a, b){return b.end_time - a.end_time});
        }
    },

    company_name: function(){
        var game = Games.findOne({});
        return game.companies[Meteor.user().username].company_name;
    },


    company_level: function(){
        var game = Games.findOne({});
        return game.companies[Meteor.user().username].company_level;
    },


    company_region: function(){
        var game = Games.findOne({});
        return game.companies[Meteor.user().username].company_region;
    },

    number_of_departments: function(){
        var game = Games.findOne({});
        if(game.companies[Meteor.user().username].company_team){
            return game.companies[Meteor.user().username].company_team.length;
        }else{
            return 0;
        }
    },

    number_of_employees: function(){
        var game = Games.findOne({});
        var count = 0;
        if(game.companies[Meteor.user().username].company_team){
            game.companies[Meteor.user().username].company_team.forEach(function (employee) {
                count += employee.employee_number;
            });
        }
        return count;
    },

    company_product: function(){
        var game = Games.findOne({});
        if (game.companies[Meteor.user().username].company_product_name){
            return game.companies[Meteor.user().username].company_product_name;
        }else{
            return "No product yet";
        }
        
    },

    username: function(){
        var game = Games.findOne({});
        return game.companies[Meteor.user().username].owner;
    },


    users_in_period(){
        var game = Games.findOne({});
        return game.companies[Meteor.user().username].getUsers(game);
    },


    revenue_in_period(){
        var game = Games.findOne({});
        return game.companies[Meteor.user().username].getRevenue(game);
    },

    balance_in_period(){
        var game = Games.findOne({});
        return parseFloat(game.companies[Meteor.user().username].company_balance.toFixed(2));
    },

    costs_in_period(){
        var game = Games.findOne({});
        return game.companies[Meteor.user().username].getCosts(game);
    },

    users_in_period_ratio(){
        var game = Games.findOne({});
        var users_in_period = 0;
        return Math.floor(game.companies[Meteor.user().username].getUsers(game) / game.customers.length * 100);
    },

    revenue_in_period_ratio(){
        var game = Games.findOne({});
        var total_active_revenue = 0;
        var total_revenue = 0;
        game.customers.forEach(function (customer) {
            total_revenue += customer.customer_income;
        });

        return Math.floor(game.companies[Meteor.user().username].getRevenue(game) / total_revenue * 100);
    },

    balance_in_period_ratio(){
        var game = Games.findOne({});
        return Math.floor(game.companies[Meteor.user().username].company_balance / 100000 * 100);
    },

    costs_in_period_ratio(){
        var game = Games.findOne({});
        var costs = game.companies[Meteor.user().username].getCosts(game);
        var balance = game.companies[Meteor.user().username].company_balance;
        return Math.floor(costs / balance * 100);
    },


});




Template.game_company.events({

    "click #delete_company": function(event){
        event.preventDefault();

        var game = Games.findOne({});
        delete game.companies[Meteor.user().username];

        Meteor.call('updateGame', game);

    },

});