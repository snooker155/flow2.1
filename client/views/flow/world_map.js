
var selected_region = new ReactiveVar(null);


function getGradientData(game, region_id){
	var products = [];
	var inactive_count = 0;
	var notselected_count = 0;
	var region_customer_number = game.getRegionCustomerNumber(region_id);
	var increment = 0;
	game.products.forEach(function (product) {
	  	var count = 0;
		game.customers.forEach(function (customer) {
			if(customer.customer_product && customer.customer_activity == 1 && customer.customer_product._id == product._id){
				if(customer.customer_region == region_id){
					count++;
				}
			}
		});
		
		if(count > 0){
			increment += parseFloat((count / region_customer_number * 100).toFixed(2));
			products.push({
				color: product.product_color,
				offset: increment + "%",
			});
		}
	});

	game.customers.forEach(function (customer) {
		if(customer.customer_activity == 0){
			if(customer.customer_region == region_id){
				inactive_count++;
			}
		}else if(customer.customer_activity == 1 && !customer.customer_product){
			if(customer.customer_region == region_id){
				notselected_count++;
			}
		}
	});

	if(inactive_count > 0){
		increment += parseFloat((inactive_count / region_customer_number * 100).toFixed(2));
		products.push({
			color: "red",
			offset: increment + "%",
		});
	}

	if(notselected_count > 0){
		increment += parseFloat((notselected_count / region_customer_number * 100).toFixed(2));
		products.push({
			color: "#fff",
			offset: increment + "%",
		});
	}



	// var max_product = _.max(products, function(product){return product.customer_number});

	// //console.log(max_product);

	// if(max_product.product == "Inactive"){
	//     set.color = "red";
	// }else if(max_product.product == "Notselected"){
	//     set.color = "#fff";
	// }else{
	//     set.color = max_product.product.product_color;		
	// }
	//console.log(products);
	

	return products;
};


Template.world_map.onCreated(function() {
    var self = this;
    self.subscribe("games", function(){
    	Tracker.autorun(function () {

    	});
    });
});


Template.world_map.onRendered(function(){

	selected_region.set(null);

	var game = Games.findOne({});

	d3.select(window).on("resize", resize);

    var width = document.querySelector('#map').offsetWidth;
    var mapRatio = 0.7;
    var height = width * mapRatio;
    var active;

    var projection = d3.geo.mercator().scale(width / 2 / Math.PI)
            .rotate([-11, 0])
            .translate([(width) / 2, height * 1.35 / 2])
            .precision(.1);

    var path = d3.geo.path().projection(projection);

    var svg = d3.select("#map")
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin")
            .attr("width", width)
            .attr("height", height)
            .append("g");

    svg.append("rect")
    	.attr("id", "map_rect")
	    .attr("width", width)
	    .attr("height", height)
	    .on("click", reset);


    var sets = [
        {
        	id: 'CE',
            name: 'Central Europe',
            set: d3.set(['BEL', 'CHE', 'DEU', 'AUT', 'ESP', 'FRA', 'ATF', 'GBR', 'GGY', 'JEY', 'FLK', 'SGS', 'GRC', 'MLT', 'IRL', 'ITA', 'LUX', 'NLD', 'AND', 'POL', 'PRT', 'TUR', 'CYP', 'CYN', 'MON', 'ALD', 'IMN', 'LTU', 'LVA', 'EST', 'BLR', 'UKR', 'MDA', 'ROU', 'HUN', 'SVK', 'SVN', 'HRV', 'BIH', 'CZE', 'BGR', 'KOS', 'MKD', 'ALB', 'MNE', 'SRB']),
        },
        {
        	id: 'NE',
            name: 'Northern Europe',
            set: d3.set(['DNK', 'FRO', 'FIN', 'GRL', 'ISL', 'NOR', 'SWE'])
        },
        {
        	id: 'NA',
            name: 'North America',
            set: d3.set(['CAN', 'MEX', 'USA'])
        },
        {
        	id: 'CA',
            name: 'Caribbean',
            set: d3.set(['BLZ', 'CRI', 'CUB', 'GTM', 'HND', 'NIC', 'PAN', 'SLV', 'HTI', 'JAM', 'DOM', 'PRI', 'BHS', 'TCA', 'ATG', 'DMA', 'BRB', 'GRD'])
        },
        {
        	id: 'SA',
            name: 'South America',
            set: d3.set(['ARG', 'BOL', 'BRA', 'CHL', 'COL', 'ECU', 'FLK', 'GUY', 'PRY', 'PER', 'SUR', 'URY', 'VEN', 'TTO'])
        },
        {
        	id: 'AF',
            name: 'Africa',
            set: d3.set(['AGO', 'BDI', 'BEN', 'BFA', 'BWA', 'CAF', 'CIV', 'CMR', 'COD', 'COD', 'COG', 'COM', 'CPV', 'DJI', 'DZA', 'EGY', 'ERI', 'ETH', 'GAB', 'GHA', 'GIN', 'GMB', 'GNB', 'GNQ', 'KEN', 'LBR', 'LBY', 'LSO', 'MAR', 'MDG', 'MLI', 'MOZ', 'MRT', 'MUS', 'MWI', 'MYT', 'NAM', 'NER', 'NGA', 'REU', 'RWA', 'ESH', 'SDN', 'SDS', 'SEN', 'SHN', 'SHN', 'SLE', 'SOM', 'SOL', 'SSD', 'STP', 'STP', 'SWZ', 'SYC', 'TCD', 'TGO', 'TUN', 'TZA', 'TZA', 'UGA', 'ZAF', 'ZMB', 'ZWE'])
        },
        {
        	id: 'SP',
            name: 'South Pacific',
            set: d3.set(['AUS', 'NZL'])
        },
        {
        	id: 'IN',
            name: 'India',
            set: d3.set(['IND', 'BGD', 'LKA'])
        },
        {
        	id: 'OR',
            name: 'Orient',
            set: d3.set(['AZE', 'ARE', 'QAT', 'IRN', 'AFG', 'PAK', 'BHR', 'SAU', 'YEM', 'OMN', 'SYR', 'JOR', 'IRQ', 'KWT', 'ISR', 'LBN', 'PSX', 'PSR', 'GEO', 'ARM'])
        },
        {
        	id: 'RU',
            name: 'Russia',
            set: d3.set(['RUS', 'KAZ', 'UZB', 'TKM', 'KGZ', 'TJK'])
        },
        {
        	id: 'AS',
            name: 'Asia',
            set: d3.set(['BTN', 'CHN', 'JPN', 'IDN', 'MNG', 'NPL', 'MMR', 'THA', 'KHM', 'LAO', 'VNM', 'PRK', 'KOR', 'TWN', 'MYS', 'PNG', 'SLB', 'VUT', 'NCL', 'BRN', 'PHL', 'TLS', 'HKG', 'FJI', 'GUM', 'PLW', 'FSM', 'MNP', 'KAS'])
        }
    ];

    Tracker.autorun(function () {
    	var game = Games.findOne({});

	    sets.forEach(function (set) {

			var linearGradients = svg.selectAll("linearGradient");
			//console.log(linearGradients);
			linearGradients[0].forEach(function (linearGradient) {
				//console.log(linearGradient);
				//console.log(d3.select(linearGradient).selectAll("stop"));
				if(linearGradient.id == "gradient_"+set.id){
					//console.log(d3.select(linearGradient))
					$(linearGradient)[0].innerHTML = "";
					d3.select(linearGradient).selectAll("stop")
				      .data(getGradientData(game, set.id))
				    .enter().append("stop")
				     // .transition().duration(200)
				      .attr("offset", function(d) { return d.offset; })
				      .attr("stop-color", function(d) { return d.color; });
				}
			});

			var paths = svg.selectAll("path");
			paths[0].forEach(function (path) {
				if(path.data_id == set.id){
					d3.select(path).attr("fill", "url(#gradient_"+set.id+")");
				}
			});
		});

    });

 

    function click(d){
    	selected_region.set(d3.select(this).attr('data_id'));
    }


    function dblclick(d) {
	  if (active === d) return reset();
	  svg.selectAll(".active").classed("active", false);
	  d3.select(this).classed("active", active = d);

	  var b = path.bounds(d);
	  svg.transition().duration(750).attr("transform",
	      "translate(" + projection.translate() + ")"
	      + "scale(" + .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height) + ")"
	      + "translate(" + -(b[1][0] + b[0][0]) / 2 + "," + -(b[1][1] + b[0][1]) / 2 + ")");
	}

	function reset() {
	  selected_region.set(null);
	  svg.selectAll(".active").classed("active", active = false);
	  svg.transition().duration(750).attr("transform", "");
	}


    d3.json("countries.json", function (error, w) {
        if (error) throw error;

        // svg.append("path").datum(topojson.merge(w, w.objects.units.geometries.filter(function (d) {
        //             return d.id !== 'ATA'; // Sorry Antarctica
        //         })))
        //         //.attr("class", "border")
        //         .attr("d", path);


		// var gradient = svg.append("defs")
		// 	  .append("linearGradient")
		// 	    .attr("id", "gradient")
		// 	    .attr("x1", "0%")
		// 	    .attr("y1", "0%")
		// 	    .attr("x2", "100%")
		// 	    .attr("y2", "100%")
		// 	    .attr("spreadMethod", "pad");

		// gradient.append("stop")
		//     .attr("offset", "0%")
		//     .attr("stop-color", "#0c0")
		//     .attr("stop-opacity", 1);

		// gradient.append("stop")
		//     .attr("offset", "100%")
		//     .attr("stop-color", "#c00")
		//     .attr("stop-opacity", 1);


		// svg.append("defs").append("linearGradient")
		//       .attr("id", "gradient")
		//       .attr("x1", "0")
		// 	  .attr("y1", "0")
		// 	  .attr("x2", "0")
		// 	  .attr("y2", "1")
		//       .attr("spreadMethod", "pad")
		//     .selectAll("stop")
		//       .data([
		//         {offset: "0%", color: "steelblue"},
		//         {offset: "50%", color: "gray"},
		//         {offset: "100%", color: "red"}
		//       ])
		//     .enter().append("stop")
		//       .attr("offset", function(d) { return d.offset; })
		//       .attr("stop-color", function(d) { return d.color; });

		var defs = svg.append("defs");

        for (var i = 0; i < sets.length; i++) {
            svg.append("svg:g").datum(topojson.merge(w, w.objects.units.geometries.filter(function (d) {
                        return sets[i].set.has(d.id);
                    })))
            	.attr("id", sets[i].id)
            .append("path")
            	.attr('class', "regions selected")
                .attr("d", path)
               	.on("click", click)
                .on("dblclick", dblclick)
                .attr({'data-name': sets[i].name})
                .attr({'data_id': sets[i].id})
                //.attr("fill", sets[i].color)
                .attr("fill", "url(#gradient_"+sets[i].id+")")
                .on('mouseover', function () {
                    var region = d3.select(this);
                    //document.querySelector('.legend').innerText = region.attr('data-name');
                }).on('mouseout', function () {
                    //document.querySelector('.legend').innerText = '';
        		});

        	defs.append("linearGradient")
		      .attr("id", function(d){return "gradient_"+sets[i].id;})
		      .attr("x1", "0")
			  .attr("y1", "0")
			  .attr("x2", "0")
			  .attr("y2", "1")
		      .attr("spreadMethod", "pad")
		      //.attr("gradientUnits", "userSpaceOnUse")
		    .selectAll("stop")
		      .data(getGradientData(game, sets[i].id))
		    .enter().append("stop")
		      .attr("offset", function(d) { return d.offset; })
		      .attr("stop-color", function(d) { return d.color; });

        }




    });


    function resize() {
        // adjust things when the window size changes
        width = document.querySelector('#map').offsetWidth;
        // width = width - margin.left - margin.right;
        height = width * mapRatio;

        // update projection
        projection.scale(width / 2 / Math.PI)
                .translate([(width) / 2, height * 1.35 / 2])
                .precision(.1);
        // resize the map container
        document.querySelector('svg').setAttribute('width', width);
        document.querySelector('svg').setAttribute('height', height);

        // resize the map
        svg.selectAll('.regions, .border').attr('d', path);
    }



});




Template.world_map.helpers({

	selected_region(){
		var game = Games.findOne({});
		if(selected_region.get()){
			return game.regions[selected_region.get()];
		}else{
			var world_people_number = 0,
				world_pref = 0,
				world_region_market = 0,
				world_region_demand = 0,
				world_base_income_rate = 0,
				//world_base_price_rate = 0,
				world_level_of_conservatism = 0,
				world_region_trend;

			var number_of_regions = Regions.find({}).count();

			for (var region in game.regions){
				world_people_number += game.regions[region].region_people_number;
				world_pref += game.regions[region].region_pref;
				world_region_market += game.regions[region].region_market;
				world_region_demand += game.regions[region].region_demand;
				world_base_income_rate += game.regions[region].base_income_rate;
				//world_base_price_rate += game.regions[region].base_price_rate;
				world_level_of_conservatism += game.regions[region].level_of_conservatism;
			};

			if(world_region_demand - world_region_market < 0){
				world_region_trend = "Negative";
			}else if(world_region_demand - world_region_market < 0.5){
				world_region_trend = "Low";
			}else if(world_region_demand - world_region_market < 1){
				world_region_trend = "Medium";
			}else if (world_region_demand - world_region_market > 1) {
				world_region_trend = "High";
			}
			
			return world = {
				region_name: "World",
				region_pref: parseFloat((world_pref / number_of_regions).toFixed(2)),
				region_trend: world_region_trend,
				region_people_number: world_people_number,
				region_market: world_region_market,
				region_demand: world_region_demand,
				base_income_rate: parseFloat((world_base_income_rate / number_of_regions).toFixed(2)),
				//base_price_rate: parseFloat((world_base_price_rate / number_of_regions).toFixed(2)),
				level_of_conservatism: parseFloat((world_level_of_conservatism / number_of_regions).toFixed(3)),
			};
		}
	},


	products(){
		return Games.findOne({}).products;
	},

	product_customers(){
		var self = this;
		var customers = Games.findOne({}).customers;
		var count = 0;
		customers.forEach(function (customer) {
			if(customer.customer_product && customer.customer_activity == 1 && customer.customer_product._id == self._id){
				if(selected_region.get()){
					if(customer.customer_region == selected_region.get()){
						count++;
					}
				}else{
					count++
				}
			}
		});
		return count;
	},

	product_income(){
		var self = this;
		var customers = Games.findOne({}).customers;
		var count = 0;
		customers.forEach(function (customer) {
			if(customer.customer_product && customer.customer_activity == 1 && customer.customer_product._id == self._id){
				if(selected_region.get()){
					if(customer.customer_region == selected_region.get()){
						count++;	
					}
				}else{
					count++;
				}
			}
		});
		return count * self.product_price;
	},

	avg_income(){
		var total_income = 0;
		var total_customers = 0;
		var customers = Games.findOne({}).customers;
		customers.forEach(function (customer) {
			if(selected_region.get()){
				if(customer.customer_region == selected_region.get()){
					total_income += customer.customer_income;
					total_customers++;
				}
			}else{
				total_income += customer.customer_income;
				total_customers++;
			}
		});
		return parseFloat((total_income / total_customers).toFixed(2));
	},

	active_people_number(){
		var total_active = 0;
		var customers = Games.findOne({}).customers;
		customers.forEach(function (customer) {
			if(selected_region.get()){
				if(customer.customer_region == selected_region.get()){
					if(customer.customer_activity == 1){
						total_active++;
					}
				}
			}else{
				if(customer.customer_activity == 1){
					total_active++;
				}
			}
		});
		return total_active;
	},

	total_people_number(){
		if(selected_region.get()){
			var count = 0;
			Games.findOne({}).customers.forEach(function (customer) {
				if(customer.customer_region == selected_region.get()){
					count++;
				}
			});
			return count;
		}else{
			return Games.findOne({}).customers.length;
		}
	},

	people(){
		var count_rich = 0, count_middle = 0, count_poor = 0;
		var avg_income_rich = 0, avg_income_middle = 0, avg_income_poor = 0;
		var count_active_rich = 0, count_active_middle = 0, count_active_poor = 0;
		var game = Games.findOne({});
		game.customers.forEach(function (customer) {
			if(customer.getIncomeGroup(game) == "rich"){
				if(selected_region.get()){
					if(customer.customer_region == selected_region.get()){
						count_rich++;
						avg_income_rich += customer.customer_income;
						if(customer.customer_activity == 1){
							count_active_rich++;
						}
					}
				}else{
					count_rich++;
					avg_income_rich += customer.customer_income;
					if(customer.customer_activity == 1){
						count_active_rich++;
					}
				}
			}else if(customer.getIncomeGroup(game) == "middle"){
				if(selected_region.get()){
					if(customer.customer_region == selected_region.get()){
						count_middle++;
						avg_income_middle += customer.customer_income;
						if(customer.customer_activity == 1){
							count_active_middle++;
						}
					}
				}else{
					count_middle++;
					avg_income_middle += customer.customer_income;
					if(customer.customer_activity == 1){
						count_active_middle++;
					}
				}
			}else if(customer.getIncomeGroup(game) == "poor"){
				if(selected_region.get()){
					if(customer.customer_region == selected_region.get()){
						count_poor++;
						avg_income_poor += customer.customer_income;
						if(customer.customer_activity == 1){
							count_active_poor++;
						}
					}
				}else{
					count_poor++;
					avg_income_poor += customer.customer_income;
					if(customer.customer_activity == 1){
						count_active_poor++;
					}
				}
			}
		});


		var people = [{
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
		}]
		return people;
	},

	prop_pop(){
		var game = Games.findOne({});
		var count_prop_1 = 0, count_prop_2 = 0, count_prop_3 = 0;
		var count_prop_1_needed_1 = 0,
			count_prop_1_needed_2 = 0,
			count_prop_1_needed_3 = 0,
			count_prop_2_needed_1 = 0,
			count_prop_2_needed_2 = 0,
			count_prop_2_needed_3 = 0,
			count_prop_3_needed_1 = 0,
			count_prop_3_needed_2 = 0,
			count_prop_3_needed_3 = 0;
		var customers_count = 0;
		var i = 1;
		if(selected_region.get()){
			game.customers.forEach(function (customer) {
				if(customer.customer_region == selected_region.get()){
					i = 1;
					customer.needed.forEach(function (need) {
						count_prop_1 += need.prop["prop_1"];
						count_prop_2 += need.prop["prop_2"];
						count_prop_3 += need.prop["prop_3"];
						if(i == 1){
							count_prop_1_needed_1 += need.prop["prop_1"];
							count_prop_2_needed_1 += need.prop["prop_2"];
							count_prop_3_needed_1 += need.prop["prop_3"];
						}else if(i == 2){
							count_prop_1_needed_2 += need.prop["prop_1"];
							count_prop_2_needed_2 += need.prop["prop_2"];
							count_prop_3_needed_2 += need.prop["prop_3"];
						}else if(i == 3){
							count_prop_1_needed_3 += need.prop["prop_1"];
							count_prop_2_needed_3 += need.prop["prop_2"];
							count_prop_3_needed_3 += need.prop["prop_3"];
						}
						i++;
					});
					customers_count++;
				}
			});
		}else{
			game.customers.forEach(function (customer) {
				i = 1;
				customer.needed.forEach(function (need) {
					count_prop_1 += need.prop["prop_1"];
					count_prop_2 += need.prop["prop_2"];
					count_prop_3 += need.prop["prop_3"];
					if(i == 1){
						count_prop_1_needed_1 += need.prop["prop_1"];
						count_prop_2_needed_1 += need.prop["prop_2"];
						count_prop_3_needed_1 += need.prop["prop_3"];
					}else if(i == 2){
						count_prop_1_needed_2 += need.prop["prop_1"];
						count_prop_2_needed_2 += need.prop["prop_2"];
						count_prop_3_needed_2 += need.prop["prop_3"];
					}else if(i == 3){
						count_prop_1_needed_3 += need.prop["prop_1"];
						count_prop_2_needed_3 += need.prop["prop_2"];
						count_prop_3_needed_3 += need.prop["prop_3"];
					}
					i++;
				});
				customers_count++;
			});
		}
		var prop = [{
			prop_name: "prop_1",
			prop_count: parseFloat((count_prop_1 / customers_count).toFixed(2)),
			prop_needed_1: parseFloat((count_prop_1_needed_1 / customers_count).toFixed(2)),
			prop_needed_2: parseFloat((count_prop_1_needed_2 / customers_count).toFixed(2)),
			prop_needed_3: parseFloat((count_prop_1_needed_3 / customers_count).toFixed(2)),
		},{
			prop_name: "prop_2",
			prop_count: parseFloat((count_prop_2 / customers_count).toFixed(2)),
			prop_needed_1: parseFloat((count_prop_2_needed_1 / customers_count).toFixed(2)),
			prop_needed_2: parseFloat((count_prop_2_needed_2 / customers_count).toFixed(2)),
			prop_needed_3: parseFloat((count_prop_2_needed_3 / customers_count).toFixed(2)),
		},{
			prop_name: "prop_3",
			prop_count: parseFloat((count_prop_3 / customers_count).toFixed(2)),
			prop_needed_1: parseFloat((count_prop_3_needed_1 / customers_count).toFixed(2)),
			prop_needed_2: parseFloat((count_prop_3_needed_2 / customers_count).toFixed(2)),
			prop_needed_3: parseFloat((count_prop_3_needed_3 / customers_count).toFixed(2)),
		}];
		return prop;
	},


	////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////

	// has_region: function(){
	// 	var game = Games.findOne({});
	// 	return game.players[Meteor.user().username].regions!==undefined ? true:false;
	// },

	// in_region: function(){
	// 	if(selected_region.get()){
	// 		var game = Games.findOne({});
	// 		return game.players[Meteor.user().username].regions[selected_region.get()]!==undefined ? true:false;
	// 	}else{
	// 		return true;
	// 	}
	// },

	// branch_price: function(){
	// 	return Regions.findOne({region_name: selected_region.get()}).region_price;
	// },

	// regions: function(){
	// 	return Regions.find();
	// },

	// selected_region: function(){
	// 	return selected_region.get();
	// },


	// waiting_region_conservatism: function(){
	// 	var game = Games.findOne({});
	// 	if(selected_region.get()){
	// 		return parseFloat((game.regions[selected_region.get()].level_of_conservatism).toFixed(2));
	// 	}else{
	// 		var level_of_conservatism = 0;
	// 		for (var region in game.regions){
	// 			level_of_conservatism += game.regions[region].level_of_conservatism;
	// 		}
	// 		return parseFloat((level_of_conservatism / 6).toFixed(2));
	// 	}
	// },


	// waiting_region_free_people: function(){
	// 	var game = Games.findOne({});
	// 	if(selected_region.get()){
	// 		var engaged_people = 0;
	// 		for (var player in game.players){
	// 			if(game.players[player].regions !== undefined && game.players[player].regions[selected_region.get()] !== undefined)
	// 			engaged_people += game.players[player].regions[selected_region.get()].people;
	// 		}
	// 		return Math.round(game.regions[selected_region.get()].region_people - engaged_people);
	// 	}else{
	// 		return Math.round(game.getTotalPeople() - game.getCustomersNumber());
	// 	}
	// },


	// waiting_region_price: function(){
	// 	var game = Games.findOne({});
	// 	if(selected_region.get()){
	// 		return parseFloat((game.regions[selected_region.get()].base_price_rate).toFixed(2));
	// 	}else{
	// 		var base_price_rate = 0;
	// 		for (var region in game.regions){
	// 			base_price_rate += game.regions[region].base_price_rate;
	// 		}
	// 		return parseFloat((base_price_rate).toFixed(2));
	// 	}
	// },


	// waiting_region_profit: function(){
	// 	var game = Games.findOne({});
	// 	if(selected_region.get()){
	// 		return parseFloat((game.regions[selected_region.get()].base_profit_rate).toFixed(2));
	// 	}else{
	// 		var base_profit_rate = 0;
	// 		for (var region in game.regions){
	// 			base_profit_rate += game.regions[region].base_profit_rate;
	// 		}
	// 		return parseFloat((base_profit_rate).toFixed(2));
	// 	}
	// },


	// waiting_region_name: function(){
	// 	var game = Games.findOne({});
	// 	if(selected_region.get()){
	// 		return game.regions[selected_region.get()].region_name;
	// 	}else{
	// 		return "World";
	// 	}
	// },

	// waiting_region_people: function(){
	// 	var game = Games.findOne({});
	// 	if(selected_region.get()){
	// 		return Math.round(game.regions[selected_region.get()].region_people);
	// 	}else{
	// 		var total_people = 0;
	// 		for (var region in game.regions){
	// 			total_people += game.regions[region].region_people;
	// 		}
	// 		return Math.round(total_people);
	// 	}
	// },

	// waiting_region_pref: function(){
	// 	var game = Games.findOne({});
	// 	if(selected_region.get()){
	// 		return game.regions[selected_region.get()].region_pref;
	// 	}else{
	// 		return "Technology";
	// 	}
	// },

	// waiting_region_trend: function(){
	// 	var game = Games.findOne({});
	// 	if(selected_region.get()){
	// 		return game.regions[selected_region.get()].region_trend;
	// 	}else{
	// 		var total_demand = 0;
	// 		for (var region in game.regions){
	// 			total_demand += game.regions[region].region_demand;
	// 		}
	// 		var total_market = 0;
	// 		for (var region in game.regions){
	// 			total_market += game.regions[region].region_market;
	// 		}
	// 		if(total_demand - total_market < 0){
	// 			return "Negative";
	// 		}else if(total_demand - total_market < 0.5){
	// 			return "Low";
	// 		}else if(total_demand - total_market < 1){
	// 			return "Medium";
	// 		}else if (total_demand - total_market > 1) {
	// 			return "High";
	// 		}
	// 	}
	// },

	// waiting_region_demand: function(){
	// 	var game = Games.findOne({});
	// 	if(selected_region.get()){
	// 		return parseFloat((game.regions[selected_region.get()].region_demand).toFixed(2));
	// 	}else{
	// 		var total_demand = 0;
	// 		for (var region in game.regions){
	// 			total_demand += game.regions[region].region_demand;
	// 		}
	// 		return parseFloat((total_demand/6).toFixed(2));
	// 	}
	// },

	// waiting_region_market: function(){
	// 	var game = Games.findOne({});
	// 	if(selected_region.get()){
	// 		return parseFloat((game.regions[selected_region.get()].region_market).toFixed(2));
	// 	}else{
	// 		var total_market = 0;
	// 		for (var region in game.regions){
	// 			total_market += game.regions[region].region_market;
	// 		}
	// 		return parseFloat((total_market/6).toFixed(2));
	// 	}
	// },

	// demand_type: function(){
	// 	var game = Games.findOne({});
	// 	if(selected_region.get()){
	// 		return game.regions[selected_region.get()].region_demand > 0 ? 'navy' : 'danger';
	// 	}else{
	// 		var total_demand = 0;
	// 		for (var region in game.regions){
	// 			total_demand += game.regions[region].region_demand;
	// 		}
	// 		return total_demand > 0 ? 'navy' : 'danger';
	// 	}
	// },

	// arrow_demand_type: function(){
	// 	var game = Games.findOne({});
	// 	if(selected_region.get()){
	// 		return game.regions[selected_region.get()].region_demand > 0 ? 'up' : 'down';
	// 	}else{
	// 		var total_demand = 0;
	// 		for (var region in game.regions){
	// 			total_demand += game.regions[region].region_demand;
	// 		}
	// 		return total_demand > 0 ? 'up' : 'down';
	// 	}
	// },

	// market_type: function(){
	// 	var game = Games.findOne({});
	// 	if(selected_region.get()){
	// 		return game.regions[selected_region.get()].region_market > 0 ? 'navy' : 'danger';
	// 	}else{
	// 		var total_market = 0;
	// 		for (var region in game.regions){
	// 			total_market += game.regions[region].region_market;
	// 		}
	// 		return total_market > 0 ? 'navy' : 'danger';
	// 	}
	// },

	// arrow_market_type: function(){
	// 	var game = Games.findOne({});
	// 	if(selected_region.get()){
	// 		return game.regions[selected_region.get()].region_market > 0 ? 'up' : 'down';
	// 	}else{
	// 		var total_market = 0;
	// 		for (var region in game.regions){
	// 			total_market +=  game.regions[region].region_market;
	// 		}
	// 		return total_market > 0 ? 'up' : 'down';
	// 	}
	// },

	// trend_type: function(){
	// 	var game = Games.findOne({});
	// 	if(selected_region.get()){
	// 		switch(game.regions[selected_region.get()].region_trend){
	// 			case "Negative":
	// 				return "danger";
	// 				break;
	// 			case "Low":
	// 				return "danger";
	// 				break;
	// 			case "Medium":
	// 				return "warning";
	// 				break;
	// 			case "High":
	// 				return "primary";
	// 				break;
	// 		}
	// 	}else{
	// 		var world_trend;
	// 		var total_demand = 0;
	// 		for (var region in game.regions){
	// 			total_demand += game.regions[region].region_demand;
	// 		}
	// 		var total_market = 0;
	// 		for (var region in game.regions){
	// 			total_market += game.regions[region].region_market;
	// 		}
	// 		if(total_demand - total_market < 0){
	// 			world_trend = "Negative";
	// 		}else if(total_demand - total_market < 0.5){
	// 			world_trend = "Low";
	// 		}else if(total_demand - total_market < 1){
	// 			world_trend = "Medium";
	// 		}else if (total_demand - total_market > 1) {
	// 			world_trend = "High";
	// 		}
	// 		switch(world_trend){
	// 			case "Negative":
	// 				return "danger";
	// 				break;
	// 			case "Low":
	// 				return "danger";
	// 				break;
	// 			case "Medium":
	// 				return "warning";
	// 				break;
	// 			case "High":
	// 				return "primary";
	// 				break;
	// 		}
	// 	}
	// },


	// player_name: function(){
	// 	return Games.findOne({}).players[Meteor.user().username].player.username;
	// },


	// player_balance: function(){
	// 	return parseFloat((Games.findOne({}).players[Meteor.user().username].player_balance).toFixed(2));
	// },


 //    shares: function(){
 //    	var game = Games.findOne({});
 //        if(selected_region.get()){
 //            var shares_arr = [];
 //            for(var player in game.players){
 //            	if(game.players[player].regions !== undefined){
	//             	if(game.players[player].regions[selected_region.get()] !== undefined){
	//                 	shares_arr.push({
	//                 		player: game.players[player].player,
	//                 		player_color: game.players[player].player_color,
	//                 		player_share: game.players[player].regions[selected_region.get()].share,
	//                 	});
	//             	}
 //            	}
 //            }
 //            return shares_arr;
 //        }else{
 //            var shares_arr = [];
 //            for(var player in game.players){
	//             if(game.players[player].regions !== undefined){
	// 	            shares_arr.push(game.players[player]);
	//         	}
 //        	}
 //            return shares_arr;
 //        }
 //    },


 //    selected_region_name: function(){
 //        if(selected_region.get()){
 //            return selected_region.get();
 //        }else{
 //            return "World";
 //        }
 //    },

 //    region_share: function(){
 //    	var game = Games.findOne({});
 //        if(selected_region.get()){
 //            return Math.round(game.players[Meteor.user().username].regions[selected_region.get()].share);
 //        }else{
 //            return Math.round(game.players[Meteor.user().username].player_share);
 //        }
 //    },

 //    region_people: function(){
 //    	var game = Games.findOne({});
 //        if(selected_region.get()){
 //            return Math.round(game.players[Meteor.user().username].regions[selected_region.get()].people);
 //        }else{
	// 		var world_people = 0;
	// 		for (var region in game.players[Meteor.user().username].regions){
	// 			world_people += game.players[Meteor.user().username].regions[region].people;
	// 		}
	// 		return Math.round(world_people);
 //        }
 //    },

 //    region_profit: function(){
 //    	var game = Games.findOne({});
 //        if(selected_region.get()){
 //            return parseFloat((game.players[Meteor.user().username].regions[selected_region.get()].profit * Math.round(game.players[Meteor.user().username].regions[selected_region.get()].people)).toFixed(2));
 //        }else{
 //            var world_profit = 0;
	// 		for (var region in game.players[Meteor.user().username].regions){
	// 			world_profit += game.players[Meteor.user().username].regions[region].profit;
	// 		}
	// 		var world_people = 0;
	// 		for (var region in game.players[Meteor.user().username].regions){
	// 			world_people += game.players[Meteor.user().username].regions[region].people;
	// 		}
	// 		return parseFloat((world_profit / 6 * Math.round(world_people)).toFixed(2));
 //        }
 //    },

 //    region_price: function(){
 //    	var game = Games.findOne({});
 //        if(selected_region.get()){
 //            return Math.round(game.players[Meteor.user().username].regions[selected_region.get()].price);
 //        }else{
 //            var world_price = 0;
	// 		for (var region in game.players[Meteor.user().username].regions){
	// 			world_price += game.players[Meteor.user().username].regions[region].price;
	// 		}
	// 		return world_price;
 //        }
 //    },

 //    disabled: function(){
 //    	var game = Games.findOne({});
 //        if(selected_region.get()){
 //            return Math.round(game.players[Meteor.user().username].regions[selected_region.get()].price) > game.players[Meteor.user().username].player_balance ? "disabled":"";
 //        }else{
 //            var world_price = 0;
	// 		for (var region in game.players[Meteor.user().username].regions){
	// 			world_price += game.players[Meteor.user().username].regions[region].price;
	// 		}
	// 		return world_price > game.players[Meteor.user().username].player_balance ? "disabled":"";
 //        }
 //    },

});






Template.world_map.events({


    // 'click #buyShare': function(){
    // 	event.preventDefault();

    // 	//Meteor.call('buyShare', Session.get("game"), selected_region.get(), function (error, result) {});  #### For the full game version with Rooms
    // 	Meteor.call('buyShare', selected_region.get(), function (error, result) {});
    // },

    // 'click #buyBranch': function(){
    // 	event.preventDefault();

    // 	Meteor.call('addRegionToPlayer', selected_region.get(), function (error, result) {
    // 		if(!error){
    // 			Meteor.call('decreaseBalance', selected_region.get());
    //        	}
    // 	});	
    // },

});






Template.region.helpers({
	// demand_type: function(){
	// 	var game = Games.findOne({});
	// 	if(selected_region.get()){
	// 		return game.regions[selected_region.get()].region_demand > 0 ? 'navy' : 'danger';
	// 	}else{
	// 		var total_demand = 0;
	// 		for (var region in game.regions){
	// 			total_demand += game.regions[region].region_demand;
	// 		}
	// 		return total_demand > 0 ? 'navy' : 'danger';
	// 	}
	// },

	// arrow_demand_type: function(){
	// 	var game = Games.findOne({});
	// 	if(selected_region.get()){
	// 		return game.regions[selected_region.get()].region_demand > 0 ? 'up' : 'down';
	// 	}else{
	// 		var total_demand = 0;
	// 		for (var region in game.regions){
	// 			total_demand += game.regions[region].region_demand;
	// 		}
	// 		return total_demand > 0 ? 'up' : 'down';
	// 	}
	// },

	// market_type: function(){
	// 	var game = Games.findOne({});
	// 	if(selected_region.get()){
	// 		return game.regions[selected_region.get()].region_market > 0 ? 'navy' : 'danger';
	// 	}else{
	// 		var total_market = 0;
	// 		for (var region in game.regions){
	// 			total_market += game.regions[region].region_market;
	// 		}
	// 		return total_market > 0 ? 'navy' : 'danger';
	// 	}
	// },

	// arrow_market_type: function(){
	// 	var game = Games.findOne({});
	// 	if(selected_region.get()){
	// 		return game.regions[selected_region.get()].region_market > 0 ? 'up' : 'down';
	// 	}else{
	// 		var total_market = 0;
	// 		for (var region in game.regions){
	// 			total_market +=  game.regions[region].region_market;
	// 		}
	// 		return total_market > 0 ? 'up' : 'down';
	// 	}
	// },
});