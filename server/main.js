import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

  
	Games.find().fetch().forEach(function (game) {
		Games.remove(game._id);
	});


  	Regions.find().fetch().forEach(function (region) {
		Regions.remove(region._id);
	});


	Products.find().fetch().forEach(function (product) {
		Products.remove(product._id);
	});

	Departments.find().fetch().forEach(function (department) {
		Departments.remove(department._id);
	});

	Features.find().fetch().forEach(function (feature) {
		Features.remove(feature._id);
	});

	Generations.find().fetch().forEach(function (generation) {
		Generations.remove(generation._id);
	});






	///////////////////////////////////////////////////////////////////////
	///////////////    DEPARTMENTS   //////////////////////////////////////
	///////////////////////////////////////////////////////////////////////


	Departments.insert({
		department_name: "Technology",
		employee_price: 100,
		neccessary_departments: null,
	});


	Departments.insert({
		department_name: "Design",
		employee_price: 50,
		neccessary_departments: null,
	});

	Departments.insert({
		department_name: "Support",
		employee_price: 20,
		neccessary_departments: ["Technology"],
	});

	Departments.insert({
		department_name: "Marketing",
		employee_price: 150,
		neccessary_departments: ["Design"],
	});

	Departments.insert({
		department_name: "Sales",
		employee_price: 200,
		neccessary_departments: ["Support","Marketing"],
	});

	Departments.insert({
		department_name: "R&D",
		employee_price: 350,
		neccessary_departments: ["Technology","Marketing","Sales"],
	});





	///////////////////////////////////////////////////////////////////////
	////////////////     FEATURES    //////////////////////////////////////
	///////////////////////////////////////////////////////////////////////


	Features.insert({
		feature_id: 1,
		feature_name: "prop_1",
		time_to_achieve: 5,
		feature_price: 450,
		neccessary_employees_number: 4,
		neccessary_department: "Technology",
		max_feature_level: 3,
		neccessary_level: 0,
		neccessary_features_name: null,
	});

	Features.insert({
		feature_id: 2,
		feature_name: "prop_2",
		time_to_achieve: 3,
		feature_price: 350,
		neccessary_employees_number: 3,
		neccessary_department: "Design",
		max_feature_level: 3,
		neccessary_level: 0,
		neccessary_features_name: null,
	});

	Features.insert({
		feature_id: 3,
		feature_name: "prop_3",
		time_to_achieve: 2,
		feature_price: 250,
		neccessary_employees_number: 2,
		neccessary_department: "Support",
		max_feature_level: 3,
		neccessary_level: 1,
		neccessary_features_name: null,
	});

	Features.insert({
		feature_id: 4,
		feature_name: "prop_4",
		time_to_achieve: 10,
		feature_price: 350,
		neccessary_employees_number: 4,
		neccessary_department: "Technology",
		max_feature_level: 3,
		neccessary_level: 2,
		neccessary_features_name: ["prop_1"],
	});


	Features.insert({
		feature_id: 5,
		feature_name: "prop_5",
		time_to_achieve: 10,
		feature_price: 450,
		neccessary_employees_number: 4,
		neccessary_department: "Marketing",
		max_feature_level: 3,
		neccessary_level: 2,
		neccessary_features_name: null,
	});


	Features.insert({
		feature_id: 6,
		feature_name: "prop_6",
		time_to_achieve: 10,
		feature_price: 550,
		neccessary_employees_number: 4,
		neccessary_department: "Marketing",
		max_feature_level: 3,
		neccessary_level: 3,
		neccessary_features_name: ["prop_2","prop_5"],
	});


	Features.insert({
		feature_id: 7,
		feature_name: "prop_7",
		time_to_achieve: 10,
		feature_price: 650,
		neccessary_employees_number: 4,
		neccessary_department: "Sales",
		max_feature_level: 3,
		neccessary_level: 3,
		neccessary_features_name: ["prop_3"],
	});

	Features.insert({
		feature_id: 8,
		feature_name: "prop_8",
		time_to_achieve: 10,
		feature_price: 750,
		neccessary_employees_number: 4,
		neccessary_department: "Sales",
		max_feature_level: 3,
		neccessary_level: 4,
		neccessary_features_name: ["prop_3","prop_7"],
	});

	Features.insert({
		feature_id: 9,
		feature_name: "prop_9",
		time_to_achieve: 10,
		feature_price: 1500,
		neccessary_employees_number: 4,
		neccessary_department: "R&D",
		max_feature_level: 3,
		neccessary_level: 4,
		neccessary_features_name: ["prop_1","prop_4","prop_6"],
	});

	Features.insert({
		feature_id: 10,
		feature_name: "prop_10",
		time_to_achieve: 30,
		feature_price: 4500,
		neccessary_employees_number: 5,
		neccessary_department: "R&D",
		max_feature_level: 10,
		neccessary_level: 5,
		neccessary_features_name: ["prop_1","prop_4","prop_6","prop_8","prop_9"],
	});




	///////////////////////////////////////////////////////////////////////
	//////////////////  PRODUCTS  /////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////

	Products.insert({
		product_id: 0,
		product_name: "Prod 0",
		product_price: 8,
		product_color: "orange",
		//product_quality: 1 + Math.floor(Math.random() * 10),
		prop: [
			{prop_name: "prop_1", prop_level: 1},
			{prop_name: "prop_2", prop_level: 1},
			],
		product_quantity: 100,
		product_creator: "Bot",
        product_status: "Completed",
        product_regions: ["AF", "OR", "IN", "AS", "SP", "IN", "NA", "SA", "CA", "CE", "NE", "RU"],
        //product_regions: ["RU"],
        product_util: 0,
	});

	Products.insert({
		product_id: 1,
		product_name: "Prod 1",
		product_price: 12,
		product_color: "lightgreen",
		//product_quality: 1 + Math.floor(Math.random() * 10),
		prop: [
			{prop_name: "prop_1", prop_level: 1},
			{prop_name: "prop_2", prop_level: 1},
			],
		product_quantity: 75,
		product_creator: "Bot",
        product_status: "Completed",
        product_regions: ["AF", "OR", "IN", "AS", "SP", "IN", "NA", "SA", "CA", "CE", "NE", "RU"],
        //product_regions: ["RU"],
        product_util: 0,
	});

	Products.insert({
		product_id: 2,
		product_name: "Prod 2",
		product_price: 15,
		product_color: "#d5c5c8",
		//product_quality: 1 + Math.floor(Math.random() * 10),
		prop: [
			{prop_name: "prop_1", prop_level: 1},
			{prop_name: "prop_2", prop_level: 1},
			{prop_name: "prop_3", prop_level: 1},
			],
		product_quantity: 75,
		product_creator: "Bot",
        product_status: "Completed",
        product_regions: ["AF", "OR", "IN", "AS", "SP", "IN", "NA", "SA", "CA", "CE", "NE", "RU"],
        //product_regions: ["RU"],
        product_util: 0,
	});

	Products.insert({
		product_id: 3,
		product_name: "Prod " + 3,
		product_price: 12,
		product_color: "magenta",
		//product_quality: 1 + Math.floor(Math.random() * 10),
		prop: [
			{prop_name: "prop_2", prop_level: 1},
			{prop_name: "prop_3", prop_level: 2},
		],
		product_quantity: 50,
		product_creator: "Bot",
        product_status: "Completed",
        product_regions: ["AF", "OR", "IN", "AS", "SP", "IN", "NA", "SA", "CA", "CE", "NE", "RU"],
        product_util: 0,
	});


	Products.insert({
		product_id: 4,
		product_name: "Prod " + 4,
		product_price: 20,
		product_color: "pink",
		//product_quality: 1 + Math.floor(Math.random() * 10),
		prop: [
			{prop_name: "prop_1", prop_level: 2},
			{prop_name: "prop_2", prop_level: 1},
			{prop_name: "prop_3", prop_level: 2},
		],
		product_quantity: 25,
		product_creator: "Bot",
        product_status: "Completed",
        product_regions: ["AF", "OR", "IN", "AS", "SP", "IN", "NA", "SA", "CA", "CE", "NE", "RU"],
        product_util: 0,
	});

	Products.insert({
		product_id: 5,
		product_name: "Prod " + 5,
		product_price: 25,
		product_color: "#3196e5",
		//product_quality: 1 + Math.floor(Math.random() * 10),
		prop: [
			{prop_name: "prop_1", prop_level: 2},
			{prop_name: "prop_2", prop_level: 1},
			{prop_name: "prop_3", prop_level: 2},
			{prop_name: "prop_4", prop_level: 1},
			{prop_name: "prop_6", prop_level: 1},
		],
		product_quantity: 15,
		product_creator: "Bot",
        product_status: "Completed",
        product_regions: ["AF", "OR", "IN", "AS", "SP", "IN", "NA", "SA", "CA", "CE", "NE", "RU"],
        product_util: 0,
	});

	Products.insert({
		product_id: 6,
		product_name: "Prod " + 6,
		product_price: 30,
		product_color: "#f6f930",
		//product_quality: 1 + Math.floor(Math.random() * 10),
		prop: [
			{prop_name: "prop_1", prop_level: 2},
			{prop_name: "prop_2", prop_level: 1},
			{prop_name: "prop_3", prop_level: 2},
			{prop_name: "prop_4", prop_level: 1},
			{prop_name: "prop_5", prop_level: 3},
			{prop_name: "prop_6", prop_level: 1},
			{prop_name: "prop_7", prop_level: 1},
			{prop_name: "prop_8", prop_level: 1},
		],
		product_quantity: 10,
		product_creator: "Bot",
        product_status: "Completed",
        product_regions: ["AF", "OR", "IN", "AS", "SP", "IN", "NA", "SA", "CA", "CE", "NE", "RU"],
        product_util: 0,
	});


	//////////////////////////////////////////////////////////////////////
	//////////////////  REGIONS  /////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////

	var PEOPLE_MULTI = 5;

  	Regions.insert({
		region_id: "CE",
		region_name: "Central Europe",
		region_people_number: 3 * PEOPLE_MULTI,
		region_pref: 4,
		region_market: 1.5,
		region_demand: 4,
		//region_trend: "Medium",
		base_income_rate: 21,
		//base_price_rate: parseFloat((Math.random() + 1).toFixed(2)),
		//region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		base_level_of_conservatism: 0.05,
	});

	Regions.insert({
		region_id: "NE",
		region_name: "Northern Europe",
		region_people_number: 2 * PEOPLE_MULTI,
		region_pref: 3.5,
		region_market: 1.5,
		region_demand: 4,
		//region_trend: "Medium",
		base_income_rate: 23,
		//base_price_rate: parseFloat((Math.random() + 1).toFixed(2)),
		//region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		base_level_of_conservatism: 0.07,
	});

	Regions.insert({
		region_id: "AF",
		region_name: "Africa",
		region_people_number: 4 * PEOPLE_MULTI,
		region_pref: 1,
		region_market: 1.5,
		region_demand: 4,
		//region_trend: "Low",
		base_income_rate: 9,
		//base_price_rate: parseFloat((Math.random() + 1).toFixed(2)),
		//region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		base_level_of_conservatism: 0.01,
	});

	Regions.insert({
		region_id: "SA",
		region_name: "South America",
		region_people_number: 4 * PEOPLE_MULTI,
		region_pref: 2.5,
		region_market: 1.5,
		region_demand: 4,
		//region_trend: "Negative",
		base_income_rate: 18,
		//base_price_rate: parseFloat((Math.random() + 1).toFixed(2)),
		//region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		base_level_of_conservatism: 0.02,
	});

	Regions.insert({
		region_id: "NA",
		region_name: "North America",
		region_people_number: 7 * PEOPLE_MULTI,
		region_pref: 5,
		region_market: 1.5,
		region_demand: 4,
		//region_trend: "Negative",
		base_income_rate: 25,
		//base_price_rate: parseFloat((Math.random() + 1).toFixed(2)),
		//region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		base_level_of_conservatism: 0.01,
	});

	Regions.insert({
		region_id: "AS",
		region_name: "Asia",
		region_people_number: 10 * PEOPLE_MULTI,
		region_pref: 3,
		region_market: 1.5,
		region_demand: 4,
		//region_trend: "High",
		base_income_rate: 16,
		//base_price_rate: parseFloat((Math.random() + 1).toFixed(2)),
		//region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		base_level_of_conservatism: 0.03,
	});

	Regions.insert({
		region_id: "CA",
		region_name: "Carribean",
		region_people_number: 2 * PEOPLE_MULTI,
		region_pref: 2.5,
		region_market: 1.5,
		region_demand: 4,
		//region_trend: "Low",
		base_income_rate: 14,
		//base_price_rate: parseFloat((Math.random() + 1).toFixed(2)),
		//region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		base_level_of_conservatism: 0.02,
	});

	Regions.insert({
		region_id: "SP",
		region_name: "South Pacific",
		region_people_number: 3 * PEOPLE_MULTI,
		region_pref: 2,
		region_market: 1.5,
		region_demand: 4,
		//region_trend: "Low",
		base_income_rate: 15,
		//base_price_rate: parseFloat((Math.random() + 1).toFixed(2)),
		//region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		base_level_of_conservatism: 0.05,
	});

	Regions.insert({
		region_id: "IN",
		region_name: "India",
		region_people_number: 8 * PEOPLE_MULTI,
		region_pref: 1.5,
		region_market: 1.5,
		region_demand: 4,
		//region_trend: "Low",
		base_income_rate: 10,
		//base_price_rate: parseFloat((Math.random() + 1).toFixed(2)),
		//region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		base_level_of_conservatism: 0.03,
	});

	Regions.insert({
		region_id: "OR",
		region_name: "Orient",
		region_people_number: 7 * PEOPLE_MULTI,
		region_pref: 2.5,
		region_market: 1.5,
		region_demand: 4,
		//region_trend: "Low",
		base_income_rate: 13,
		//base_price_rate: parseFloat((Math.random() + 1).toFixed(2)),
		//region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		base_level_of_conservatism: 0.08,
	});

	Regions.insert({
		region_id: "RU",
		region_name: "Russia",
		region_people_number: 5 * PEOPLE_MULTI,
		region_pref: 2,
		region_market: 1.5,
		region_demand: 4,
		//region_trend: "Low",
		base_income_rate: 20,
		//base_price_rate: parseFloat((Math.random() + 1).toFixed(2)),
		//region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		base_level_of_conservatism: 0.04,
	});


    var regions = {};
    var products = [];
    var customers = [];
    var j = 0;

    var market = 0;

    Products.find().fetch().forEach(function (product) {
		products.push({
			_id: product._id,
			product_id: product.product_id,
			product_name: product.product_name,
			product_price: product.product_price,
			product_region: "",
			product_price_history: [],
			product_color: product.product_color,
			//product_quality: product.product_quality,
			prop: product.prop,
			product_quantity: product.product_quantity,
			product_creator: product.product_creator,
        	product_status: product.product_status,
        	product_regions: product.product_regions,
        	product_util: product.product_util,
		});

	});


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
		products.forEach(function (product) {
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
				color: "lightblue",
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
    	game_name: "test",
    	players: [],
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
     	status: "process",
     	time_period: 0,
    });

    var game = Games.findOne({});
    
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


	Games.update(game_id,{
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
		status: game.status,
		time_period: game.time_period,
	});



	var time_count = 1;



	var interval = Meteor.setInterval(function(){

	   	console.log("-----------------------------  START  --------------------------------");

	   	var game = Games.findOne({});

	   	if(game.status == 'finished'){
	   		Meteor.clearInterval(interval);
	   		console.log("------------------------  GAME ENDED  --------------------------");
	   	}

	   	game.customers.forEach(function (customer) {
	  		
	  		customer.changeActivity(game);
	   		customer.updateProductSelection(game);

	   	});




	   	//////////////////////////////////////////////////////////
	   	///////      WORLD CHANGES   /////////////////////////////
	   	//////////////////////////////////////////////////////////


	   	for (var region in game.regions){

		   	if((game.getRegionConserv(region) >= 0.08 && game.getRegionConserv(region) < 0.16)
		   	&& (game.getRegionPref(region) >= 2)){

				game.changeRegionConservLevel(0.01, region);
				game.changeRegionPref(0.015, region);
				game.changeIncome(0.01, region);

				if(game.news.length > 40){
			   		game.news.splice(0, 1);
			   	}

				game.news.push({
					time_period: game.time_period,
					type: "line-chart", /////Types: usd, newspaper-o, user, warning, line-chart
					//header: "Recovery in Russia",
					header: "Recovery in "+game.regions[region].region_name,
					//text: "All customers' activities in region \"RU\" have been set to.",
					params: {
						conserv: 1,
						pref: 1.5,
						income: 1,
					},
				});

		   	}

		   	if((game.getRegionConserv(region) >= 0.16)
		   	&& (game.getRegionPref(region) >= 2)){

				game.changeRegionConservLevel(0.01, region);
			   	game.changeRegionPref(-0.015, region);
			   	game.changeIncome(-0.01, region);

			   	if(game.news.length > 40){
			   		game.news.splice(0, 1);
			   	}

				game.news.push({
					time_period: game.time_period,
					type: "line-chart", /////Types: usd, newspaper-o, user, warning, line-chart
					//header: "Extremum in Russia",
					header: "Extremum in "+game.regions[region].region_name,
					//text: "All customers' activities in region \""+region+"\" have been set to "+status+".",
					params: {
						conserv: 1,
						pref: -1.5,
						income: -1,
					},
				});
			}

			if((game.getRegionConserv(region) >= 0.16)
		   	&& (game.getRegionPref(region) < 2)){

				game.changeRegionConservLevel(-0.015, region);
			   	game.changeRegionPref(-0.015, region);
			   	game.changeIncome(-0.01, region);

			   	if(game.news.length > 40){
			   		game.news.splice(0, 1);
			   	}

				game.news.push({
					time_period: game.time_period,
					type: "line-chart", /////Types: usd, newspaper-o, user, warning, line-chart
					//header: "Recession in Russia",
					header: "Recession in "+game.regions[region].region_name,
					//text: "All customers' activities in region \""+region+"\" have been set to "+status+".",
					params: {
						conserv: -1,
						pref: -1.5,
						income: -1,
					},
				});
			}

			if((game.getRegionConserv(region) >= 0.08 && game.getRegionConserv(region) < 0.16)
		   	&& (game.getRegionPref(region) < 2)){

				game.changeRegionConservLevel(-0.015, region);
			   	game.changeRegionPref(0.015, region);
			   	game.changeIncome(0.01, region);

			   	if(game.news.length > 40){
			   		game.news.splice(0, 1);
			   	}

				game.news.push({
					time_period: game.time_period,
					type: "line-chart", /////Types: usd, newspaper-o, user, warning, line-chart
					//header: "Crisis in Russia",
					header: "Crisis in "+game.regions[region].region_name,
					//text: "All customers' activities in region \""+region+"\" have been set to "+status+".",
					params: {
						conserv: -1,
						pref: 1.5,
						income: 1,
					},
				});
		   	}

		}

	   	///////////////////////////////////////////////////////////////////////////////////////
	   	///////////////////////////////////////////////////////////////////////////////////////
	   	///////////////////////////////////////////////////////////////////////////////////////


	   	for (var region in game.regions){
	   		game.regions[region] = {
				region_id: game.regions[region].region_id,
	     		region_name: game.regions[region].region_name,
	     		region_pref: game.regions[region].region_pref,
				region_people_number: game.regions[region].region_people_number,
				base_income_rate: game.regions[region].base_income_rate,
				base_level_of_conservatism: game.regions[region].base_level_of_conservatism,
				region_conserv: game.getRegionConserv(region),
				region_active_people_number: game.regions[region].region_active_people_number,
				region_avg_income: game.regions[region].region_avg_income,
				region_income_groups: game.regions[region].region_income_groups,
				region_products: game.getRegionProducts(region),
				map_data: game.getMapData(region),
				region_prop_pop: game.regions[region].region_prop_pop,
	    	}
	   	}



		game.setPriceHistory();	   		
	 	game.setCustomersHistory();



	   	console.log("---------------------------   UPDATE   -------------------------------");

	   	console.log("---------------------------   "+ game.time_period +"   -------------------------------");

	   	game.time_period += 1;


	   	var game_new = Games.findOne({});

	 //    game.products.forEach(function (product) {
	 //   		var prop_finished = 0;
	 //   		var target_company = null;
	 //   		if(product.product_status == "In production"){
	 //   			product.prop.forEach(function (property) {
	 //   				if((game.time_period - property.start_period) / property.time_to_achieve > 1){
		// 	            property.progress = 100;
		// 	            prop_finished++;
		// 	        }else{ 
		// 	            property.progress = Math.round((game.time_period - property.start_period) / property.time_to_achieve * 100);
		// 	        }
	 //   			});
	 //   		}

	 //   		if(product.product_status == "Updated"){
	 //   			product.prop.forEach(function (property) {
	 //   				if((game.time_period - property.start_period) / (property.time_to_achieve * property.prop_level) > 1){
		// 	            property.progress = 100;
		// 	            prop_finished++;
		// 	        }else{ 
		// 	            property.progress = Math.round((game.time_period - property.start_period) / (property.time_to_achieve * property.prop_level) * 100);
		// 	        }
	 //   			});
	 //   		}

	 //   		if(prop_finished == product.prop.length){
	 //   			product.product_status = "Completed";

	 //   			for(var company in game_new.companies){
	 //   				if(game_new.companies[company].company_name == product.product_creator){
	 //   					target_company = game_new.companies[company]
	 //   				}
	 //   			}

	 //   			target_company.company_team.forEach(function (dep) {
	 //   				dep.employee_number_at_work = 0;
	 //   			});

	 //   			target_company.company_level += 1;

	 //   			target_company.company_activities.push({
		//            status: "Complete",
		//            title: "Product development has been finished",
		//            start_time: game.time_period,
		//            comments: "Product "+product.product_name+" has been developed.",
		//         });

		//         game.news.push({
  //                   time_period: game.time_period,
  //                   type: "user", /////Types: usd, newspaper-o, user, warning
  //                   header: "New product has been released",
  //                   text: "Company "+target_company.company_name+" has released product \""+product.product_name+"\".",
  //               });
	 //   		}
	 //   	});


		// for(var company in game_new.companies){
		// 	game_new.companies[company].changeCompanyBalance(game);

		// 	if(game_new.companies[company].company_balance <= 0){
		// 		game_new.companies[company].status = 'bankrupt';
		// 	}
		// }


		// game_new.setCompaniesHistory();


		////////////////////////////////////////////////////


	   	//var target_util = 0;
		//while(target_util != 162){

		   	//console.log("------------------------  START GENERATIONS ---------------------------");

		   	//time_count++;

		   	//var generation = Generations.findOne({}, {sort: {generation_n: -1}});
		   	// var generation = Generations.find({}).fetch();
		   	// generation = generation.sort(function(a,b){return a.generation_n < b.generation_n})[0];

		   	//console.log(generation);

		   	// game_new.crossover();
		   	// game_new.mutation();
		   	// game_new.estimation();
		   	// game_new.selection();

		    //console.log(generation.products_arr);

		    // game_new.products.forEach(function (product) {
		    // 	if(target_util < product.product_util){
		    // 		target_util = product.product_util;
		    // 	}
		    // });

		   	// Generations.insert({
		   	// 	features_arr: generation.features_arr,
		   	// 	customers_arr: generation.customers_arr,
		   	// 	products_arr: generation.products_arr,
		   	// 	generation_n: time_count,
		   	// });



		   	//console.log("------------------------   END GENERATIONS  ---------------------------");
		//};



		game.products.forEach(function (product) {
			if(product.getShare(game) > 90){
				game.status = 'finished';
			}
		});



		Games.update(game._id,{
	   		players: game.players,
	   		customers: game.customers,
	   		//customers_data: game.customers_data,
	   		customers_history: game.customers_history,
	   		avg_price_history: game.avg_price_history,
	   		news: game.news,
	   		features: game.features,
	   		companies: game_new.companies,
	   		products: game.products,
	   		regions: game.regions,
	   		time_period: game.time_period,
	   		game_name: game.game_name,
	   		status: game.status,
	   	});



	   	console.log("-----------------------------   END   --------------------------------");

	}, 5000);


});
