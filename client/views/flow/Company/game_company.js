Template.game_company.helpers({
    has_company(){
        var game = Games.findOne({});
        return game.companies[Meteor.user().username];
    },
});



function drawPlotGraph(data1, data2){

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
                    max: 30000,
                    color: "#d5d5d5",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Arial',
                    axisLabelPadding: 3
                }, {
                    position: "right",
                    max: 2500,
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

            var previousPoint = null, previousLabel = null;

            $.plot($("#customers_revenue_chart"), dataset, options);
};


function gd(year, month, day) {
    return new Date(year, month - 1, day).getTime();
}


Template.company_profile.onCreated(function() {
    var self = this;
    //console.log(self);
    Tracker.autorun(function (c) {
        self.game = Games.findOne({});
        self.c = c;
        //console.log(self.c);
        var game_subscription = self.subscribe("games");
        if(game_subscription.ready()){
            // console.log("I am here!");
            // console.log(game_subscription);

            var data1 = [];
            var data2 = [];

            if(self.game.companies[Meteor.user().username]){
                self.game.companies[Meteor.user().username].company_history.forEach(function (company) {
                    data1.push([gd(2012, 1, company.time_period), company.company_balance]);
                    data2.push([gd(2012, 1, company.time_period), company.company_revenue]);
                });

                drawPlotGraph(data1, data2);
            }
        }
    });

    self.getGame = function(){
        return Games.findOne({});
    }

});




Template.company_profile.onRendered(function(){

    ////////////////////////////////////////////////////////////////////////////
    ///////////////////    CUSTOMERS-REVENUE-CHART    ////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


});





Template.company_profile.helpers({


    activities_list: function(){
        var game = Template.instance().getGame();
        if(game.companies[Meteor.user().username].company_activities){
            return game.companies[Meteor.user().username].company_activities.slice(game.companies[Meteor.user().username].company_activities.length-10).sort(function(a, b){return b.start_time - a.start_time});
        }
    },

    company_name: function(){
        var game = Template.instance().getGame();
        return game.companies[Meteor.user().username].company_name;
    },


    company_level: function(){
        var game = Template.instance().getGame();
        return game.companies[Meteor.user().username].company_level;
    },


    company_region: function(){
        var game = Template.instance().getGame();
        return game.companies[Meteor.user().username].company_region;
    },

    number_of_departments: function(){
        var game = Template.instance().getGame();
        if(game.companies[Meteor.user().username].company_team){
            return game.companies[Meteor.user().username].company_team.length;
        }else{
            return 0;
        }
    },

    number_of_employees: function(){
        var game = Template.instance().getGame();
        var count = 0;
        if(game.companies[Meteor.user().username].company_team){
            game.companies[Meteor.user().username].company_team.forEach(function (employee) {
                count += employee.employee_number;
            });
        }
        return count;
    },

    company_product: function(){
        var game = Template.instance().getGame();
        var company = game.companies[Meteor.user().username];
        var company_product = null;
        game.products.forEach(function (product) {
            if(product.product_creator == company.company_name){
                company_product = product;
            }
        });


        if (company_product){
            return company_product.product_name;
        }else{
            return "No product yet";
        }
        
    },

    username: function(){
        var game = Template.instance().getGame();
        return game.companies[Meteor.user().username].owner;
    },


    users_in_period(){
        var game = Template.instance().getGame();
        return game.companies[Meteor.user().username].getUsers(game);
    },


    revenue_in_period(){
        var game = Template.instance().getGame();
        return game.companies[Meteor.user().username].getRevenue(game);
    },

    balance_in_period(){
        var game = Template.instance().getGame();
        return parseFloat(game.companies[Meteor.user().username].company_balance.toFixed(2));
    },

    costs_in_period(){
        var game = Template.instance().getGame();
        return game.companies[Meteor.user().username].getCosts(game);
    },

    users_in_period_ratio(){
        var game = Template.instance().getGame();
        var company = game.companies[Meteor.user().username];
        var users_in_period = 0;
        if(company.company_history[company.company_history.length - 2] && company.company_history[company.company_history.length - 2].company_users != 0){
            return Math.floor(company.getUsers(game) / company.company_history[company.company_history.length - 2].company_users * 100);
        }else{
            return 0;
        }
    },

    revenue_in_period_ratio(){
        var game = Template.instance().getGame();
        var company = game.companies[Meteor.user().username];
        var total_active_revenue = 0;
        var total_revenue = 0;
        game.customers.forEach(function (customer) {
            total_revenue += customer.customer_income;
        });
        if(company.company_history[company.company_history.length - 2] && company.company_history[company.company_history.length - 2].company_revenue != 0){
            return Math.floor(company.getRevenue(game) / company.company_history[company.company_history.length - 2].company_revenue * 100);
        }else{
            return 0;
        }
    },

    balance_in_period_ratio(){
        var game = Template.instance().getGame();
        var company = game.companies[Meteor.user().username];
        if(company.company_history[company.company_history.length - 2] && company.company_history[company.company_history.length - 2].company_balance != 0){
            return Math.floor(company.company_balance / company.company_history[company.company_history.length - 2].company_balance * 100);
        }else{
            return 0;
        }
    },

    costs_in_period_ratio(){
        var game = Template.instance().getGame();
        var company = game.companies[Meteor.user().username];
        var costs = game.companies[Meteor.user().username].getCosts(game);
        if(company.company_history[company.company_history.length - 2] && company.company_history[company.company_history.length - 2].company_costs != 0){
            return Math.floor(costs / company.company_history[company.company_history.length - 2].company_costs * 100);
        }else{
            return 0;
        }
    },


});




Template.company_profile.events({

    "click #delete_company": function(event){
        event.preventDefault();

        var game = Template.instance().getGame();
        delete game.companies[Meteor.user().username];

        Meteor.call('updateGame', game);

    },

});



Template.company_profile.onDestroyed(function(){
    var self = this;
    self.c.stop();
});
