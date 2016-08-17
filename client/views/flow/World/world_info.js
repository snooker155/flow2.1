var selected_region = new ReactiveVar("World");
var semaphore = new ReactiveVar(0);

var getSunburstData = function(game){
	var regions_state = [];

	var regions_state1 = {
		name: "World",
		children: regions_state,
	}

	for(var region in game.regions){
		var region_state = [];
		var free_people = 0;


	////////////////////////////////////////////////////
	////////////////////////////////////////////////////
	////////////////////////////////////////////////////


		var inactive_count = 0;
		var notselected_count = 0;
		var region_customer_number = game.getRegionCustomerNumber(region);
		var increment = 0;
		game.products.forEach(function (product) {
		  	var count = 0;
			game.customers.forEach(function (customer) {
				if(customer.customer_product && customer.customer_activity == 1 && customer.customer_product.product_id == product.product_id){
					if(customer.customer_region == region){
						count++;
					}
				}
			});
			
			if(count > 0){
				//increment += parseFloat((count / region_customer_number * 100).toFixed(2));
				//increment += Math.floor(count / region_customer_number * 100);
				region_state.push({
					name: product.product_name,
					color: product.product_color,
					size: count,
				});
			}
		});

		game.customers.forEach(function (customer) {
			if(customer.customer_activity == 0){
				if(customer.customer_region == region){
					inactive_count++;
				}
			}else if(customer.customer_activity == 1 && !customer.customer_product){
				if(customer.customer_region == region){
					notselected_count++;
				}
			}
		});

		if(inactive_count > 0){
			//increment += parseFloat((inactive_count / region_customer_number * 100).toFixed(2));
			//increment += Math.floor(inactive_count / region_customer_number * 100);
			region_state.push({
				name: "Inactive",
				color: "red",
				size: inactive_count,
			});
		}

		if(notselected_count > 0){
			//increment += parseFloat((notselected_count / region_customer_number * 100).toFixed(2));
			//increment += Math.floor(notselected_count / region_customer_number * 100);
			region_state.push({
				name: "Free",
				color: "lightblue",
				size: notselected_count,
			});
		}



	////////////////////////////////////////////////////
	////////////////////////////////////////////////////
	////////////////////////////////////////////////////



		// if(game.regions[region].players !== undefined){
		// 	for(var player in game.regions[region].players){
		// 		if(game.regions[region].players[player] !== undefined && game.players[player].regions[region].people !== 0){
		// 			region_state.push({
		// 				name: game.players[player].player.username,
		// 				size: game.players[player].regions[region].people,
		// 			});
		// 		}
		// 	}
		// 	if(game.regions[region].region_people_number - game.getCustomersInRegion(region) >= 0){
		// 		region_state.push({
		// 			name: "Free",
		// 			size: game.regions[region].region_people_number - game.getCustomersInRegion(region),
		// 		});
		// 	}
		// }else{
		// 	if(game.regions[region].region_people_number - game.getCustomersInRegion(region) >= 0){
		// 		region_state.push({
		// 			name: "Free",
		// 			size: game.regions[region].region_people_number - game.getCustomersInRegion(region),
		// 		});
		// 	}
		// }

		//if(region_state[1]){
			regions_state.push({
				name: region,
				children: region_state,
			});
		// }else{
		// 	regions_state.push({
		// 		name: region,
		// 		size: game.regions[region].region_people_number,
		// 	});
		// }
	}
	//console.log(regions_state1);
	return regions_state1;
}




// Template.world_info.onCreated(function() {
//     var self = this;
//     self.subscribe("games", function(){
//     	Tracker.autorun(function () {

//     	});
//     });
// });


Template.world_info.onRendered(function(){


selected_region.set("World");
	
var width = 500,
    height = 570,
    radius = Math.min(width, height) / 2;

var x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

var y = d3.scale.linear()
    .range([0, radius]);

var color = d3.scale.category20c();

var svg = d3.select("#sunburst").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

var partition = d3.layout.partition()
    .value(function(d) { return d.size; });

var startAngle = function(d){
	return Math.max(0, Math.min(2 * Math.PI, x(d.x)));
}

var endAngle = function(d){
	return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)));
}

var arc = d3.svg.arc()
    .startAngle(function(d) {return Math.max(0, Math.min(2 * Math.PI, x(d.x)));})
    .endAngle(function(d) {return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)));})
    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });


var game = Games.findOne({});



  var g = svg.selectAll("g")
    .data(partition.nodes(getSunburstData(game)))
    .enter().append("g").attr("id", function(d, i) {return "part"+i; } );



  var path = g.append("path")
    .attr("d", arc)
    .style("fill", function(d) { 
    	//console.log(d);
    	return d.color ? d.color : "#337ab7";
    })
    .on("click", click);

	// Updated Angle Calculation Function...
    function angle(d, offset, threshold) {
      var a = (startAngle(d) + endAngle(d)) * 90 / Math.PI + offset;
      return a > threshold ? a - 180 : a;
    }

  // Add link names to the arcs, translated to the arc centroid and rotated.
    var text = g.append("text")
            .attr("dy", function(d) {
           	  if(d.name != selected_region.get()){
              	return ".35em";
          	  }else{
          	  	return 7;
          	  }
            })
            .attr("dx", function(d) {
           	  if(d.name != selected_region.get()){
              	var a = angle(d, 0, 0);
              	return a < 0 ? "-16px" : "16px";
          	  }else{
          	  	return 2;
          	  }
            })
            .attr("text-anchor", function(d) {
              if(d.name != selected_region.get()){
              	var a = angle(d, 0, 0);
              	return a < 0 ? "start" : "end";
              }else{
          	  	return "middle";
          	  }
            })
            .attr("transform", function(d) {return computeTextRotation(d)})
  			.style("cursor", "default")
  			.style("-webkit-user-select", "none")
  			.style("z-index", -1)
            .style("fill", "Black")
            .style("font", function(d) {
           	  if(d.name != selected_region.get()){
              	return "normal 16px Arial";
          	  }else{
          	  	return "bold 16px Arial";
          	  }
            })
            .text(function(d) { return d.name; })
            .on("click", click);



  // var text = g.append("text")
  //   .attr("transform", function(d) { return "rotate(" + angle(d, -90, 90) + ")"; })
  //   .attr("x", function(d) { return y(d.y); })
  //   .attr("dx", "6") // margin
  //   .attr("dy", ".35em") // vertical-align
  //   .text(function(d) { return d.name; });


  function click(d) {
  	semaphore.set(1);
  	var timeout = setTimeout(function(){
	  	if(d.name){
		  	if(d.name == "World"){
		  		selected_region.set("World");
		  	}else{
		  		selected_region.set(d.name);	
		  	}
	  	}else{
	  		selected_region.set("World");
	  	}

	    // fade out all text elements
	    text.transition().attr("opacity", 0);

	    path.transition()
	      .delay(100)
	      .duration(750)
	      .attrTween("d", arcTween(d))
	      .each("end", function(e, i) {
	          // check if the animated element's data e lies within the visible angle span given in d
	          if (e.x >= d.x && e.x < (d.x + d.dx)) {
	            // get a selection of the associated text element
	            var arcText = d3.select(this.parentNode).select("text");
	            // fade in the text element and recalculate positions
	            arcText.transition().duration(750)
	              .attr("opacity", 1)
	              .attr("transform", function(d) { return computeTextRotation(d) });
	          }
	      });
	    var timeout_in = setTimeout(function(){
	    	semaphore.set(0);
	    	clearTimeout(timeout_in);
	    }, 5000);
	clearTimeout(timeout);
	}, 300);

  }


d3.select(self.frameElement).style("height", height + "px");



//Interpolate the scales!
function arcTween(d) {
  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
      yd = d3.interpolate(y.domain(), [d.y, 1]),
      yr = d3.interpolate(y.range(), [d.y ? 40 : 0, radius]);
  return function(d, i) {
    return i
        ? function(t) { return arc(d); }
        : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
  };
}

function computeTextRotation(d) {//set text'ss origin to the centroid
  //we have to make sure to set these before calling arc.centroid
  d.innerRadius = (width/8); // Set Inner Coordinate
  d.outerRadius = (width/4); // Set Outer Coordinate
  var c = arc.centroid(d);
  if(d.name == "World") {
  	return "translate(0,0)rotate(" + angle(d, 0, 0) + ")";
  }else if(d.name != selected_region.get()) {
  	return "translate(" + (c[0]*0.95) +"," + (c[1]*0.95) + ")rotate(" + angle(d, -90, 90) + ")";
  }else{
  	return "translate(0,60)rotate(" + angle(d, 0, 0) + ")";
  }
  //return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
}



Tracker.autorun(function () {
	var game = Games.findOne({});
	if(semaphore.get() == 0){
		var total_number = 0;
		var data = getSunburstData(game)
		data.children.forEach(function (child) {
			total_number += child.children.length;
		});
  		var g = svg.selectAll("g");
  		if(g[0].length - 1 != total_number + data.children.length){
  			svg.selectAll("g").remove();

			var g = svg.selectAll("g")
			    .data(partition.nodes(getSunburstData(game)))
			    .enter().append("g").attr("id", function(d, i) {return "part"+i; } );

			var path = g.append("path")
			    .attr("d", arc)
			    .style("fill", function(d) { 
			    	return d.color ? d.color : "#337ab7";
			    })
			    .on("click", click);

			var text = g.append("text")
			            .attr("dy", function(d) {
			           	  if(d.name != selected_region.get()){
			              	return ".35em";
			          	  }else{
			          	  	return 7;
			          	  }
			            })
			            .attr("dx", function(d) {
			           	  if(d.name != selected_region.get()){
			              	var a = angle(d, 0, 0);
			              	return a < 0 ? "-16px" : "16px";
			          	  }else{
			          	  	return 2;
			          	  }
			            })
			            .attr("text-anchor", function(d) {
			              if(d.name != selected_region.get()){
			              	var a = angle(d, 0, 0);
			              	return a < 0 ? "start" : "end";
			              }else{
			          	  	return "middle";
			          	  }
			            })
			            .attr("transform", function(d) {return computeTextRotation(d)})
			  			.style("cursor", "default")
			  			.style("-webkit-user-select", "none")
			  			.style("z-index", -1)
			            .style("fill", "Black")
			            .style("font", function(d) {
			           	  if(d.name != selected_region.get()){
			              	return "normal 16px Arial";
			          	  }else{
			          	  	return "bold 16px Arial";
			          	  }
			            })
			            .text(function(d) { return d.name; })
			            .on("click", click);
			function click(d) {
			  	semaphore.set(1);
			  	var timeout = setTimeout(function(){
				  	if(d.name){
					  	if(d.name == "World"){
					  		selected_region.set("World");
					  	}else{
					  		selected_region.set(d.name);	
					  	}
				  	}else{
				  		selected_region.set("World");
				  	}

				    // fade out all text elements
				    text.transition().attr("opacity", 0);

				    path.transition()
				      .delay(100)
				      .duration(750)
				      .attrTween("d", arcTween(d))
				      .each("end", function(e, i) {
				          // check if the animated element's data e lies within the visible angle span given in d
				          if (e.x >= d.x && e.x < (d.x + d.dx)) {
				            // get a selection of the associated text element
				            var arcText = d3.select(this.parentNode).select("text");
				            // fade in the text element and recalculate positions
				            arcText.transition().duration(750)
				              .attr("opacity", 1)
				              .attr("transform", function(d) { return computeTextRotation(d) });
				          }
				      });
				    var timeout_in = setTimeout(function(){
				    	semaphore.set(0);
				    	clearTimeout(timeout_in);
				    }, 2000);
				clearTimeout(timeout);
				}, 300);

			  }


			//Interpolate the scales!
			function arcTween(d) {
			  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
			      yd = d3.interpolate(y.domain(), [d.y, 1]),
			      yr = d3.interpolate(y.range(), [d.y ? 40 : 0, radius]);
			  return function(d, i) {
			    return i
			        ? function(t) { return arc(d); }
			        : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
			  };
			}

			function computeTextRotation(d) {//set text'ss origin to the centroid
			  //we have to make sure to set these before calling arc.centroid
			  d.innerRadius = (width/8); // Set Inner Coordinate
			  d.outerRadius = (width/4); // Set Outer Coordinate
			  if(d.name == "World") {
			  	return "translate(0,0)rotate(" + angle(d, 0, 0) + ")";
			  }else if(d.name != selected_region.get()) {
			  	return "translate(" + arc.centroid(d) + ")rotate(" + angle(d, -90, 90) + ")";
			  }else{
			  	return "translate(0,60)rotate(" + angle(d, 0, 0) + ")";
			  }
			  //return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
			}
  		}else{
  			g.select("path").data(partition.nodes(getSunburstData(game))).transition().duration(200).attr("d", arc);
    		g.select("text").data(partition.nodes(getSunburstData(game))).transition().attr("transform", function(d) { return computeTextRotation(d) });
    	}
	}

});

});





///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////



Template.world_info.helpers({
	// players: function () {
	// 	var game = Games.findOne({});
	// 	var shares_arr = [];
 //        for(var player in game.players){
	//         if(game.players[player].regions !== undefined){
	// 	        shares_arr.push(game.players[player]);
	//     	}
 //     	}
 //        return shares_arr;
	// },

	regions: function () {
		var game = Games.findOne({});
		var regions_arr = [];
        for(var region in game.regions){
        	if(100-game.getRegionFullness(region) > 0.009){
				regions_arr.push({
					region: game.regions[region],
					region_fullness_array: [parseFloat(game.getRegionFullness(region).toFixed(2)), parseFloat((100 - game.getRegionFullness(region)).toFixed(2))],
					region_fullness: parseFloat((100 - game.getRegionFullness(region)).toFixed(2)),
				});
			}else{
				regions_arr.push({
					region: game.regions[region],
					region_fullness_array: [100, 0],
					region_fullness: 0,
				});
			}
     	}
        return regions_arr;
	},

	selected_region: function(){
		var game = Games.findOne({});
		if(selected_region.get() == "World"){
			return game.getWorldState();
		}else{
			return game.regions[selected_region.get()];
		}		
	},

	colors: function(){
		return ["#ccc", "#1ab394"];
	},


	// products:function(){
 //    	var game = Games.findOne({});
 //    	var products = [];
 //        var free_share = 0;
 //        var inactive_share = 0;
 //        var total_customer = 0;
 //    	game.products.forEach(function (product) {
 //            if(product.product_status != "In production"){
 //                var product_share = 0;
 //                var total_product_customers = 0;
 //                total_customer = 0;
 //                game.customers.forEach(function (customer) {
 //                	if(selected_region.get() == "World"){
 //                		if(customer.customer_product && customer.customer_product.product_id == product.product_id && customer.customer_activity == 1){
 //                    	    total_product_customers++;
 //                    	}
 //                    	total_customer++;
                		
 //                	}else{
 //                		if(customer.customer_region == selected_region.get()){
 //                    		if(customer.customer_product && customer.customer_product.product_id == product.product_id && customer.customer_activity == 1){
 //                    		    total_product_customers++;
 //                    		}
 //                    		total_customer++;
 //                    	}
 //                	}
 //                });
 //                total_customer == 0 ? total_customer = 1 : total_customer = total_customer;
 //                product_share = Math.floor(total_product_customers / total_customer * 100);
 //                products.push({
 //                    product_name: product.product_name,
 //                    product_color: product.product_color,
 //                    product_share: product_share,
 //                });
 //            }
 //        });
	
	// 	total_customer = 0;
 //        game.customers.forEach(function (customer) {
 //        	if(selected_region.get() == "World"){
 //        		if(customer.customer_activity != 1){
 //            	    inactive_share++;
 //            	}

 //            	if(customer.customer_activity == 1 && !customer.customer_product){
 //            	    free_share++;
 //            	}

 //            	total_customer++;
       
 //        	}else{
 //            	if(customer.customer_region == selected_region.get()){
 //        			if(customer.customer_activity != 1){
 //            		    inactive_share++;
 //            		}

 //            		if(customer.customer_activity == 1 && !customer.customer_product){
 //            		    free_share++;
 //            		}
 //        			total_customer++;
 //        		}
 //        	}
 //        });
	// 	total_customer == 0 ? total_customer = 1 : total_customer = total_customer;
 //        products.push({
 //            product_name: "Free",
 //            product_color: "lightblue",
 //            product_share: Math.floor(free_share / total_customer * 100),
 //        });

 //        products.push({
 //            product_name: "Inactive",
 //            product_color: "red",
 //            product_share: Math.floor(inactive_share / total_customer * 100),
 //        });
 //    	return products;
 //    },
});






Template.region_info.helpers({
	products:function(){
    	var game = Games.findOne({});
    	var products = [];
        var free_share = 0;
        var inactive_share = 0;
        var total_customer = 0;
    	game.products.forEach(function (product) {
            if(product.product_status != "In production"){
                var product_share = 0;
                var total_product_customers = 0;
                total_customer = 0;
                game.customers.forEach(function (customer) {
                	if(selected_region.get() == "World"){
                		if(customer.customer_product && customer.customer_product.product_id == product.product_id && customer.customer_activity == 1){
                    	    total_product_customers++;
                    	}
                    	total_customer++;
                		
                	}else{
                		if(customer.customer_region == selected_region.get()){
                    		if(customer.customer_product && customer.customer_product.product_id == product.product_id && customer.customer_activity == 1){
                    		    total_product_customers++;
                    		}
                    		total_customer++;
                    	}
                	}
                });
                total_customer == 0 ? total_customer = 1 : total_customer = total_customer;
                product_share = Math.floor(total_product_customers / total_customer * 100);
                products.push({
                    product_name: product.product_name,
                    product_color: product.product_color,
                    product_share: product_share,
                });
            }
        });
	
		total_customer = 0;
        game.customers.forEach(function (customer) {
        	if(selected_region.get() == "World"){
        		if(customer.customer_activity != 1){
            	    inactive_share++;
            	}

            	if(customer.customer_activity == 1 && !customer.customer_product){
            	    free_share++;
            	}

            	total_customer++;
       
        	}else{
            	if(customer.customer_region == selected_region.get()){
        			if(customer.customer_activity != 1){
            		    inactive_share++;
            		}

            		if(customer.customer_activity == 1 && !customer.customer_product){
            		    free_share++;
            		}
        			total_customer++;
        		}
        	}
        });
		total_customer == 0 ? total_customer = 1 : total_customer = total_customer;
        products.push({
            product_name: "Free",
            product_color: "lightblue",
            product_share: Math.floor(free_share / total_customer * 100),
        });

        products.push({
            product_name: "Inactive",
            product_color: "red",
            product_share: Math.floor(inactive_share / total_customer * 100),
        });
    	return products;
    },
});