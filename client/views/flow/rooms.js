Template.rooms.helpers({
	rooms: function () {
		var rooms = []
		Rooms.find().fetch().forEach(function (room) {
			var game = Games.findOne({_id: room.game_id});
			if(!game || (game && game.status != "finished" && room.players > _.size(room.current_players)) || room.current_players[Meteor.user().username]){
				rooms.push(room);
			}
		});
		return rooms;
	},

	current_players(){
		var self = this;
		return _.size(self.current_players);
	},

	display(){
		var self = this;
		if(self.status == "loaded"){
			if(self.current_players[Meteor.user().username].status == "in_game"){
				Session.set("game", self.game_id);
				Router.go('/');
			}
		}
		if(self.current_players[Meteor.user().username]){
			return true;
		}else{
			return "none";
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

	participating(){
		var self = this;
		if(self.current_players[Meteor.user().username]){
			return true;
		}else{
			return false;
		}
	},

	in_game(){
		var self = this;
		var game = Games.findOne({_id: self.game_id});
		if(game && game.players[Meteor.user().username]){
			return true;
		}else{
			return false;
		}
	},

});


Template.rooms.events({
	"submit #game_form": function (event, template) {
		event.preventDefault();

		var form = template.$("#game_form");

		if (form.valid()){
			var name = event.target.game_name.value;
			var players = event.target.players_number.value;

			var status = "waiting";

			//var current_players = [Meteor.user()];
			var current_players= {};
			current_players[Meteor.user().username] = Meteor.user();
			current_players[Meteor.user().username].status = "wait";

			Rooms.find().fetch().forEach(function (room) {
				if(room.current_players[Meteor.user().username]){
					delete room.current_players[Meteor.user().username];
					Meteor.call("updateRoom", room);
				}
			});

			Meteor.call('createRoom', name, players, current_players, status, function (error, result){
				var room = Rooms.findOne({_id: result});
				if(room.players == _.size(room.current_players)){
					Meteor.call('createGame', room.name, room.current_players, function (error, result) {
						room.game_id = result;
						room.status = "loading";
						Meteor.call("updateRoom", room);
						Meteor.call('initGame', result, function (error, result) {
							room.status = "loaded";
							for (var player in room.current_players){
								room.current_players[player].status = "in_game";
							}
							Meteor.call("updateRoom", room);
						});
					});
				}
			});
		}
	},

	"click #participate": function(){
		var self = this;

		if(self.players >= _.size(self.current_players) + 1){

			Rooms.find().fetch().forEach(function (room) {
				if(room.current_players[Meteor.user().username]){
					delete room.current_players[Meteor.user().username];
					Meteor.call("updateRoom", room);
				}
			});


			self.current_players[Meteor.user().username] = Meteor.user();
			self.current_players[Meteor.user().username].status = "wait";


			if(self.players == _.size(self.current_players)){
				Meteor.call('createGame', self.name, self.current_players, function (error, result) {
					self.game_id = result;
					self.status = "loading";
					Meteor.call("updateRoom", self);
					Meteor.call('initGame', result, function (error, result) {
						self.status = "loaded";
						for (var player in self.current_players){
							self.current_players[player].status = "in_game";
						}
						Meteor.call("updateRoom", self);
					});
				});

			}
			Meteor.call("updateRoom", self);
		
		}else{
			alert("No enough space!");
		}
	},


	"click #leave": function(){
		var self = this;
		var game = Games.findOne({_id: self.game_id});
		delete self.current_players[Meteor.user().username];
		Meteor.call("updateRoom", self);
	},

	"click #reconnect": function(){
		var self = this;
		Session.set("game", self.game_id);
		Router.go('/');
	},
});