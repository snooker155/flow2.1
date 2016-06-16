Template.news.helpers({
	news(){
		var game = Games.findOne({});
		//console.log(game.news.slice(game.news.length-4).sort(function(a, b){return b.time_period - a.time_period}));
		return game.news.slice(game.news.length-4).sort(function(a, b){return b.time_period - a.time_period});
	},

});