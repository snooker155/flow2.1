import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './products_info.html';


Template.products_info.onCreated(function() {
    var self = this;
        var games_subscription = self.subscribe("games");
        if(games_subscription.ready()){
			console.log('Loaded!');
        }else{
            console.log('Loading...');
        }

    self.getGame = function(){
        return Games.findOne({});
    }
});


Template.products_info.helpers({
  all_products() {
  	var game = Games.findOne({});
    if(game){
    	return game.products;
    }
  },
});


Template.customers_stat.helpers({
  customers_number(){
  	var game = Games.findOne({});
  	if(game){
    	return game.customers.length;
    }
  },

  game_n(){
	var game = Games.findOne({});
	if(game){
    	return game.time_period;
    }
  },

});


Template.products.helpers({
  product_price() {
    var self = this;
    return parseFloat(self.product_price.toFixed(2));
  },
});


