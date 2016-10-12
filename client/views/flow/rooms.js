Template.rooms.helpers({
	rooms: function () {
		return Rooms.find();
	},

	current_players(){
		var self = this;
		return self.current_players.length;
	},
});


Template.rooms.events({
	"submit #game_form": function (event) {
		event.preventDefault();

		var name = event.target.game_name.value;
		var players = event.target.players_number.value;

		var current_players = [Meteor.user()];

		Meteor.call('createRoom', name, players, current_players);
	},

	"click #participate": function(){
		var self = this;
		if(self.players == self.current_players.length){

			Meteor.call('createGame', self.name, self.current_players, function (error, result) {
				Session.set("game", result);

				Router.go('/');
			});

		}
	},
});