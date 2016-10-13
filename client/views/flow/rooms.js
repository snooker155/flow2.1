Template.rooms.helpers({
	rooms: function () {
		return Rooms.find();
	},

	current_players(){
		var self = this;
		return _.size(self.current_players);
	},

	display(){
		var self = this;
		if(self.status == "loaded"){
			Session.set("game", self.game_id);
			Router.go('/');
		}else{
			if(self.current_players[Meteor.user().username] && self.current_players[Meteor.user().username].status == "wait"){
				return true;
			}else{
				return "none";
			}
		}
	},

	loading(){
		var self = this;
		if(self.status == "loading"){
			return true;
		}else{
			return false;
		}
	},
});


Template.rooms.events({
	"submit #game_form": function (event) {
		event.preventDefault();

		var name = event.target.game_name.value;
		var players = event.target.players_number.value;

		//var current_players = [Meteor.user()];
		var current_players= {};
		current_players[Meteor.user().username] = Meteor.user();
		current_players[Meteor.user().username].status = "wait";

		Meteor.call('createRoom', name, players, current_players);
	},

	"click #participate": function(){
		var self = this;
		self.current_players[Meteor.user().username] = Meteor.user();
		self.current_players[Meteor.user().username].status = "wait";
		if(self.players == _.size(self.current_players)){
			Meteor.call('createGame', self.name, self.current_players, function (error, result) {
				self.game_id = result;
				self.status = "loading";
				Meteor.call("updateRoom", self);
				Meteor.call('initGame', result, function (error, result) {
					Session.set("game", result);
					Router.go('/');
					self.status = "loaded";
				});
			});

		}
		Meteor.call("updateRoom", self);
	},
});