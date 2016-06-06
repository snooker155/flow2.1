function drawGraph(){

        var nodes = [];
        var nodes_rich = [];
        var nodes_middle = [];
        var nodes_poor = [];
        var links = [];
        var color;
        var game = Games.findOne({});
        var neighbor;
        //var i = 0;

        game.customers.forEach(function (customer) {

            //if(i <= 30){

                if(customer.customer_product && customer.customer_product.product_color){
                    color = customer.customer_product.product_color;
                }else{
                    color = "lightblue";
                }

                var datum = {
                    id: customer.customer_id,
                    income: customer.customer_income,
                    activity: customer.customer_activity,
                    color: color,
                    group: customer.getIncomeGroup(game),
                };

                if(datum.group == "rich"){
                    nodes_rich.push(datum);
                }else if(datum.group == "middle"){
                    nodes_middle.push(datum);
                }else if(datum.group == "poor"){
                    nodes_poor.push(datum);
                }

                nodes.push(datum);

                customer.customer_neighbors.forEach(function (neighbor_obj) {
                    game.customers.forEach(function(customer) {
                        if(customer.customer_id == neighbor_obj.customer_id){
                            neighbor = customer;
                        }
                    });

                    var link = {
                        source: customer.customer_id,
                        target: neighbor.customer_id,
                        weight: neighbor_obj.weight
                    };
                    links.push(link);
                });

                //i++;
            //}
        });

        console.log(nodes);
        console.log(links);


        /* Create force graph */
        var w = 1200;
        var h = 800;

        var size = nodes.length;
        nodes.forEach(function(d, i) { d.x = d.y = w / size * i});

        var svg = d3.select("#graph").append("svg")
                    .attr("width", w)
                    .attr("height", h);

        var force = d3.layout.force()
                      .nodes(nodes)
                      .links(links)
                      .linkStrength(0.2)
                      .linkDistance(70)
                      .charge(-120)
                      .size([w, h]);

        setTimeout(function() {

            var n = 600
            force.start();
            for (var i = n * n; i > 0; --i) force.tick();
            force.stop();

            svg.selectAll("line")
               .data(links)
               .enter().append("svg:line")
               .attr("class", "graph_line")
               .attr("x1", function(d) { return d.source.x; })
               .attr("y1", function(d) { return d.source.y; })
               .attr("x2", function(d) { return d.target.x; })
               .attr("y2", function(d) { return d.target.y; })
               .style("stroke", "black")
               .style("stroke-width", function(d) { return Math.sqrt(d.weight); });

            svg.append("svg:g")
               .selectAll("circle")
               .data(nodes_rich)
               .enter().append("svg:polygon")
               .attr("class", "graph_circle")
               .attr("points", function(d) { return (d.x + d.income / 2 * 1.2)+","+(d.y + d.income / 2 * 1.2)
                +" "+(d.x)+","+(d.y - d.income / 2 * 1.5)
                +" "+(d.x - d.income / 2 * 1.5)+","+(d.y + d.income / 2 * 1.2); })
               .attr("fill", function(d){ if (d.activity == 1){
                        return d.color;
                    }else{
                        return "red";
                    }
                });

            svg.append("svg:g")
               .selectAll("circle")
               .data(nodes_middle)
               .enter().append("svg:rect")
               .attr("class", "graph_circle")
               .attr("x", function(d) { return d.x - d.income * 1.2 / 2; })
               .attr("y", function(d) { return d.y - d.income * 1.2 / 2; })
               .attr("fill", function(d){ if (d.activity == 1){
                        return d.color;
                    }else{
                        return "red";
                    }
                })
               .attr("width", function(d) { return d.income*1.2; })
               .attr("height", function(d) { return d.income*1.2; });

            svg.append("svg:g")
               .selectAll("circle")
               .data(nodes_poor)
               .enter().append("svg:circle")
               .attr("class", "graph_circle")
               .attr("cx", function(d) { return d.x; })
               .attr("cy", function(d) { return d.y; })
               .attr("fill", function(d){ if (d.activity == 1){
                        return d.color;
                    }else{
                        return "red";
                    }
                })
               .attr("r", function(d) { return d.income/1.5; });

            svg.append("svg:g")
               .selectAll("text")
               .data(nodes)
               .enter().append("svg:text")
               .attr("class", "graph_text")
               .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
               .attr("text-anchor", "middle")
               .attr("y", ".3em")
               //.text(function(d) { return d.id+" ["+d.income+"]"; });
               .text(function(d) { return d.id; });

        }, 20);
}



Template.customers_info.onCreated(function() {
    var self = this;
    self.subscribe("games", function(){
        Tracker.autorun(function () {
            $("#graph").html("");
            drawGraph();
        });
        //drawGraph();
    });
});




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

    //console.log(data);

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

