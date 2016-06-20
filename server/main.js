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





	///////////////////////////////////////////////////////////////////////
	///////////////    DEPARTMENTS   //////////////////////////////////////
	///////////////////////////////////////////////////////////////////////


	Departments.insert({
		department_name: "Technology",
		employee_price: 200,
	});


	Departments.insert({
		department_name: "Design",
		employee_price: 150,
	});

	Departments.insert({
		department_name: "Support",
		employee_price: 100,
	});





	///////////////////////////////////////////////////////////////////////
	////////////////     FEATURES    //////////////////////////////////////
	///////////////////////////////////////////////////////////////////////


	Features.insert({
		feature_name: "prop_1",
		time_to_achieve: 5,
		feature_price: 250,
		neccessary_employees_number: 2,
		neccessary_department: "Support",
		max_feature_level: 3,
		//neccessary_level: 1,
	});

	Features.insert({
		feature_name: "prop_2",
		time_to_achieve: 7,
		feature_price: 350,
		neccessary_employees_number: 3,
		neccessary_department: "Design",
		max_feature_level: 3,
		//neccessary_level: 1,
	});

	Features.insert({
		feature_name: "prop_3",
		time_to_achieve: 10,
		feature_price: 450,
		neccessary_employees_number: 4,
		neccessary_department: "Technology",
		max_feature_level: 3,
		//neccessary_level: 1,
	});



	///////////////////////////////////////////////////////////////////////
	//////////////////  PRODUCTS  /////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////

	Products.insert({
		product_id: 1,
		product_name: "Prod 1",
		product_price: 8,
		product_color: "orange",
		//product_quality: 1 + Math.floor(Math.random() * 10),
		prop: [
			{prop_name: "prop_1"},
			//{prop_name: "prop_2"},
		],
		product_quantity: 100,
		product_creator: "Bot",
        product_status: "Completed",
	});

	Products.insert({
		product_id: 2,
		product_name: "Prod 2",
		product_price: 12,
		product_color: "lightgreen",
		//product_quality: 1 + Math.floor(Math.random() * 10),
		prop: [
			{prop_name: "prop_1"},
			{prop_name: "prop_2"},
		],
		product_quantity: 75,
		product_creator: "Bot",
        product_status: "Completed",
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
	// });


	//////////////////////////////////////////////////////////////////////
	//////////////////  REGIONS  /////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////

	var PEOPLE_BASE = 5;

  	Regions.insert({
		region_id: "CE",
		region_name: "Central Europe",
		//region_people_number: 2000 + Math.floor((Math.random() * 500) + 100),
		region_people_number: PEOPLE_BASE + Math.floor((Math.random() * 5) + 2),
		region_pref: "Design",
		region_market: 1.5,
		region_demand: 4,
		region_trend: "Medium",
		base_profit_rate: 0.07,
		base_price_rate: parseFloat((Math.random() + 1).toFixed(2)),
		region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		level_of_conservatism: 0.05,
	});

	Regions.insert({
		region_id: "NE",
		region_name: "Northern Europe",
		//region_people_number: Math.floor(Math.random() * 5),
		region_people_number: PEOPLE_BASE + Math.floor((Math.random() * 5) + 2),
		region_pref: "Design",
		region_market: 1.5,
		region_demand: 4,
		region_trend: "Medium",
		base_profit_rate: 0.07,
		base_price_rate: parseFloat((Math.random() + 1).toFixed(2)),
		region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		level_of_conservatism: 0.05,
	});

	Regions.insert({
		region_id: "AF",
		region_name: "Africa",
		//region_people_number: Math.floor(Math.random() * 5),
		region_people_number: PEOPLE_BASE + Math.floor((Math.random() * 5) + 2),
		region_pref: "Support",
		region_market: 1.5,
		region_demand: 4,
		region_trend: "Low",
		base_profit_rate: 0.07,
		base_price_rate: parseFloat((Math.random() + 1).toFixed(2)),
		region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		level_of_conservatism: 0.05,
	});

	Regions.insert({
		region_id: "SA",
		region_name: "South America",
		//region_people_number: Math.floor(Math.random() * 5),
		region_people_number: PEOPLE_BASE + Math.floor((Math.random() * 5) + 2),
		region_pref: "Design",
		region_market: 1.5,
		region_demand: 4,
		region_trend: "Negative",
		base_profit_rate: 0.07,
		base_price_rate: parseFloat((Math.random() + 1).toFixed(2)),
		region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		level_of_conservatism: 0.05,
	});

	Regions.insert({
		region_id: "NA",
		region_name: "North America",
		//region_people_number: Math.floor(Math.random() * 5),
		region_people_number: PEOPLE_BASE + Math.floor((Math.random() * 5) + 2),
		region_pref: "Technology",
		region_market: 1.5,
		region_demand: 4,
		region_trend: "Negative",
		base_profit_rate: 0.07,
		base_price_rate: parseFloat((Math.random() + 1).toFixed(2)),
		region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		level_of_conservatism: 0.05,
	});

	Regions.insert({
		region_id: "AS",
		region_name: "Asia",
		//region_people_number: Math.floor(Math.random() * 5),
		region_people_number: PEOPLE_BASE + Math.floor((Math.random() * 5) + 2),
		region_pref: "Technology",
		region_market: 1.5,
		region_demand: 4,
		region_trend: "High",
		base_profit_rate: 0.07,
		base_price_rate: parseFloat((Math.random() + 1).toFixed(2)),
		region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		level_of_conservatism: 0.05,
	});

	Regions.insert({
		region_id: "CA",
		region_name: "Caribbean",
		//region_people_number: Math.floor(Math.random() * 5),
		region_people_number: PEOPLE_BASE + Math.floor((Math.random() * 5) + 2),
		region_pref: "Support",
		region_market: 1.5,
		region_demand: 4,
		region_trend: "Low",
		base_profit_rate: 0.07,
		base_price_rate: parseFloat((Math.random() + 1).toFixed(2)),
		region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		level_of_conservatism: 0.05,
	});

	Regions.insert({
		region_id: "SP",
		region_name: "South Pacific",
		//region_people_number: Math.floor(Math.random() * 5),
		region_people_number: PEOPLE_BASE + Math.floor((Math.random() * 5) + 2),
		region_pref: "Support",
		region_market: 1.5,
		region_demand: 4,
		region_trend: "Low",
		base_profit_rate: 0.07,
		base_price_rate: parseFloat((Math.random() + 1).toFixed(2)),
		region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		level_of_conservatism: 0.05,
	});

	Regions.insert({
		region_id: "IN",
		region_name: "India",
		//region_people_number: Math.floor(Math.random() * 5),
		region_people_number: PEOPLE_BASE + Math.floor((Math.random() * 5) + 2),
		region_pref: "Support",
		region_market: 1.5,
		region_demand: 4,
		region_trend: "Low",
		base_profit_rate: 0.07,
		base_price_rate: parseFloat((Math.random() + 1).toFixed(2)),
		region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		level_of_conservatism: 0.05,
	});

	Regions.insert({
		region_id: "OR",
		region_name: "Orient",
		//region_people_number: Math.floor(Math.random() * 5),
		region_people_number: PEOPLE_BASE + Math.floor((Math.random() * 5) + 2),
		region_pref: "Support",
		region_market: 1.5,
		region_demand: 4,
		region_trend: "Low",
		base_profit_rate: 0.07,
		base_price_rate: parseFloat((Math.random() + 1).toFixed(2)),
		region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		level_of_conservatism: 0.05,
	});

	Regions.insert({
		region_id: "RU",
		region_name: "Russia",
		//region_people_number: Math.floor(Math.random() * 5),
		region_people_number: PEOPLE_BASE + Math.floor((Math.random() * 5) + 2),
		region_pref: "Support",
		region_market: 1.5,
		region_demand: 4,
		region_trend: "Low",
		base_profit_rate: 0.07,
		base_price_rate: parseFloat((Math.random() + 1).toFixed(2)),
		region_price: 10000 + Math.floor((Math.random() * 5000) + 1000),
		level_of_conservatism: 0.05,
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
		});

	});


    Regions.find().forEach(function (region) {
  		var level_of_conservatism = 0,
  			new_level_of_conservatism = 0
  			customer_income = 0,
  			new_customer_income = 0;
	    
	    for (var i = 0; i < region.region_people_number; ++i){

	    	new_level_of_conservatism = Math.random() / 10;
	    	level_of_conservatism += new_level_of_conservatism;

	    	new_customer_income = 10 + Math.floor(Math.random() * 20);
	    	customer_income += new_customer_income;

	     	customers.push({
				customer_id: j,
				customer_region: region.region_id,
				customer_pref: region.region_pref,
				//customer_money: 2000 + Math.floor((Math.random() * 500) + 100),
				base_customer_conservatism: new_level_of_conservatism,
				customer_conservatism: null,
				customer_product_conservatism: {},
				customer_income: new_customer_income,
				customer_pref: 3,
				//customer_activity: Math.round(Math.random() + 0.4),
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
     		region_trend: region.region_trend,
			region_people_number: region.region_people_number,
			base_profit_rate: region.base_profit_rate,
			base_price_rate: region.base_price_rate,
			level_of_conservatism: parseFloat((level_of_conservatism / region.region_people_number).toFixed(3)),
    	}
    });



	var game_id = Games.insert({
    	game_name: "test",
    	players: [],
     	regions: regions,
     	customers: customers,
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
		companies: game.companies,
		products: game.products,
		regions: game.regions,
		game_name: game.game_name,
		status: game.status,
		time_period: game.time_period,
	});
















	var interval = Meteor.setInterval(function(){

	   	console.log("-------------------------------  START  ----------------------------------");

	   	var game = Games.findOne({});

	   	game.customers.forEach(function (customer) {

	   		customer.makeRelations();

	   		// !!! customer.makeConservatism(); !!! // Doesn't work without this in case of new products
	  		
	  		customer.changeActivity(game);
	   		customer.updateProductSelection(game);


	   	});


	   	/////  WORLD CHANGES  ///////

	   	game.changeIncome();

	   	/////////////////////////////



		game.setPriceHistory();	   		
	   	game.setCustomersHistory(game.time_period);




	   	console.log("-----------------------------   UPDATE   ---------------------------------");

	   	console.log("-----------------------------   "+ game.time_period +"   ---------------------------------");

	   	game.time_period += 1;


	   	var game_new = Games.findOne({});

	   	game_new.setCompaniesHistory();


	    game.products.forEach(function (product) {
	   		var prop_finished = 0;
	   		var company = null;
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
	   					company = game_new.companies[company]
	   				}
	   			}

	   			company.company_activities.push({
		           status: "Complete",
		           title: "Product development has been finished",
		           start_time: game.time_period,
		           comments: "Product "+product.product_name+" has been developed.",
		        });
	   		}
	   	});


	   	Games.update(game._id,{
	   		players: game.players,
	   		customers: game.customers,
	   		customers_history: game.customers_history,
	   		avg_price_history: game.avg_price_history,
	   		news: game.news,
	   		companies: game_new.companies,
	   		products: game.products,
	   		regions: game.regions,
	   		time_period: game.time_period,
	   		game_name: game.game_name,
	   		status: game.status,
	   	});



	   	console.log("-------------------------------   END   ----------------------------------");

	}, 30000);


});
