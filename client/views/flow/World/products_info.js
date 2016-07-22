import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './products_info.html';


Template.products_info.onCreated(function() {
    var self = this;
        var generation_subscription = self.subscribe("generations");
        if(generation_subscription.ready()){
			console.log('Loaded!');
        }else{
            console.log('Loading...');
        }

    self.getGeneration = function(){
        return Generations.findOne({}, {sort: {generation_n: -1}});
    }
});


Template.products_info.helpers({
  all_products() {
  	var generation = Generations.findOne({}, {sort: {generation_n: -1}});
    if(generation){
    	return generation.products_arr;
    }
  },
});


Template.customers_stat.helpers({
  customers_number(){
  	var generation = Generations.findOne({}, {sort: {generation_n: -1}});
  	if(generation){
    	return generation.customers_arr.length;
    }
  },

  generation_n(){
	var generation = Generations.findOne({}, {sort: {generation_n: -1}});
	if(generation){
    	return generation.generation_n;
    }
  },

});


