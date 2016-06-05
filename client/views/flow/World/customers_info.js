Template.customers_info.onRendered(function(){

    var game = Games.findOne({});


    var data = (_.values(_.groupBy(game.customers, function(customer){ 
        return customer.customer_region; 
    })))
    .reduce(function(data, customers){ 
        data.push({
            name: customers[0].customer_region,
            //color: ,
            data:customers.map(function(customer){return [parseFloat(customer.customer_conservatism).toFixed(4)*1, customer.customer_period_income];})
        }); 
        return data;
    }, []);


    // a.forEach(function (customers) {
    //     console.log(customers);
    //     customers.map(function(customer){return [customer.customer_conservatism, customer.customer_money];});
    //     console.log(customers.map(function(customer){return [customer.customer_conservatism, customer.customer_money];}))
    // });

    console.log(data);

    $('#scatter_digramm').highcharts({
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Income ($) / Conservatism'
        },
        // subtitle: {
        //     text: 'Source: Heinz  2003'
        // },
        xAxis: {
            title: {
                enabled: true,
                text: 'Conservatism level'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Money ($)'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 500,
            y: 50,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x} <b>/</b> {point.y} $'
                }
            }
        },

        series: data
    });



	var doughnutData = [
        {
            value: 300,
            color: "#a3e1d4",
            highlight: "#1ab394",
            label: "App"
        },
        {
            value: 50,
            color: "#dedede",
            highlight: "#1ab394",
            label: "Software"
        },
        {
            value: 100,
            color: "#b5b8cf",
            highlight: "#1ab394",
            label: "Laptop"
        }
    ];

    var doughnutOptions = {
        segmentShowStroke: true,
        segmentStrokeColor: "#fff",
        segmentStrokeWidth: 2,
        percentageInnerCutout: 45, // This is 0 for Pie charts
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: true,
        animateScale: false,
        responsive: true,
    };


    var ctx1 = document.getElementById("pie_chart1").getContext("2d");
    var myNewChart = new Chart(ctx1).Doughnut(doughnutData, doughnutOptions);

    var ctx2 = document.getElementById("pie_chart2").getContext("2d");
    var myNewChart = new Chart(ctx2).Doughnut(doughnutData, doughnutOptions);

    var ctx3 = document.getElementById("pie_chart3").getContext("2d");
    var myNewChart = new Chart(ctx3).Doughnut(doughnutData, doughnutOptions);

    var ctx1 = document.getElementById("pie_chart4").getContext("2d");
    var myNewChart = new Chart(ctx1).Doughnut(doughnutData, doughnutOptions);

    var ctx2 = document.getElementById("pie_chart5").getContext("2d");
    var myNewChart = new Chart(ctx2).Doughnut(doughnutData, doughnutOptions);

    var ctx3 = document.getElementById("pie_chart6").getContext("2d");
    var myNewChart = new Chart(ctx3).Doughnut(doughnutData, doughnutOptions);



});







Template.customers_info.helpers({
    total_income: function () {
        var game = Games.findOne({});
        var total_income = 0;
        game.customers.forEach(function (customer) {
            total_income += customer.customer_income;
        });
        return total_income;
    },

    // total_income: function () {
    //     var game = Games.findOne({});
    //     var total_income = 0;
    //     game.customers.forEach(function (customer) {
    //         total_income += customer.customer_period_income;
    //     });
    //     return total_income;
    // },

    total_conservatism: function () {
        var game = Games.findOne({});
        var total_conservatism = 0;
        game.customers.forEach(function (customer) {
            total_conservatism += customer.customer_conservatism;
        });
        return parseFloat((total_conservatism / game.customers.length).toFixed(2)); ;
    },

    total_user_activity: function () {
        var game = Games.findOne({});
        var total_user_activity = 0;
        game.customers.forEach(function (customer) {
            total_user_activity += customer.customer_activity;
        });
        return Math.round(total_user_activity / game.customers.length * 100);
    },
});

