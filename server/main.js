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
	});


	Departments.insert({
		department_name: "Design",
		employee_price: 50,
	});

	Departments.insert({
		department_name: "Support",
		employee_price: 20,
	});

	Departments.insert({
		department_name: "Marketing",
		employee_price: 150,
	});

	Departments.insert({
		department_name: "Sales",
		employee_price: 200,
	});

	Departments.insert({
		department_name: "R&D",
		employee_price: 350,
	});





	///////////////////////////////////////////////////////////////////////
	////////////////     FEATURES    //////////////////////////////////////
	///////////////////////////////////////////////////////////////////////


	Features.insert({
		feature_id: 1,
		feature_name: "prop_1",
		time_to_achieve: 10,
		feature_price: 450,
		neccessary_employees_number: 4,
		neccessary_department: "Technology",
		max_feature_level: 3,
		neccessary_level: 0,
	});

	Features.insert({
		feature_id: 2,
		feature_name: "prop_2",
		time_to_achieve: 7,
		feature_price: 350,
		neccessary_employees_number: 3,
		neccessary_department: "Design",
		max_feature_level: 3,
		neccessary_level: 0,
	});

	Features.insert({
		feature_id: 3,
		feature_name: "prop_3",
		time_to_achieve: 5,
		feature_price: 250,
		neccessary_employees_number: 2,
		neccessary_department: "Support",
		max_feature_level: 3,
		neccessary_level: 1,
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
	});

	Features.insert({
		feature_id: 10,
		feature_name: "prop_10",
		time_to_achieve: 30,
		feature_price: 45000,
		neccessary_employees_number: 5,
		neccessary_department: "R&D",
		max_feature_level: 10,
		neccessary_level: 5,
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
		prop: [{
				prop_name: "prop_1",
				prop_level: 1},
			//{prop_name: "prop_2"},
		],
		product_quantity: 100,
		product_creator: "Bot",
        product_status: "Completed",
        product_regions: ["AF", "OR", "IN", "AS", "SP", "IN"],
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
        product_regions: ["NA", "SA", "CA", "CE", "NE", "RU"],
        product_util: 0,
	});


	// Products.insert({
	// 	product_id: 3,
	// 	product_name: "Prod " + 3,
	// 	product_price: 12,
	// 	product_color: "magenta",
	// 	//product_quality: 1 + Math.floor(Math.random() * 10),
	// 	prop: [
	// 		{prop_name: "prop_2"},
	// 		{prop_name: "prop_3"},
	// 	],
	// 	product_quantity: 50,
	// 	product_creator: "Bot",
 //        product_status: "Completed",
 //        product_regions: ["AS", "SP", "IN"],
	// });


	// Products.insert({
	// 	product_id: 4,
	// 	product_name: "Prod " + 4,
	// 	product_price: 20,
	// 	product_color: "pink",
	// 	//product_quality: 1 + Math.floor(Math.random() * 10),
	// 	prop: [
	// 		{prop_name: "prop_1"},
	// 		{prop_name: "prop_2"},
	// 		{prop_name: "prop_3"},
	// 	],
	// 	product_quantity: 25,
	// 	product_creator: "Bot",
 //        product_status: "Completed",
 //        product_regions: ["CE", "NE", "RU"],
	// });


	//////////////////////////////////////////////////////////////////////
	//////////////////  REGIONS  /////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////

	var PEOPLE_MULTI = 3;

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
		base_level_of_conservatism: 0.07,
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
		base_level_of_conservatism: 0.08,
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
		base_level_of_conservatism: 0.03,
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
		base_level_of_conservatism: 0.04,
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
		base_level_of_conservatism: 0.02,
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
		base_level_of_conservatism: 0.05,
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
		base_level_of_conservatism: 0.04,
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
		base_level_of_conservatism: 0.06,
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
		base_level_of_conservatism: 0.07,
	});

	Regions.insert({
		region_id: "RU",
		region_name: "Russia",
		region_people_number: 5 * PEOPLE_MULTI,
		region_pref: 3,
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
			//product_quality: product.,
			prop: product.prop,
			product_quantity: product.product_quantity,
			product_creator: product.product_creator,
        	product_status: product.product_status,
        	product_regions: product.product_regions,
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

	    	//new_customer_income = region.base_income_rate + Math.floor(Math.random() * 20);
	    	new_customer_income = region.base_income_rate;
	    	customer_income += new_customer_income;

	     	customers.push({
				customer_id: j,
				customer_region: region.region_id,
				customer_pref: region.region_pref,
				//customer_money: 2000 + Math.floor((Math.random() * 500) + 100),
				base_customer_conservatism: region.base_level_of_conservatism,
				customer_conservatism: null,
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
						weight: Math.floor(Math.random() * 10), 
						prop: {
							prop_1: Math.floor(Math.random() * 4),
							prop_2: Math.floor(Math.random() * 4),
							prop_3: Math.floor(Math.random() * 4),
						}
					},
					{
						value: 0, 
						weight: Math.floor(Math.random() * 10), 
						prop: {
							prop_1: Math.floor(Math.random() * 4),
							prop_2: Math.floor(Math.random() * 4),
							prop_3: Math.floor(Math.random() * 4),
						}
					},
					{	
						value: 0, 
						weight: Math.floor(Math.random() * 10), 
						prop: {
							prop_1: Math.floor(Math.random() * 4),
							prop_2: Math.floor(Math.random() * 4),
							prop_3: Math.floor(Math.random() * 4),
						}
					},
				],
			});

			j++;

			console.log('Initializing: Customer ---- №' + j);
	    }

	    regions[region.region_id] = {
     		region_id: region.region_id,
     		region_name: region.region_name,
     		region_pref: region.region_pref,
     		//region_trend: region.region_trend,
			region_people_number: region.region_people_number,
			base_income_rate: region.base_income_rate,
			//base_price_rate: region.base_price_rate,
			base_level_of_conservatism: region.base_level_of_conservatism,
    	}
    });

	var features = [];

	Features.find().fetch().forEach(function (feature) {
		features.push(feature);
	});



	var game_id = Games.insert({
    	game_name: "test",
    	players: [],
     	regions: regions,
     	customers: customers,
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



	console.log('Initializing: History --- Start');

	game.setPriceHistory();	 
	game.setCustomersHistory();

	console.log('Initializing: History --- End');


	Games.update(game_id,{
		players: game.players,
		customers: game.customers,
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



////////////////////////////////////////////////////////////////////////
////////////////////////                       /////////////////////////
////////////////////////      GENERATIONS      /////////////////////////
////////////////////////                       /////////////////////////
////////////////////////////////////////////////////////////////////////


	// var CUSTOMERS_NUMBER = 1000;
	// var FEATRUES_NUMBER = 20;
	// var PRODUCTS_NUMBER = 6;

	// var products = [];
	// var customers = [];
	// var features = [];



	// for (var i = 0; i < FEATRUES_NUMBER; i++){

	// 	features.push({
	// 		feature_id: i,
	// 		feature_name: "prop_"+i,
	// 	});

	// }



	// for (var i = 0; i < PRODUCTS_NUMBER; i++){

	// 	var prop = [];

	// 	for(var j = 0; j < Math.floor(Math.random() * (features.length - 10.1) + 1); j++){
	// 		prop.push({
	// 			prop_name: "prop_"+Math.floor(Math.random() * (features.length - 0.001)),
	// 		})
	// 	}

	// 	//var product_price = Math.pow(5, prop.length);
	// 	var product_price = 3
	// 	if(prop.length > 0){
	// 		product_price = 5 * prop.length;
	// 	}


	// 	products.push({
	// 		product_id: i,
	// 		product_name: "Prod " + i,
	// 		//product_price: 10 + Math.floor(Math.random() * 20),
	// 		product_price: product_price,
	// 		//product_color: "lightblue",
	// 		prop: prop,
	// 		product_creator: "Bot",
	//         product_status: "Completed",
	//         //product_share: 0,
	//         product_util: 0,
	// 	});


	// }



	// for(var i = 0; i < CUSTOMERS_NUMBER; i++){

	// 	var needed = [];

	// 	for(var j = 0; j < 10; j++){
	// 		needed.push({
	// 			value: 0,
	// 			weight: Math.floor(Math.random() * 10),  
	// 			prop: {
	// 				prop_0: 0,
	// 				prop_1: 1,
	// 				prop_2: 2,
	// 				prop_3: 3,
	// 				prop_4: 4,
	// 				prop_5: 5,
	// 				prop_6: 6,
	// 				prop_7: 7,
	// 				prop_8: 8,
	// 				prop_9: 9,
	// 				prop_10: 10,
	// 				prop_11: 11,
	// 				prop_12: 12,
	// 				prop_13: 13,
	// 				prop_14: 14,
	// 				prop_15: 15,
	// 				prop_16: 16,
	// 				prop_17: 17,
	// 				prop_18: 18,
	// 				prop_19: 19,
	// 			}
	// 		})
	// 	}


	// 	customers.push({
	// 		customer_id: i,
	// 		customer_income: 20 + Math.floor(Math.random() * 3),
	// 		customer_product: "",
	// 		needed: needed,
	// 	});
	// }


	// Generations.insert({
	// 	customers_arr: customers,
	// 	products_arr: products,
	// 	features_arr: features,
	// 	generation_n: 1,
	// });


	var time_count = 1;



	var interval = Meteor.setInterval(function(){

	   	console.log("-----------------------------  START  --------------------------------");

	   	var game = Games.findOne({});


	 	// game.crossover();
		// game.mutation();
		// game.estimation();
		// game.selection();


	   	game.customers.forEach(function (customer) {

	   		//customer.makeRelations();
	  		
	  		customer.changeActivity(game);
	   		customer.updateProductSelection(game);


	   	});


	   	/////  WORLD CHANGES  ///////

	   	// game.changeIncome(0.005);

	   	// game.changeCustomersNumber(3);

	   	// game.changeRegionActivity(1);

	   	// game.changeProductPrice(2);

	   	// game.changeRegionConservLevel(0.003);

	   	// game.changeRegionPref(1);

	   	//game.changeIncome(-0.05, "RU");

		//game.changeCustomersNumber(1, "RU");

		//game.changeRegionActivity(1, "RU");

		//game.changeProductPrice(1, "Prod 2");

		//game.changeRegionConservLevel(-0.001, "RU");


	   	// if(game.getRegionConserv("RU") >= 0.08){  //// set crisis in Russia  /// 0.08 = base_level_of_conservatism for "RU" region * 2

	   	// 	console.log("----------------------   Crisis in Russia   --------------------------");

		   // 	if(game.getRegionPref("RU") <= 3 * 2 && game.getAvgPrice("RU") < 15){  /// 3 = region_pref for "RU" region
		   // 		game.changeRegionPref(0.05, "RU");
		   // 	}

		   // 	if(game.getAvgPrice("RU") < 25){
		   // 		game.changeProductPrice(0.25, "Prod 2");
		   // 	}

	   	// }





	   	// if(game.getAvgPrice("RU") >= 16){  //// set inflation in Russia

	   	// 	console.log("----------------------   Inflation in Russia   --------------------------");

	   	// 	//game.changeIncome(-0.02, "RU");

	   	// 	if(game.getRegionPref("RU") > 1){
	   	// 		if(game.getRegionPref("RU") > 3){    /// 3 = region_pref for "RU" region
	   	// 			game.changeRegionPref(-0.05, "RU");
	   	// 			game.changeIncome(-0.02, "RU");
	   	// 		}else if(game.getRegionPref("RU") > 3 * 0.5){    /// 3 = region_pref for "RU" region
	   	// 			game.changeRegionPref(-0.05, "RU");
	   	// 			game.changeIncome(-0.01, "RU");
	   	// 		}else if(game.getRegionPref("RU") > 3 * 0.25){   /// 3 = region_pref for "RU" region
	   	// 			game.changeRegionPref(-0.05, "RU");
	   	// 			game.changeIncome(-0.005, "RU");
	   	// 		}
	   	// 	}

		   // 	// if(game.getRegionConserv("RU") > 0.01 ){
		   // 	// 	game.changeRegionConservLevel(-0.005, "RU");
		   // 	// 	game.changeRegionPref(0.3, "RU");
		   // 	// 	game.changeIncome(-0.02, "RU");
		   // 	// }
		   	
	   	// }



	   	// if(game.getAverageIncome("RU") <= 10){  //// set Customers' ability in Russia

	   	// 	console.log("------------   Customers' ability reducing in Russia   ----------------");

	   	// 	//game.changeRegionConservLevel(0.05, "RU");

	   	// 	if(game.getRegionConserv("RU") < 0.6){
		   // 		//game.changeCustomersNumber(1, "RU");
		   // 		game.changeRegionPref(-0.05, "RU");
		   // 		//game.changeRegionConservLevel(-0.005, "RU");
		   // 		//game.changeIncome(0.2, "RU");
		   // 	}else{
		   // 		game.changeRegionActivity(0, "RU");
		   // 	}
		   	
	   	// }




	   	// if(game.getRegionPref("RU") > 3.5){  //// set Overexpectations reducing in Russia

	   	// 	console.log("------------   Overexpectations reducing in Russia   ----------------");

	   	// 	//game.changeRegionConservLevel(0.1, "RU");

	   	// 	if(game.getAvgPrice("RU") >= 20){
		   // 		//game.changeCustomersNumber(1, "RU");
		   // 		//game.changeRegionPref(-0.1, "RU");
		   // 		game.changeRegionConservLevel(0.02, "RU");
		   // 		//game.changeProductPrice(-2, "Prod 2");
		   // 	}else{
		   // 		game.changeIncome(-0.015, "RU");
		   // 	}
		   	
	   	// }



	   	// if(game.getRegionConserv("RU") > 0.04){  /// 0.07 = base_level_of_conservatism for "RU" region
		   // 	if(game.getRegionPref("RU") <= 1){      /////// set Economic growth in Russia
		   // 		console.log("------------  Economic growth in Russia   ----------------");

		   // 		game.changeRegionConservLevel(-0.005, "RU");

		   // 		game.changeIncome(0.02, "RU");

		   // 		if(game.getAverageIncome("RU") <= 17 && game.getAvgPrice("RU") >= 8){
			  //  		game.changeProductPrice(-1, "Prod 2");
			  //  		//game.changeIncome(0.05, "RU");
			  //  	}
		   // 	}
	   	// }


	   	/////////////////////////////



		game.setPriceHistory();	   		
	   	game.setCustomersHistory(game.time_period);



	   	console.log("---------------------------   UPDATE   -------------------------------");

	   	console.log("---------------------------   "+ game.time_period +"   -------------------------------");

	   	game.time_period += 1;


	   	var game_new = Games.findOne({});


	    game.products.forEach(function (product) {
	   		var prop_finished = 0;
	   		var target_company = null;
	   		if(product.product_status == "In production"){
	   			product.prop.forEach(function (property) {
	   				if((game.time_period - property.start_period) / property.time_to_achieve > 1){
			            property.progress = 100;
			            prop_finished++;
			        }else{ 
			            property.progress = Math.round((game.time_period - property.start_period) / property.time_to_achieve * 100);
			        }
	   			});
	   		}

	   		if(prop_finished == product.prop.length){
	   			product.product_status = "Completed";

	   			for(var company in game_new.companies){
	   				if(game_new.companies[company].company_name == product.product_creator){
	   					target_company = game_new.companies[company]
	   				}
	   			}

	   			target_company.company_team.forEach(function (dep) {
	   				dep.employee_number_at_work = 0;
	   			});

	   			target_company.company_level += 1;

	   			target_company.company_activities.push({
		           status: "Complete",
		           title: "Product development has been finished",
		           start_time: game.time_period,
		           comments: "Product "+product.product_name+" has been developed.",
		        });

		        game.news.push({
                    time_period: game.time_period,
                    type: "user", /////Types: usd, newspaper-o, user, warning
                    header: "New product has been released",
                    text: "Company "+target_company.company_name+" has released product \""+product.product_name+"\".",
                });
	   		}
	   	});


		for(var company in game_new.companies){
			game_new.companies[company].changeCompanyBalance(game);
		}


		game_new.setCompaniesHistory();


	   	//var target_util = 0;
		//while(target_util != 162){

		   	console.log("------------------------  START GENERATIONS ---------------------------");

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



		   	console.log("------------------------   END GENERATIONS  ---------------------------");
		//};



		Games.update(game._id,{
	   		players: game.players,
	   		customers: game.customers,
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

	}, 15000);


});
