Template.news_info.onRendered(function(){

});





Template.news_flow.helpers({
    news: function(){
        var game = Games.findOne({});
        //console.log(game.news);
        return game.news.slice(game.news.length-5).sort(function(a, b){return b.time_period - a.time_period});
    },

    conserv_color(){
		var self = this;
		if(self.params.conserv > 0){
			return "navy";
		}else{
			return "danger";
		}
	},

	pref_color(){
		var self = this;
		if(self.params.pref > 0){
			return "navy";
		}else{
			return "danger";
		}
	},

	income_color(){
		var self = this;
		if(self.params.income > 0){
			return "navy";
		}else{
			return "danger";
		}
	},

	prices_color(){
		var self = this;
		if(self.params.prices > 0){
			return "navy";
		}else{
			return "danger";
		}
	},

	conserv_arrow(){
		var self = this;
		if(self.params.conserv > 0){
			return "up";
		}else{
			return "down";
		}
	},

	pref_arrow(){
		var self = this;
		if(self.params.pref > 0){
			return "up";
		}else{
			return "down";
		}
	},

	income_arrow(){
		var self = this;
		if(self.params.income > 0){
			return "up";
		}else{
			return "down";
		}
	},

	prices_arrow(){
		var self = this;
		if(self.params.prices > 0){
			return "up";
		}else{
			return "down";
		}
	},
});

