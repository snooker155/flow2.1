Template.game_company.helpers({
    company(){
        return Companies.findOne({owner: Meteor.user().username});
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
                        barWidth: 0.5,
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
                    max: 50000,
                    color: "#d5d5d5",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Arial',
                    axisLabelPadding: 3
                }, {
                    position: "right",
                    max: 3500,
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


Template.company_profile.onCreated(function() {
    var self = this;
    Tracker.autorun(function (c) {
        //console.log("Now i am here");
        self.c = c;
        var company_subscription = self.subscribe("companies");
        if(company_subscription.ready()){
            console.log('Loaded');
            self.company = Companies.findOne({owner: Meteor.user().username});
            //console.log(self.company);
        }else{
            console.log('Loading...');
        }
    });

    self.getCompany = function(){
        return self.company;
    }
});



Template.company_profile.onRendered(function() {
    var self = this;
    var company = Template.instance().company;
    console.log(company);
    var data1 = [];
    var data2 = [];
    if(company){
        company.company_history.forEach(function (company_history) {
            data1.push([Math.floor(company_history.time_period), company_history.company_balance]);
            data2.push([Math.floor(company_history.time_period), company_history.company_revenue]);
        });
        for(var i = data1.length; i < 20; i++){
            data1.push([i, 0]);
        }
        drawPlotGraph(data1, data2);
    }
});








Template.company_profile.helpers({

    activities_list: function(){
        var company = Template.instance().company;
        if(company.company_activities){
            return company.company_activities.slice(company.company_activities.length-10).sort(function(a, b){return b.start_time - a.start_time});
        }
    },

    company_name: function(){
        return Template.instance().company.company_name;
    },


    company_level: function(){
         return Template.instance().company.company_level;
    },


    company_region: function(){
        return Template.instance().company.company_region;
    },

    number_of_departments: function(){
        var company = Template.instance().company;
        if(company.company_team){
            return company.company_team.length;
        }else{
            return 0;
        }
    },

    number_of_employees: function(){
        var company = Template.instance().company;
        var count = 0;
        if(company.company_team){
            company.company_team.forEach(function (employee) {
                count += employee.employee_number;
            });
        }
        return count;
    },

    company_product: function(){
        var company = Template.instance().company;
        if (company.company_product){
            return company_product.product_name;
        }else{
            return "No product yet";
        }
        
    },

    username: function(){
        return Template.instance().company.owner;
    },


    users_in_period(){
        return Template.instance().company.getUsers();
    },


    revenue_in_period(){
        return parseFloat(Template.instance().company.getRevenue().toFixed(2));
    },

    balance_in_period(){
        return parseFloat(Template.instance().company.company_balance.toFixed(2));
    },

    costs_in_period(){
        return parseFloat(Template.instance().company.getCosts().toFixed(2));
    },

    users_in_period_ratio(){
        var company = Template.instance().company;
        var users_in_period = 0;
        if(company.company_history[company.company_history.length - 2] && company.company_history[company.company_history.length - 2].company_users != 0){
            return Math.floor(company.getUsers() / company.company_history[company.company_history.length - 2].company_users * 100);
        }else{
            return 0;
        }
    },

    revenue_in_period_ratio(){
        var company = Template.instance().company;
        if(company.company_history[company.company_history.length - 2] && company.company_history[company.company_history.length - 2].company_revenue != 0){
            return Math.floor(company.getRevenue() / company.company_history[company.company_history.length - 2].company_revenue * 100);
        }else{
            return 0;
        }
    },

    balance_in_period_ratio(){
        var company = Template.instance().company;
        if(company.company_history[company.company_history.length - 2] && company.company_history[company.company_history.length - 2].company_balance != 0){
            return Math.floor(company.company_balance / company.company_history[company.company_history.length - 2].company_balance * 100);
        }else{
            return 0;
        }
    },

    costs_in_period_ratio(){
        var company = Template.instance().company;
        var costs = company.getCosts();
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

        var company = Template.instance().company;

        Meteor.call('deleteCompany', company);

    },

});


Template.game_company.onDestroyed(function(){
    var self = this;
    self.c.stop();
});

