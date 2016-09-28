Template.news.helpers({
	news(){
		var game = Games.findOne({});
		//console.log(game.news.slice(game.news.length-4).sort(function(a, b){return b.time_period - a.time_period}));
		return game.news.slice(game.news.length-4).sort(function(a, b){return b.time_period - a.time_period});
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
});